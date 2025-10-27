from Crypto.Protocol import DH
from Crypto.PublicKey import RSA

# Hard coded RSA keys

#Priv Key
pwd = b'Secret12345'
with open("private_key.pem", "rb") as f:
    data=f.read()
    priv_key = RSA.import_key(data, pwd)

#Public Key -  Shouldn't need this
with open("public_key.pem", "rb") as f:
    data=f.read()
    pub_key = RSA.import_key(data)
