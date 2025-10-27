from Crypto.PublicKey import RSA

#Pub key
#Using default e of 65537
RSA_Pair = RSA.generate(bits=3072)

pwd = b'Secret12345'
with open("private_key.pem", "wb") as f:
    data = RSA_Pair.export_key(passphrase=pwd, pkcs=8, protection='PBKDF2WithHMAC-SHA512AndAES256-CBC', prot_params={'iteration_count':131072})
    f.write(data)

with open("public_key.pem", "wb") as f:
    data= RSA_Pair.public_key().export_key()
    f.write(data)
