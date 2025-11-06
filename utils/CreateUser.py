import sqlite3
from utils.hash_fns import *

def newUser(Username, Password):
    users = sqlite3.connect('./databases/users.db')
    u_cursor = users.cursor()

    # Create a table
    u_cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT,
            salt TEXT,
            pword TEXT,
            perm_level INTEGER)
    ''')

    salt = gen_salt()
    hash = gen_hash(Password, salt)
    u_cursor.execute("INSERT INTO users (username, salt, pword, perm_level) VALUES (?, ?, ?, ?)", (Username, salt, hash, 0))

    u_cursor.execute("SELECT * FROM users")
    rows = u_cursor.fetchall()
    for row in rows:
        print(row)

    # Close the connection
    users.commit()
    users.close()

if __name__ == "__main__":
    newUser("Test1", "Test1")