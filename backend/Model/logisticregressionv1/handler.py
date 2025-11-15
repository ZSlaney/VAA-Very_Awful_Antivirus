import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
import pandas as pd
from backend.Model.Model_Handler import ModelInterface
import os

PATH = os.path.dirname(os.path.abspath(__file__)) + "/log_reg.joblib"

class Model(ModelInterface):
    def __init__(self, model_name="", model_version="", model_type="", handler_name="PEExtract"):
        super().__init__(model_name, model_version, model_type, handler_name)
        self.load_model()

    def load_model(self):
        # Load the Random Forest model
        self.model: LogisticRegression = joblib.load(PATH)

    def predict(self, processed_data) -> dict:
        # Make predictions using the loaded Random Forest model
        processed_data = processed_data.drop(columns="SHA256")
        
        prediction = self.model.predict(processed_data)
        conf = self.model.predict_proba(processed_data)

        print(prediction)
        print(conf)
        res = {"Classification": prediction, "Confidence": conf}
        return res