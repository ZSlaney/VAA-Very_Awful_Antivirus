import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN
import pandas as pd

def dbs(input):
    cl = joblib.load('Model/cluster.joblib')