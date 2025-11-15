# Very-Awful-Antivirus (VAA)

Not a very good anti virus, this is a project which uses ML models trained on various executables to determine whether the file is malware or safe.


## Install instructions

To Build the frontend ensure nodejs and npm are installed and working
```bash
node -v 22.11.1
npm -v 10.9.2
```

To run the app, ensure python is installed
```bash
python --version == 3.14.0
```

If installing globally is your style, disregard the following
Create a venv for python packages
```bash
python -m venv .venv
```
See need to know if you run into issues



Install required packages using:
```bash
pip install -r requirements.txt
```

### Build the Frontend
```bash
cd ./frontend
npm i
npx vite build
```



## Running the application

Run *run.py*, 
```
python run.py
```
Then connect to the web portal at https://localhost:8000.  



## Need to Knows

> Regarding Venv in Windows:  
> Run ***Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope Process*** in the VSCode terminal before activating the virtual environment

- You will likely be prompted with a "Your connection is not private" warning, this warning should be bypassed by hitting *Advanced* and then continue. This error occurs because the certificates are self-signed. 

- There are Two Default Logins:  TestAdmin (U+P)  TestUser (U+P) 


