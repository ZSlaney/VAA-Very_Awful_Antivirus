import hashlib
import os

def check_password(password, salt, hash):
    input_hash = gen_hash(password, salt)
    if (input_hash == hash):
        return True
    else:
        return False
    
def gen_hash(password, salt):
    hashed_password = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), salt, 100000)
    return hashed_password

def gen_salt():
    salt = os.urandom(32)
    return salt