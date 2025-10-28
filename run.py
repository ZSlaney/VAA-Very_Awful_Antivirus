#main entry point for VAA - VeryAwfulAntivirus
from vaa_governor import VaaGovernor
from backend import app
import logging
logging.basicConfig(level=logging.INFO)

global governor
governor = None  # Global instance of VaaGovernor

def check_dependencies():
    try:
        import fastapi
        import uvicorn
        import sklearn
        import joblib
        import pandas
        import Crypto
        import pefile
        logging.info("All dependencies are installed.")
    except ImportError as e:
        logging.error("Missing dependencies. Please install required packages.")
        raise e

def check_os():
    import platform
    if platform.system() not in ['Linux', 'Windows']:
        raise EnvironmentError("Unsupported operating system. VAA supports Linux and Windows.")
    else:
        logging.info(f"Running on supported OS: {platform.system()}")

if __name__ == "__main__":
    check_dependencies()
    check_os()
    governor = VaaGovernor(logger=logging.getLogger("VAA_Governor"))
    app.state.governor = governor  # Attach the governor instance to the FastAPI app
    # Start the main loop to handle client connections
    governor.start()