#Main program for VAA - VeryAwfulAntivirus no cli but houses a fastapi webserver and imports db functions to support
from utils import hash_fns
from utils import SQL_handler
from utils import CreateUser
import socket

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