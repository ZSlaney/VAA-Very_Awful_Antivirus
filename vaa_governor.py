#Main program for VAA - VeryAwfulAntivirus no cli but houses a fastapi webserver and imports db functions to support

import socket
import uvicorn # ASGI server for FastAPI
import os
from backend import app
import threading
from utils import SQL_handler as sql
#from pystray import Icon as icon, Menu as menu, MenuItem as item
 

class VaaGovernor:
    def __init__(self, logger):
        self.clients = ["Client"] # List to keep track of authenticated clients (sessionkey, name, permissions)
        self.logger = logger
        self.clients_lock = threading.Lock()  # Lock for thread-safe access to clients list

    def start(self):
        self.api_thread = threading.Thread(target=self.host_page)
        #self.traythread = threading.Thread(target=self.init_tray)
        #self.traythread.start()
        self.api_thread.start()
        self.logger.info("Web server started in a separate thread.")
        self.init_clisocket()
        self.main_loop()

    def list_clients(self):
        """Return a list of connected clients."""
        with self.clients_lock:
            return self.clients

    def init_clisocket(self):
        self.serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.serversocket.bind(('localhost', 7986)) # for cli clients
        self.serversocket.listen(5)  # Listen for incoming connections
    
    def main_loop(self):
        self.logger.info("VAA Governor is running and listening for connections...")
        while True:
            clientsocket, address = self.serversocket.accept()
            self.logger.info(f"Connection from {address} has been established!")

    def host_page(self):
        self.logger.info("Starting Web server on http://localhost:8000")
        uvicorn.run(app, host="localhost", port=8000)
    
    def login(self, username: str, password: str):
        self.logger.info("Login request recieved from " + username)
        res = sql.login(username, password)

        if res[0] == True:
            #Valid user
            valid_key = False
            while valid_key == False:
                candidate_key = os.urandom(32)
                if self.clients.__contains__(candidate_key) == False:
                    #Key is not a duplicate
                    key =  candidate_key
                    self.clients.append([key, username, res[1]])  
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
        




if __name__ == "__main__":
    print("DONT RUN THIS FILE DIRECTLY - RUN run.py INSTEAD")
    exit(1)