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
import shutil
from typing import List


frontenddir = os.path.join(os.path.dirname(__file__), "frontend/dist")

TMP_FOLDER = os.path.dirname(os.path.abspath(__file__)) + "/tmp/"

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
        return {"Version":app.version, "VAA Build":"1.0", "uptime": str(uptime_duration)}
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
        #2-path
        #3-result
        #4-confidence -- -1 means unknown
        if scan[4] == -1:
            conf = "Unknown"
        else:
            conf = scan[4]

        if scan[3] == True:
            res = "MALWARE"
        else:
            res = "BENIGNWARE"

        scan_entry = {"Path":scan[2], "Result":res, "Confidence":conf}
        full_scan_list.append(scan_entry)

    return JSONResponse(content=full_scan_list)

class ScanRequest(BaseModel):
    key: int
    perm_level: int

def checker(data: str = Form(...)):
    try:
        return ScanRequest.model_validate_json(data)
    except ValidationError as e:
        raise HTTPException(
            detail=jsonable_encoder(e.errors()),
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )


@app.post("/api/scan/add")
async def scan_file(request: ScanRequest = Depends(checker), up_file: UploadFile = File(...), governor=Depends(get_governor)):
    
    if request.key == None:
        return{"Auth":"Failed"}
    
    #return {"Path": TMP_FOLDER + str(request.key) + "/" + up_file.filename}
    os.mkdir(TMP_FOLDER + str(request.key))
    with open(TMP_FOLDER + str(request.key) + "/" + up_file.filename, "xb") as file_object:
        shutil.copyfileobj(up_file.file, file_object)
    
    job = governor.scan(file_name=up_file.filename, key=request.key, perm_level=request.perm_level)
    if (job == False):
        #bad login or auth
        return JSONResponse(content={"Auth":"Failed"})
    
    return {"Job Id": job}


class JobRequest(BaseModel):
    job_id: int
    key: int
    perm_level: int

@app.post("/api/scan/result")
async def find_job(job_request: JobRequest, governor=Depends(get_governor)):
    
    result = governor.get_job(job_id=job_request.job_id, key=job_request.key, perm_level=job_request.perm_level)
    
    if (result == False):
        #bad login or auth
        return JSONResponse(content={"Auth":"Failed"})
    
    if "Status" in result:
        #not ready yet
        return result
    
    scan_result = {"file_name": result["file_name"], "thread_found": bool(result["Classification"]), "confidence_level": result["Confidence"]}
    return JSONResponse(content=scan_result)


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
    


# Serve static files
app.mount("/", StaticFiles(directory=frontenddir, html=True), name="frontend")