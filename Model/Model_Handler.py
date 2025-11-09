import importlib.util
from datetime import datetime, timedelta

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

    AGE_OUT_S = 60
   

    def __init__(self):
        
        self.models = ["RandomForestV1", "LogisticRegressionV1"]
        self.handlers = {"PEExtract": self.PEExtract.Processor()}

        self.jobs = []  # List to keep track of model jobs
        #{"id", "filepath", "model_name", "status", "result", model_instance}
        #
        #
   

    def get_jobs(self):
        return self.jobs
    
    def get_user_jobs(self, key):
        user_jobs = []
        for job in self.jobs:
            if job["key"] == key:
                user_jobs.append(job)

        return user_jobs

    
    def get_job(self, job_id, key):
        for job in self.jobs:
            if job["id"] == job_id:
                if job["key"] == key:
                    return job
        
        return False

    def runmodel(self, jobId, path) -> dict:
        for job in self.jobs:
            if job["id"] == jobId:
                print("Found job")
                model_instance = job["model_instance"]
                handler = job["handler"]

                if model_instance:
                    # Logic to run the model on the given file
                    data = handler.execute(path=path)
                    model_instance.load_model()
                    res = model_instance.predict(data)

                    hash = data["SHA256"][0]

                    classif = bool(res["Classification"][0])

                    if classif == 0:
                        confid = res["Confidence"][0][0] * 100
                    else:
                        confid = res["Confidence"][0][1] * 100
                    
                    job["status"] = "Complete"
                    job["hash"] = hash
                    job["result"] = {"Classification": classif, "Confidence":confid}
                    job["timestamp"] = datetime.now()
                    return job
        #No job found
        return False
            

    def add_job(self, filename, model_name, key):
        if len(self.jobs) == 0:
            job_id = 1
        else:
            job_id = self.jobs[len(self.jobs) - 1]["id"] + 1

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
            "filename": filename,
            "hash": "",
            "model_name": model_name,
            "status": "pending",
            "result": None,
            "model_instance": model_instance,
            "handler": handler,
            "timestamp": datetime,
            "key": key
        }
        job["timestamp"] = datetime.now()
        self.jobs.append(job)
        return job_id
    
    def remove_old_jobs(self):
        for job in self.jobs:
            if job["status"] == "Complete":
                delta: timedelta = datetime.now() - job["timestamp"]
                if delta.total_seconds() >= self.AGE_OUT_S:
                    self.jobs.remove(job)


    
if __name__ == "__main__":
    test = rf.Model()
    Masterclass = ModelHandler()
    file="/home/zach-slaney/Downloads/VSCodeUserSetup-x64-1.105.1.exe"
    handler = test.handler_name
    handlers = Masterclass.handlers
    print(test.predict(handlers[handler].execute(path = file)))