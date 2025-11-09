from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi import FastAPI, Depends, File, UploadFile, Form, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from fastapi.encoders import jsonable_encoder
import os
from pydantic import BaseModel, ValidationError
from contextlib import asynccontextmanager
from datetime import datetime, timedelta
from typing import List


frontenddir = os.path.join(os.path.dirname(__file__), "frontend/dist")

ENABLE_DOCS = True

@asynccontextmanager
async def lifespan(app: FastAPI):
    global startup_time
    startup_time = datetime.now()
    print("FastAPI application starting up...")
    yield
    print("FastAPI application shutting down...")

if ENABLE_DOCS == True:
    app = FastAPI(lifespan=lifespan)
else:
    app = FastAPI(lifespan=lifespan, docs_url=None, redoc_url=None)


# Dependency to access the VaaGovernor instance
def get_governor(): 
    return app.state.governor






#--------------------------------------------------------
#                   API ROUTES
#--------------------------------------------------------

#---------------TESTING---------------
#Remove before production


# API route to list clients
@app.get("/api/clients")
async def list_clients(governor=Depends(get_governor)):
    return {"clients": governor.list_clients()}


#-----------PERMINENT------------------

@app.get("/api/version")
async def get_api_version():
    if startup_time:
        uptime_duration: timedelta = datetime.now() - startup_time
        total_seconds = uptime_duration.total_seconds()
        days = uptime_duration.days
        hours, remainder = divmod(total_seconds - (days * 86400), 3600)
        minutes, seconds = divmod(remainder, 60)
        return {"Version":app.version, "VAA Build":"1.0", "uptime": f"{days}:{int(hours):02d}:{int(minutes):02d}:{int(seconds):02d}"}
    else:
        return {"Version":app.version, "VAA Build":"1.0", "uptime": "Application startup time not recorded."}


class ScanDatabase(BaseModel):
    filter: dict
    key: int
    perm_level: int

@app.post("/api/scan/find")
async def scan_database(request: ScanDatabase, governor=Depends(get_governor)):
    res = governor.query_scan_db(filter=request.filter, key=request.key, perm_level=request.perm_level)

    if res == False:
        #bad login or auth
        return JSONResponse(content={"Auth":"Failed"})

    full_scan_list = []
    for scan in res:
        #0-prim key
        #1-username
        #2-filename
        #3-result
        #4-confidence -- -1 means unknown
        #5-hash
        #6-timestamp
        #7-modelname
        if scan[4] == -1:
            conf = "Unknown"
        else:
            conf = scan[4]

        if scan[3] == True:
            res = "MALWARE"
        else:
            res = "BENIGNWARE"

        scan_entry = {"Filename":scan[2], "User": scan[1], "Result":{"Classification": res, "Confidence":conf}, "hash": scan[5], "timestamp": scan[6], "model_name": scan[7]}
        full_scan_list.append(scan_entry)

    return JSONResponse(content=full_scan_list)

class ScanRequest(BaseModel):
    key: int
    perm_level: int

@app.post("/api/scan/add")
async def scan_file(
    key: str = Form(...),  # Receive `key` as a form field
    perm_level: str = Form(...),  # Receive `perm_level` as a form field
    model_name: str = Form(...),
    file: UploadFile = File(...),  # Receive the file
    governor=Depends(get_governor)
):
    print(f"Received key: {key}")
    print(f"Received perm_level: {perm_level}")
    print(f"Received model_name: {model_name}")
    print(f"Received file: {file.filename}")


    if key == None:
        return{"Auth":"Failed"}
    
    job = governor.scan(file=file, key=int(key), perm_level=int(perm_level), model_name=model_name)
    if (job == False):
        #bad login or auth
        return JSONResponse(content={"Auth":"Failed"})
    
    return {"Job Id": job}


class JobRequest(BaseModel):
    job_id: int
    key: int
    perm_level: int

@app.post("/api/scan/result/single")
async def find_job(job_request: JobRequest, governor=Depends(get_governor)):
    
    result = governor.get_job(job_id=job_request.job_id, key=job_request.key, perm_level=job_request.perm_level)
    
    if (result == False):
        #bad login or auth
        return JSONResponse(content={"Auth":"Failed"})
    
    
    return JSONResponse(content=result)

class JobsRequest(BaseModel):
    key: int
    perm_level: int
@app.post("/api/scan/result/all")
async def find_jobs(request: JobsRequest, governor=Depends(get_governor)):
    result = governor.get_all_user_jobs(key=request.key, perm_level=request.perm_level)

    if (result == False):
        #bad login or auth
        return JSONResponse(content={"Auth":"Failed"})
    
    return JSONResponse(content=result)


class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/api/auth")
async def login(request: LoginRequest, governor=Depends(get_governor)):
    #Pass u + p to governor
    res = governor.login(request.username, request.password)
    #res[0] - T/F
    #res[1] - Perm level
    #res[2] - Key

    if res[0] == True:
        json_res =  {"Key": res[2], "Permission_Level": res[1]}
    else:
        json_res = {"Key": "NONE", "Permission_Level": res[1]}
    
    return JSONResponse(content=json_res)

class NewUser(BaseModel):
    username: str
    password: str

@app.post("/api/auth/new")
async def new_user(request: NewUser, governor=Depends(get_governor)):
    res = governor.new_user_account(username=request.username, password=request.password)
    return JSONResponse(content=res)


# Serve static files
app.mount("/", StaticFiles(directory=frontenddir, html=True), name="frontend")