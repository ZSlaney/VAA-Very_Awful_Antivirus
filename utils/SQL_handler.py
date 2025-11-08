import sqlite3
from utils import hash_fns as hash

#Return True for valid user or False for invalid
#It is case senitive
def login(usrname, password):
    users = sqlite3.connect('./databases/users.db')
    u_cursor = users.cursor()

    u_cursor.execute('''SELECT salt, pword, perm_level FROM users WHERE username=(?)''', (usrname,))
    rows = u_cursor.fetchall()
    for row in rows:
        if hash.check_password(password, row[0], row[1]) == True:
            print("User authenticated")
            users.close()
            return [True, row[2]]

    # Close the connection
    users.close()
    #no valid user
    return [False, 255]


def add_to_quarantine(user, path, filename):
    db = sqlite3.connect('./databases/quar.db')
    cursor = db.cursor()

    # Create a table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS quarantine_list (
            id INTEGER PRIMARY KEY,
            user TEXT,
            path TEXT,
            filename TEXT
        )
    ''')

    cursor.execute('''INSERT INTO quarantine_list (user, path, filename) VALUES ((?), (?), (?))''', (user, path, filename))
    db.commit()
    db.close()

def read_quarantine(user):
    db = sqlite3.connect('./databases/quar.db')
    cursor = db.cursor()

    # Create a table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS quarantine_list (
            id INTEGER PRIMARY KEY,
            user TEXT,
            path TEXT,
            filename TEXT
        )
    ''')

    cursor.execute('''SELECT * FROM quarantine_list WHERE user=(?)''', (user,))
    actions = cursor.fetchall()
    db.close()
    return actions

def add_to_scans(user, path, result, confidence):
    db = sqlite3.connect('./databases/scans.db')
    cursor = db.cursor()

    # Create a table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS scans (
            id INTEGER PRIMARY KEY,
            user TEXT,
            path TEXT,
            result BOOLEAN,
            confidence INTEGER
        )
    ''')

    cursor.execute('''INSERT INTO scans (user, path, result, confidence) VALUES ((?), (?), (?), (?)) RETURNING id''', (user, path, result, confidence))
    p_id = cursor.fetchall()
    db.commit()
    db.close()
    return p_id[0]

def read_scans(user):
    db = sqlite3.connect('./databases/scans.db')
    cursor = db.cursor()

    # Create a table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS scans (
            id INTEGER PRIMARY KEY,
            user TEXT,
            path TEXT,
            result BOOLEAN,
            confidence INTEGER
        )
    ''')
    
    cursor.execute('''SELECT * FROM scans WHERE user=(?)''', (user,))
    actions = cursor.fetchall()
    db.close()
    return actions

def read_scans_by_pkey(in_id: int):
    db = sqlite3.connect('./databases/scans.db')
    cursor = db.cursor()
    cursor.execute('''SELECT path, result, confidence FROM scans WHERE id=(?)''', (in_id))
    actions = cursor.fetchall()
    db.close()
    return actions[0]


#------------------------------------------------
# Debug Functions - Not to be used for production
#------------------------------------------------
def dump_users_db():
    users = sqlite3.connect('./databases/users.db')
    u_cursor = users.cursor()

    u_cursor.execute('''SELECT * FROM users''')
    res = u_cursor.fetchall()
    users.close()
    for row in res:
        print(row)

def dump_quar_db():
    db = sqlite3.connect('./databases/quar.db')
    cursor = db.cursor()
    # Create a table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS quarantine_list (
            id INTEGER PRIMARY KEY,
            user TEXT,
            path TEXT,
            filename TEXT
        )
    ''')

    cursor.execute('''SELECT * FROM quarantine_list''')
    res = cursor.fetchall()
    db.close()
    for row in res:
        print(row)

def dump_scans_db():
    db = sqlite3.connect('./databases/scans.db')
    cursor = db.cursor()
    # Create a table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS scans (
            id INTEGER PRIMARY KEY,
            user TEXT,
            path TEXT,
            result BOOLEAN,
            confidence INTEGER
        )
    ''')

    cursor.execute('''SELECT * FROM scans''')
    res = cursor.fetchall()
    db.close()
    for row in res:
        print(row)