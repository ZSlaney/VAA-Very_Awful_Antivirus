import sqlite3
from hash_fns import *

def newUser(Username, Password):
    users = sqlite3.connect('./databases/users.db')
    u_cursor = users.cursor()

    # Create a table
    u_cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT,
            salt TEXT,
            pword TEXT
        )
    ''')

    salt = gen_salt()
    hash = gen_hash(Password, salt)
    u_cursor.execute("INSERT INTO users (username, salt, pword) VALUES (?, ?, ?)", (Username, salt, hash))

    u_cursor.execute("SELECT * FROM users")
    rows = u_cursor.fetchall()
    for row in rows:
        print(row)

    # Close the connection
    users.commit()
    users.close()

newUser("Test1", "Test1")