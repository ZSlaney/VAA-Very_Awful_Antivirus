import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
import pandas as pd
from Model_Handler import ModelInterface
import os

PATH = os.path.dirname(os.path.abspath(__file__)) + "/log_reg.joblib"

class Model(ModelInterface):
    def __init__(self, model_name, model_version, model_type, handler_name):
        super().__init__(model_name, model_version, model_type, handler_name)
        self.load_model()

    def load_model(self):
        # Load the Random Forest model
        self.model = joblib.load(PATH)

    def predict(self, processed_data):
        # Make predictions using the loaded Random Forest model
        predictions = self.model.predict(processed_data)
        return predictions