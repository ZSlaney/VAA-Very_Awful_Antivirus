from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN
import pandas as pd
from sklearn.metrics import silhouette_score
import matplotlib.pyplot as plt
import joblib

# Load the dataset
csv_path = "./Data/Base_Dataset.csv"
data = pd.read_csv(csv_path)

# Extract features and labels
filehash = data['SHA256']
labels = data['Type']
labels = labels.apply(lambda x: 0 if x == 0 else 1)

features = data.drop(columns=['SHA256', 'Type'])
# Standardize features
scaler = StandardScaler()
features_scaled = scaler.fit_transform(features)
print("Data preprocessing completed.")

print("Dataset Characteristics:")
print("Number of samples:", data.shape[0])
print("Number of features:", features.shape[1])
print("Class distribution:")
print(labels.value_counts())
print("First few rows of the dataset:")
print(data.head())

# DBSCAN clustering



min_samples = 15
eps = 0.7

dbscan = DBSCAN(eps=eps, min_samples=min_samples)
clusterlabels = dbscan.fit_predict(features_scaled)
silhouette_avg = silhouette_score(features_scaled, clusterlabels)

print(f"EPS: {eps}, Min Samples: {min_samples} => Silhouette Score: {silhouette_avg}")

joblib.dump(dbscan, 'cluster.joblib')
