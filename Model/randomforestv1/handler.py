import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import pandas as pd
from Model_Handler import ModelInterface

class Model(ModelInterface):
    def __init__(self, model_name, model_version, model_type, handler_name):
        super().__init__(model_name, model_version, model_type, handler_name)
        self.load_model()

    def load_model(self):
        # Load the Random Forest model
        self.model = joblib.load('./random_forest.joblib')

    def predict(self, processed_data):
        # Make predictions using the loaded Random Forest model
        predictions = self.model.predict(processed_data)
        return predictions




def rand_forest(input):
    rf = joblib.load('./random_forest.joblib')
