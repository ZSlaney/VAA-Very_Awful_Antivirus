import hash_fns

pass_a = "This is the correct password"
pass_b = "This is not the correct password"
salt = hash_fns.gen_salt()


hash_a = hash_fns.gen_hash(pass_a, salt)

if (hash_fns.check_password(pass_a, salt, hash_a)):
    print("Password A was correct")
else:
    print("Password A was wrong")

if (hash_fns.check_password(pass_b, salt, hash_a)):
    print("Password B was correct")
else:
    print("Password B was wrong")