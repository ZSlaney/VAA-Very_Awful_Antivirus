from sklearn.linear_model import LogisticRegression
import joblib
from sklearn.preprocessing import StandardScaler
import pandas as pd

def log_reg(input):
    lr = joblib.load('Model/log_reg.joblib')