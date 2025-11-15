from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matrix, classification_report
from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import joblib
import os

JOBLIBS_FOLDER = os.path.dirname(os.path.abspath(__file__)) + "/joblibs"

# Load the dataset
csv_path = "./Model_Generation/Data/Base_Dataset.csv"
data = pd.read_csv(csv_path)

# Extract features and labels
filehash = data['SHA256']
labels = data['Type']
labels = labels.apply(lambda x: 0 if x == 0 else 1)
features = data.drop(columns=['SHA256', 'Type'])


# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)

# # Standardize features
# scaler = StandardScaler()
# X_train = scaler.fit_transform(X_train)
# X_test = scaler.fit_transform(X_test)
# print("Data preprocessing completed.")

print("Dataset Characteristics:")
print("Number of samples:", data.shape[0])
print("Number of features:", data.shape[1] - 2)
print("Class distribution:")
print(labels.value_counts())
print("First few rows of the dataset:")
print(data.head())

# Train Random Forest
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
print("Model training completed.")

y_pred = rf.predict(X_test)
y_prob = rf.predict_proba(X_test)[:, 1]

# Print classification report
print("Classification Report:")
print(classification_report(y_test, y_pred))

# Confusion matrix
cm = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:")
print(cm)

if os.path.isdir(JOBLIBS_FOLDER) == False:
    #Create folder
    os.mkdir(JOBLIBS_FOLDER)
joblib.dump(rf, './Model_Generation/joblibs/random_forest.joblib')