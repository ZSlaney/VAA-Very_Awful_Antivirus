import hashlib
import os

def check_password(password, salt, hash):
    input_hash = gen_hash(password, salt)
    if (input_hash == hash):
        return True
    else:
        return False
    
def gen_hash(password, salt):
    hashed_password = hashlib.sha3_512(password.encode('utf-8') + salt.encode('utf-8'))
    return hashed_password.hexdigest()

def gen_salt():
    salt = os.urandom(32)
    return str(int.from_bytes(salt, byteorder='big', signed=False))