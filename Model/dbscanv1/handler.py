import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN
import pandas as pd
from Model_Handler import ModelInterface
import os
import time

PATH = os.path.dirname(os.path.abspath(__file__)) + "/cluster.joblib"

class Model(ModelInterface):
    def __init__(self, model_name="", model_version="", model_type="", handler_name="PEExtract"):
        super().__init__(model_name, model_version, model_type, handler_name)
        self.load_model()

    def load_model(self):
        # Load the Random Forest model
        self.model:DBSCAN = joblib.load(PATH)


    def predict(self, processed_data: pd.DataFrame):
        processed_data = processed_data.drop("SHA256")
        processed_data
        # Make predictions using the loaded Random Forest model
        predictions = self.model.fit_predict(processed_data)
        return predictions
