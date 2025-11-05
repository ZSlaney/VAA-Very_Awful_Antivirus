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

@app.post("/api/scan")
async def scan_file(file_path: str, governor=Depends(get_governor)):
    # Placeholder for scanning logic
    # In a real implementation, you would call the scanning functions here
    scan_result = {"file_path": file_path, "threat_found": False}
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