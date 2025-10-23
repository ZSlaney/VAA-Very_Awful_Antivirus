import SQL_handler as sql
from CreateUser import newUser

print("Users table:\n")
sql.dump_users_db()
print("")

print("Quarantine table:\n")
sql.dump_quar_db()
print("")

print("Scans table:\n")
sql.dump_scans_db()