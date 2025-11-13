import sqlite3
from backend.utils.hash_fns import *

#Used to create the test accounts - Not apart of main programs

users = sqlite3.connect('./databases/users.db')
u_cursor = users.cursor()

u_cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT,
            salt TEXT,
            pword TEXT,
            perm_level INTEGER
            )
    ''')
users.commit()

saltA = gen_salt()
hashA = gen_hash("TestAdmin", saltA)

saltU = gen_salt()
hashU = gen_hash("TestUser", saltU)

u_cursor.execute("INSERT INTO users (username, salt, pword, perm_level) VALUES (?, ?, ?, ?)", ("TestAdmin", saltA, hashA, 0))
u_cursor.execute("INSERT INTO users (username, salt, pword, perm_level) VALUES (?, ?, ?, ?)", ("TestUser", saltU, hashU, 10))

users.commit()