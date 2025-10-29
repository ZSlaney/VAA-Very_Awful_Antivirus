import importlib.util

class ModelInterface:
    def __init__(self, model_name, model_version, model_type, handler_name):
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
        self.models = {}
        self.handlers = {}

    def load_models(self, folder):
        #walk folders exluding preprocessing and fetch meanifest.json and handler.py
        import os
        import json
        for root, dirs, files in os.walk(folder):
            if 'manifest.json' in files and 'handler.py' in files:
                manifest_path = os.path.join(root, 'manifest.json')
                with open(manifest_path, 'r') as f:
                    manifest = json.load(f)
                    model_name = manifest.get('name')
                    model_version = manifest.get('version')
                    model_type = manifest.get('type')
                    handler_name = manifest.get('handler')
                    model_interface = ModelInterface(model_name, model_version, model_type, handler_name)
                    self.models[model_name] = model_interface
                    # Dynamically import handler module
                    handler_module_path = os.path.join(root, 'handler.py')
                    spec = importlib.util.spec_from_file_location(f"{model_name}_handler", handler_module_path)
                    handler_module = importlib.util.module_from_spec(spec)
                    spec.loader.exec_module(handler_module)
                    self.handlers[model_name] = handler_module

    def load_handlers(self, folder):
        # Logic to load preprocessing handlers from the specified folder
        for root, dirs, files in os.walk(folder):
            if 'handler.py' in files:
                handler_path = os.path.join(root, 'handler.py')
                spec = importlib.util.spec_from_file_location(f"{root}_handler", handler_path)
                handler_module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(handler_module)
                self.handlers[os.path.basename(root)] = handler_module
