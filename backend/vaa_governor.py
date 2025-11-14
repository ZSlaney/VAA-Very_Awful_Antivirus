#Main program for VAA - VeryAwfulAntivirus no cli but houses a fastapi webserver and imports db functions to support

import socket
import uvicorn # ASGI server for FastAPI
import os
from backend.backend import app
import threading
from backend.utils import SQL_handler as sql
from backend.Model import Model_Handler as model
#from pystray import Icon as icon, Menu as menu, MenuItem as item
import ssl
from pathlib import Path
from fastapi import File, UploadFile
import shutil
from datetime import datetime, timedelta
import time


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

    def start(self):
        self.sslContext = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        self.sslContext.load_cert_chain(CERTPATH + "/cert.pem", CERTPATH + "/key.pem")
        self.api_thread = threading.Thread(target=self.host_page)
        #self.traythread = threading.Thread(target=self.init_tray)
        #self.traythread.start()
        self.api_thread.start()
        self.logger.info("Web server started in a separate thread.")
        self.init_clisocket()
        
        self.logger.info("Starting cleaner thread.")
        self.cleanse_thread = threading.Thread(target=self.cleanse_clients_and_jobs)
        self.cleanse_thread.start()

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
                        self.clients.append([key, username, res[1], datetime.now()])  
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
                    #update last seen
                    
                    client[3] = datetime.now()
                    with self.locks["client"]:
                        self.clients = clients
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
    
    def scan(self, file: UploadFile, key, perm_level, model_name):
        

        if self.verify_session(key, perm_level) == False:
            return False
        #valid session
        
        with self.locks["scan"]:
            job_id = self.scanner.add_job(filename=file.filename, model_name=model_name, key=key)
        
        path = Path(TMP_FOLDER + str(key) + "/" + file.filename)
        
        if os.path.isdir(TMP_FOLDER + str(key) + "/") == False:
            #Create folder
            os.mkdir(TMP_FOLDER + str(key))
       

        with open(TMP_FOLDER + str(key) + "/" + file.filename, "xb") as file_object:
            shutil.copyfileobj(file.file, file_object)

        
        
        with self.locks["scan"]:    
            #Spin up thread to process
            scan_thread = threading.Thread(target=self.execute_job, args=(job_id, key, file))
            scan_thread.start()

        return job_id
    
    def execute_job(self, job_id: int, key: int, file: UploadFile):
        #Not called externally, cridentials do not need to be checked
        print("running model")
        with self.locks["scan"]:
            path = TMP_FOLDER + str(key)
            tmpFile = Path(path + "/" + file.filename)
            result = self.scanner.runmodel(jobId=job_id, path=tmpFile)
            if (result == False):
                print("Bad job id")
                return

            #Remove tmp file
            tmpFile.unlink()

            directory = Path(path)
            if os.listdir(directory) == []:
                #Delete folder if it's the last file
                directory.rmdir()
            

            if result["result"]["Confidence"].any() == "UNKNOWN":
                result["result"]["Confidence"] = -1
            
            self.logger.info(result["hash"])
            
            sql.add_to_scans(user=self.get_username(key=key), path=file.filename, result=result["result"]["Classification"], confidence=result["result"]["Confidence"], hash=result["hash"], timestamp=result["timestamp"].strftime("%d/%m/%Y, %H:%M:%S"), model=result["model_name"])

    def get_all_user_jobs(self, key, perm_level):
        if self.verify_session(key, perm_level) == False:
            return False
        #valid session

        if (perm_level <= 2): #Admin 
            with self.locks["scan"]:
                scan_list = []   
                res = self.scanner.get_jobs()
                for result in res:
                    if result["status"] == "pending":
                        result["result"] = {"Classification":"IN PROGRESS", "Confidence": "IN PROGRESS"}
                    else:
                        if result["result"]["Confidence"] == -1:
                            result["result"]["Confidence"] = "UNKNOWN"

                            
                        if (result["result"]["Classification"] == True):
                            result["result"]["Classification"] = "MALWARE"
                        else:
                            result["result"]["Classification"] = "BENIGNWARE"


                    
                    scan = {"id": result["id"],"filename": result["filename"], "hash": result["hash"],"status": result["status"],"result": result["result"], "timestamp": result["timestamp"].strftime("%H:%M:%S"), "model_name": result["model_name"]}
                    scan_list.append(scan)
                return scan_list

        else:
            with self.locks["scan"]:    
                return self.scanner.get_user_jobs(key=key)

    
    def get_job(self, job_id, key, perm_level):
        if self.verify_session(key, perm_level) == False:
            return False
        #valid session 

        with self.locks["scan"]:
            
            job_res = self.scanner.get_job(job_id=job_id, key=key)

        if job_res == False:
            return {"status":"No job for you by that ID"}
        
        if job_res["status"] == "pending":
            job_res["result"] = {"Classification":"IN PROGRESS", "Confidence": "IN PROGRESS"}
        else:
            if (job_res["result"]["Classification"] == True):
                if job_res["result"]["Confidence"] == -1:
                    result = {"Classification":"MALWARE", "Confidence":"UNKNOWN"}
                else:
                    result = {"Classification":"MALWARE", "Confidence":job_res["result"]["Confidence"]}
            else:
                if job_res["result"]["Confidence"] == -1:
                    result = {"Classification":"BENIGNWARE", "Confidence":"UNKNOWN"}
                else:
                    result = {"Classification":"BENIGNWARE", "Confidence":job_res["result"]["Confidence"]}
            

        scan = {"id": job_res["id"],"filename": job_res["filename"], "hash": job_res["hash"],"status": job_res["status"],"result": result, "timestamp": job_res["timestamp"].strftime("%H:%M:%S"), "model_name": job_res["model_name"]}


        #Return result
        return scan

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
            #2-filename
            #3-result
            #4-confidence -- -1 means unknown
            #5-Hash
            #6-timestamp
            #7-model_name

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
    
    def new_user_account(self, username, password):
        with self.locks["auth"]:
            res = sql.newUser(username, password, 10)
            if res == False:
                return {"response": "Username already exists"}
            else:
                return {"response": "Success"}
            
    
    def new_admin_account(self, username, password):
        with self.locks["auth"]:
            res = sql.newUser(username, password, 0)
            if res == False:
                return {"response": "Username already exists"}
            else:
                return {"response": "Success"}

    
    # Run on startup
    def cleanse_clients_and_jobs(self):
        USER_TIMEOUT_MINS = 60
        while True:
            self.scanner.remove_old_jobs()
            for client in self.clients:
                delta: timedelta = datetime.now() - client[3]
                if delta.total_seconds() >= USER_TIMEOUT_MINS * 60:
                    self.clients.remove(client)
            
            time.sleep(10)

    



        




if __name__ == "__main__":
    print("DONT RUN THIS FILE DIRECTLY - RUN run.py INSTEAD")
    exit(1)