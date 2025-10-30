import importlib.util
from randomforestv1 import handler

class ModelInterface:
    def __init__(self, model_name="", model_version="", model_type="", handler_name=""):
        self.model_name = model_name
        self.model_version = model_version
        self.model_type = model_type
        self.handler_name = handler_name
        self.model = None

    def load_model(self):
        # Logic to load the model based on type and version
        pass

    def predict(self, processed_data):
        # Logic to make predictions using the loaded model
        pass

class ModelHandler:
    def __init__(self):
        from preprocessing import PEExtract
        self.models = {}
        self.handlers = {"PEExtract": PEExtract.Processor()}

    
if __name__ == "__main__":
    test = handler.Model()
    Masterclass = ModelHandler()
    file="/home/zach-slaney/Downloads/VSCodeUserSetup-x64-1.105.1.exe"
    handler = test.handler_name
    handlers = Masterclass.handlers
    print(test.predict(handlers[handler].execute(path = file)))