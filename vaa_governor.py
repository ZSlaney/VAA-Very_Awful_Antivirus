#Main program for VAA - VeryAwfulAntivirus no cli but houses a fastapi webserver and imports db functions to support


class VaaGovernor:
    def __init__(self):
        self.clients = [] # List to keep track of authenticated clients (sessionkey, name, permissions)