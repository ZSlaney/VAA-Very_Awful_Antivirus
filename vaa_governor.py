#Main program for VAA - VeryAwfulAntivirus no cli but houses a fastapi webserver and imports db functions to support

import socket
import uvicorn # ASGI server for FastAPI
import os
from backend import app
import threading
from utils import SQL_handler as sql
from Model import Model_Handler as model
#from pystray import Icon as icon, Menu as menu, MenuItem as item
import ssl
from pathlib import Path
from fastapi import File, UploadFile
import shutil


CERTPATH = os.path.abspath("./cert")

TMP_FOLDER = os.path.dirname(os.path.abspath(__file__)) + "/tmp/"

scanner_model = model.ModelHandler()

class VaaGovernor:
    def __init__(self, logger):
        self.clients = [] # List to keep track of authenticated clients (sessionkey, name, permissions)
        self.logger = logger
        self.sslContext = None
        self.locks = {
            "auth": threading.Lock(),
            "scan": threading.Lock(),
            "db": threading.Lock(),
            "client": threading.Lock()
        }
        self.scanner = model.ModelHandler()
        self.current_jobs = {}

    def start(self):
        self.sslContext = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        self.sslContext.load_cert_chain(CERTPATH + "/cert.pem", CERTPATH + "/key.pem")
        self.api_thread = threading.Thread(target=self.host_page)
        #self.traythread = threading.Thread(target=self.init_tray)
        #self.traythread.start()
        self.api_thread.start()
        self.logger.info("Web server started in a separate thread.")
        self.init_clisocket()
        self.main_loop()


    def init_clisocket(self):
        self.serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.serversocket.bind(('localhost', 7986)) # for cli clients
        self.serversocket.listen(5)  # Listen for incoming connections
    
    def main_loop(self):
        self.logger.info("VAA Governor is running and listening for connections...")
        while True:
            clientsocket, address = self.serversocket.accept()
            self.logger.info(f"Connection from {address} has been established!")

    def list_clients(self):
        return self.clients

    def host_page(self):
        self.logger.info("Starting Web server on https://localhost:8000")
        uvicorn.run(app, host="localhost", port=8000, ssl_certfile=CERTPATH + "/cert.pem", ssl_keyfile=CERTPATH + "/key.pem")
    
    def login(self, username: str, password: str):
        with self.locks["auth"]:
            self.logger.info("Login request recieved from " + username)
            res = sql.login(username, password)

            if res[0] == True:
                #Valid user
                valid_key = False
                while valid_key == False:
                    candidate_key = int.from_bytes(os.urandom(4))
                    if self.clients.__contains__(candidate_key) == False:
                        #Key is not a duplicate
                        key =  candidate_key
                        valid_key = True
                        self.clients.append([key, username, res[1]])  
                        valid_key = True
            else:
                #Invalid user
                key = None

            # True/False, permission level, key
            
            return [res[0], res[1], key]
    
    def verify_session(self, key, perm_level):
        with self.locks["client"]:
            clients = self.list_clients()
        
        for client in clients:
            if key == client[0]:
                #valid user
                if perm_level == client[2]:
                    #no variation - accept
                    return True
                else:
                    break
        
        #No session or altered data      
        return False

    def get_username(self, key):
        with self.locks["client"]:
            clients = self.list_clients()
        
        for client in clients:
            if key == client[0]:
                return client[1]
    
        return ""
    
    def scan(self, file: UploadFile, key, perm_level):
        

        if self.verify_session(key, perm_level) == False:
            return False
        #valid session
        
        
        path = Path(TMP_FOLDER + str(key) + "/" + file.filename)
        
        if os.path.isdir(TMP_FOLDER + str(key) + "/") == False:
            #Create folder
            os.mkdir(TMP_FOLDER + str(key))
       

        with open(TMP_FOLDER + str(key) + "/" + file.filename, "xb") as file_object:
            shutil.copyfileobj(file.file, file_object)

        
        with self.locks["scan"]:
            job_id = self.scanner.add_job(filepath=path, model_name="RandomForestV1")
            self.current_jobs[str(job_id)] = [key, -1]
            
            #Spin up thread to process
            scan_thread = threading.Thread(target=self.execute_job, args=(job_id, key, file))
            scan_thread.start()

        return job_id
    
    def execute_job(self, job_id: int, key: int, file: UploadFile):
        with self.locks["scan"]:
            result = self.scanner.runmodel(jobId=job_id)
            #Remove tmp file
            path = TMP_FOLDER + str(key)
            tmpFile = Path(path + "/" + file.filename)
            tmpFile.unlink(True)

            directory = Path(path)
            if os.listdir(directory) == []:
                #Delete folder if it's the last file
                directory.rmdir()
            

            length = len(result["Classification"]) - 1
            if result["Confidence"].any() == "Unknown":
                conf = -1
            else:
                if (result["Classification"][length] == 0): #benignware
                    conf = result["Confidence"][length][0] * 100
                else:
                    conf = result["Confidence"][length][1] * 100

            id = sql.add_to_scans(user=self.get_username(key=key), path=file.filename, result=bool(result["Classification"][length]), confidence=conf)
        
            self.current_jobs[str(job_id)][1] = id
    
    def get_job(self, job_id, key, perm_level):
        if self.verify_session(key, perm_level) == False:
            return False
        #valid session 

        with self.locks["scan"]:
            #Check job belongs to this user
            if str(job_id) not in self.current_jobs:
                return {"Status": "No job for you by that number"}
            

            if self.current_jobs[str(job_id)][0] != key:
                return {"Status": "No job for you by that number"}
            
            #Job belongs to this user
            
            #Check if scan complete
            if self.current_jobs[str(job_id)][1] == -1:
                return {"Status": "Scan incomplete"}
            
            job_res = sql.read_scans_by_pkey(self.current_jobs[str(job_id)][1])

            #Clear job & stored result
            del(self.current_jobs[str(job_id)])

        if job_res[2] == -1:
            confid = "UNKNOWN"
        else:
            confid = job_res[2]

        #Return result
        return {"Classification":job_res[1], "Confidence":confid, "file_name": job_res[0]}

    def query_scan_db(self, filter, key, perm_level):
        if self.verify_session(key, perm_level) == False:
            return False
        #valid session
        
        with self.locks["scan"]:
            res = sql.read_scans(self.get_username(key=key)) 
        
        #Sort newest to oldest
        res.reverse()

        #Filtering
            #Key for internal list
            #0-prim key
            #1-username
            #2-path
            #3-result
            #4-confidence -- -1 means unknown

        if "result" in filter:
            match filter["result"]:
                case "MALWARE":
                    for scan in res:
                        if scan[3] == False:
                            res.remove(scan)
                case "BENIGNWARE":
                    for scan in res:
                        if scan[3] == True:
                            res.remove(scan)

        if "limit" in filter:
            if type(filter["limit"]) == int:
                #Valid number
                if filter["limit"] >= 0:
                    res = res[:filter["limit"]]

                
        return res


        




if __name__ == "__main__":
    print("DONT RUN THIS FILE DIRECTLY - RUN run.py INSTEAD")
    exit(1)