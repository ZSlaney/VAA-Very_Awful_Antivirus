import cmd


class ViewDBCLI(cmd.Cmd):
    prompt = 'VAA_ViewDB>> '
    def setAuthKey(self, key):
        self.authkey = key
    def do_list(self, line):
        """List all items in the database."""
        print("Listing all items in the database.")

    def do_see(self, line):
        """See details of a specific item."""
        print(f"Seeing details for item: {line}")

    def do_back(self, line):
        """Return to the main menu."""
        return True

    def postcmd(self, stop, line):
        print()  # Add an empty line for better readability
        return stop
    
