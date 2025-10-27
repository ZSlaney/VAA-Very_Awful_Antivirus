import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import pandas as pd

def rand_forest(input):
    rf = joblib.load('./random_forest.joblib')
