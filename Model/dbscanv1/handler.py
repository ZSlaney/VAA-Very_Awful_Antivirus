import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN
import pandas as pd

def dbscan(input):
    cl = joblib.load('./cluster.joblib')
