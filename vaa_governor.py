#Main program for VAA - VeryAwfulAntivirus no cli but houses a fastapi webserver and imports db functions to support

import socket
import uvicorn # ASGI server for FastAPI
import os
from backend import app
import threading
from utils import SQL_handler as sql
#from Model import Model_Handler
#from pystray import Icon as icon, Menu as menu, MenuItem as item
import ssl
CERTPATH = os.path.abspath("./cert")



class VaaGovernor:
    def __init__(self, logger):
        self.clients = [] # List to keep track of authenticated clients (sessionkey, name, permissions)
        self.logger = logger
        self.sslContext = None
        self.locks = {
            "auth": threading.Lock(),
            "scan": threading.Lock(),
            "db": threading.Lock()
        }
        #self.scanner = Model_Handler.ModelHandler()

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
                    candidate_key = int.from_bytes(os.urandom(32))
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
        clients = self.list_clients()
        for client in clients:
            if key == client[0]:
                #valid user
                if perm_level == client[1]:
                    #no variation - accept
                    return True
                else:
                    break
        
        #No session  or altered data      
        return False
    
    def scan(self, file_path, key, perm_level):
        if self.verify_session(key, perm_level) == False:
            return 
        #valid session
        #job_id = self.scanner.add_job(filepath=file_path, model_name="RandomForestV1")


        




if __name__ == "__main__":
    print("DONT RUN THIS FILE DIRECTLY - RUN run.py INSTEAD")
    exit(1)