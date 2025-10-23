import cmd
import os

from cli_menus.Settings import SettingsCLI
from cli_menus.ScanFile import ScanFileCLI
from cli_menus.ViewDB import ViewDBCLI



class FileManagerCLI(cmd.Cmd):
    prompt = 'VAA_CLI>> '
    intro = 'Welcome to VeryAwfulAntivirus CLI. Type "help" for available commands.'

    def __init__(self):
        super().__init__()
        self.sessionkey = None
        self.session = doConnect('localhost')

    def do_login(self, line):
        """Login to the VeryAwfulAntivirus system."""
        if line:
            self.sessionkey = line
            print(f"Logged in with session key: {self.sessionkey}")
        else:
            print("No session key provided.")
   

    def do_settings(self, line):
        """Enter the settings menu."""
        print("Entering settings...")
        settings_cli = SettingsCLI()
        settings_cli.setAuthKey(self.sessionkey)
        settings_cli.cmdloop()

    def do_scan(self, line):
        """Enter the scan menu."""
        print("Entering scan...")
        scanfile_cli = ScanFileCLI()
        scanfile_cli.setAuthKey(self.sessionkey)
        scanfile_cli.cmdloop()

    def do_viewdb(self, line):
        """Enter the view database menu."""
        print("Entering view database...")
        viewdb_cli = ViewDBCLI()
        viewdb_cli.setAuthKey(self.sessionkey)
        viewdb_cli.cmdloop()

    def do_quit(self, line):
        """Exit the CLI."""
        return True

    def postcmd(self, stop, line):
        print()  # Add an empty line for better readability
        return stop

def doConnect(host):
    # Placeholder for actual connection logic
    print(f"Connected to {host}")

if __name__ == '__main__':
    FileManagerCLI().cmdloop()