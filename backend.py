from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
import os

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

# Serve static files
app.mount("/", StaticFiles(directory=frontenddir, html=True), name="frontend")