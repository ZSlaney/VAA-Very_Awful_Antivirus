import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import pandas as pd
from Model_Handler import ModelInterface
import os

PATH = os.path.dirname(os.path.abspath(__file__)) + "/random_forest.joblib"

class Model(ModelInterface):
    def __init__(self, model_name="", model_version="", model_type="", handler_name="PEExtract"):
        super().__init__(model_name, model_version, model_type, handler_name)
        self.load_model()

    def load_model(self):
        # Load the Random Forest model
        self.model:RandomForestClassifier = joblib.load(PATH)

    def predict(self, processed_data: pd.DataFrame):
        # Make predictions using the loaded Random Forest model
        print(processed_data.head())
        processed_data = processed_data.drop(columns="SHA256")
        scaler = StandardScaler()
        processed_data = scaler.fit_transform(processed_data)
        predictions = self.model.predict(processed_data)
        return predictions