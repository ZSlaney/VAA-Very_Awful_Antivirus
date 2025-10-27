#Main program for VAA - VeryAwfulAntivirus no cli but houses a fastapi webserver and imports db functions to support

import socket
import uvicorn # ASGI server for FastAPI
import os
from backend import app


class VaaGovernor:
    def __init__(self):
        self.clients = [] # List to keep track of authenticated clients (sessionkey, name, permissions)
        self.serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.serversocket.bind(('localhost', 7986))
        self.serversocket.listen(5)  # Listen for incoming connections

    def main_loop(self):
        print("VAA Governor is running and listening for connections...")
        while True:
            clientsocket, address = self.serversocket.accept()
            print(f"Connection from {address} has been established!")
            # Here you would handle authentication and further communication

    def host_page(self):
        uvicorn.run(app, host="localhost", port=8000)

if __name__ == "__main__":
    governor = VaaGovernor()
    # Start the FastAPI server in a separate thread or process if needed
    import threading
    api_thread = threading.Thread(target=governor.host_page)
    api_thread.start()
    # Start the main loop to handle client connections
    governor.main_loop()