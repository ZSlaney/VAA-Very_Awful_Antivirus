import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
import pandas as pd

def logistic_reg(input):
    lr = joblib.load('./log_reg.joblib')
