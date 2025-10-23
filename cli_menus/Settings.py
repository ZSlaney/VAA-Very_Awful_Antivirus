import cmd


class SettingsCLI(cmd.Cmd):
    prompt = 'VAA_Settings>> '
    def setAuthKey(self, key):
        self.authkey = key
    def do_users(self, line):
        """Manage user settings."""
        print("User settings selected.")

    def do_models(self, line):
        """Manage model settings."""
        print("Model settings selected.")
    def do_shAuth(self, line):
        """Show current auth key."""
        print(f"Current auth key: {self.authkey}")

    def do_back(self, line):
        """Return to the main menu."""
        return True

    def postcmd(self, stop, line):
        print()  # Add an empty line for better readability
        return stop