# Very-Awful-Antivirus (VAA)

Not a very good anti virus  


## Install instructions

Ensure Node and Npm are present

Ensure Python (Version 3.14) and Pip are present

Create a Venv for the backend
> For Windows:  
> Run ***Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope Process*** in the VSCode terminal before activating the virtual enviornment

Install required packages using ***pip install -r requirements.txt***

### Build the Frontend
***cd ./frontend***

***npm i***

***npx vite build***

***cd ..***

## Running the application

Run *run.py*, connect to the web portal at https://localhost:8000.  
You will likely be prompted with a "Your connection is not private" warning, this warning should be bypassed by hitting *Advanced* and then continue.
This error occurs because the certificates are self-signed, so a certificate authory cannot vouch for the authanticity of the certificate. Regardless,
the connection is secure and because this is hosted locally, we can trust that the certificate is coming from the server.

We have two default logins;  
TestAdmin (U+P)  
TestUser (U+P) 

There is an API end-point to create new user accounts, but this has not been implemented into the front-end yet.
