import importlib.util

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
    from Model.randomforestv1 import handler as rf
    from Model.logisticregressionv1 import handler as lr
    from Model.preprocessing import PEExtract

    def __init__(self):
        
        self.models = ["RandomForestV1", "LogisticRegressionV1"]
        self.handlers = {"PEExtract": self.PEExtract.Processor()}

        self.jobs = []  # List to keep track of model jobs
        #{"id", "filepath", "model_name", "status", "result", model_instance}
        #
        #
   

    def get_jobs(self):
        return self.jobs

    def runmodel(self, jobId) -> dict:

        job = self.jobs[jobId - 1]
        model_instance = job["model_instance"]
        handler = job["handler"]

        if model_instance:
            # Logic to run the model on the given file
            data = handler.execute(path=job["filepath"])
            model_instance.load_model()
            res = model_instance.predict(data)
            return res

            

    def add_job(self, filepath, model_name):
        job_id = len(self.jobs) + 1
        match model_name:
            case "RandomForestV1":
                model_instance = self.rf.Model()
                
            case "LogisticRegressionV1":
                #model_instance = lr.Model()
                raise NotImplementedError("Logistic Regression model not implemented yet.")
            case _:
                raise ValueError(f"Model {model_name} not recognized.")
        handler = self.handlers[model_instance.handler_name]
        job = {
            "id": job_id,
            "filepath": filepath,
            "model_name": model_name,
            "status": "pending",
            "result": None,
            "model_instance": model_instance,
            "handler": handler
        }
        self.jobs.append(job)
        return job_id

    
if __name__ == "__main__":
    test = rf.Model()
    Masterclass = ModelHandler()
    file="/home/zach-slaney/Downloads/VSCodeUserSetup-x64-1.105.1.exe"
    handler = test.handler_name
    handlers = Masterclass.handlers
    print(test.predict(handlers[handler].execute(path = file)))