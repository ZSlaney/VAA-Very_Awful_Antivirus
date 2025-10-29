#Main program for VAA - VeryAwfulAntivirus no cli but houses a fastapi webserver and imports db functions to support

import socket
import uvicorn # ASGI server for FastAPI
import os
from backend import app
import threading
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



if __name__ == "__main__":
    print("DONT RUN THIS FILE DIRECTLY - RUN run.py INSTEAD")
    exit(1)