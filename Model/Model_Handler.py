import joblib
from sklearn.metrics import confusion_matrix, classification_report, roc_curve, auc
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import pandas as pd

rf = joblib.load('Model/random_forest.joblib')