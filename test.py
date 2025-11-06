import utils.SQL_handler as sql
from utils.CreateUser import newUser
import os

sql.add_to_scans("Test1", "/home/test", False, 0)
print("Users table:\n")
sql.dump_users_db()

print("\nQuarantine table:\n")
sql.dump_quar_db()

print("\nScans table:\n")
sql.dump_scans_db()

print("\nTesting valid cridentials")
if sql.login("Test1", "Test1") == True:
    print("[Success] Test1 valid & logged in")
else:
    print("[Failure] Test1 not valid or failed!")

print("\nTesting invalid password")
if sql.login("Invalid123456789", "q") == True:
    print("[Failure] Invalid123456789 valid & logged in")
else:
    print("[Success] Invalid123456789 not valid or failed!")
