import cmd


class ScanFileCLI(cmd.Cmd):
    prompt = 'VAA_Scan>> '
    def setAuthKey(self, key):
        self.authkey = key
    def do_scanfile(self, line):
        """Manage user settings."""
        print("User settings selected.")

    def do_quickscan(self, line):
        """Manage model settings."""
        print("Model settings selected.")

    def do_back(self, line):
        """Return to the main menu."""
        return True

    def postcmd(self, stop, line):
        print()  # Add an empty line for better readability
        return stop