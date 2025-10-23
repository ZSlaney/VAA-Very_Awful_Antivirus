import sqlite3
from hash_fns import check_password

#Return True for valid user or False for invalid
#It is case senitive
def login(usrname, password):
    users = sqlite3.connect('./databases/users.db')
    u_cursor = users.cursor()

    u_cursor.execute('''SELECT salt, pword FROM users WHERE username=(?)''', (usrname,))
    rows = u_cursor.fetchall()
    for row in rows:
        if check_password(password, row[0], row[1]) == True:
            print("User authenticated")
            users.close()
            return True

    # Close the connection
    users.close()
    return False
