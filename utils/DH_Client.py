from Crypto.Protocol import DH
from Crypto.PublicKey import RSA

#Public Key
with open("public_key.pem", "rb") as f:
    data=f.read()
    pub_key = RSA.import_key(data)