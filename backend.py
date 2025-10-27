from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

frontenddir = os.path.join(os.path.dirname(__file__), "frontend/dist")

app = FastAPI()

# Serve static files first
app.mount("/", StaticFiles(directory=frontenddir, html=True), name="frontend")

# Fallback route for React Router
@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    index_path = os.path.join(frontenddir, "index.html")
    return FileResponse(index_path)