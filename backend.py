from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
import os
from pydantic import BaseModel

frontenddir = os.path.join(os.path.dirname(__file__), "frontend/dist")

app = FastAPI()



# Dependency to access the VaaGovernor instance
def get_governor():
    return app.state.governor

#API routes
# API route to list clients
@app.get("/api/clients")
async def list_clients(governor=Depends(get_governor)):
    return {"clients": governor.list_clients()}

class ScanDatabase(BaseModel):
    username: str
    filter: dict
    key: int
    perm_level: int

@app.post("/api/scan/find")
async def scan_database(request: ScanDatabase, governor=Depends(get_governor)):
    res = governor.query_scan_db(username=request.username, filter=request.filter, key=request.key, perm_level=request.perm_level)

    if res == False:
        #bad login or auth
        return JSONResponse(content={"Auth":"Failed"})
    
    full_scan_list = []
    for scan in res:
        #0-username
        #1-path
        #2-result
        #3-confidence -- -1 means unknown
        if scan[3] == -1:
            conf = "Known"
        else:
            conf = scan[3]

        if scan[2] == True:
            res = "MALWARE"
        else:
            res = "BENIGNWARE"

        scan_entry = {"Path":scan[1], "Result":res, "Confidence":conf}
        full_scan_list.append(scan_entry)

    return JSONResponse(content=full_scan_list)

class ScanRequest(BaseModel):
    file_path: str
    key: int
    perm_level: int

@app.post("/api/scan/add")
async def scan_file(request: ScanRequest, governor=Depends(get_governor)):
    
    result = governor.scan(file_path=request.file_path, key=request.key, perm_level=request.perm_level)
    if (result == False):
        #bad login or auth
        return JSONResponse(content={"Auth":"Failed"})
    classif = result["Classification"]
    confid = result["Confidence"]
    scan_result = {"file_path": request.file_path, "thread_found": bool(classif), "confidence_level": confid}
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