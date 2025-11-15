#log regression test

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matrix, classification_report
from sklearn.linear_model import LogisticRegression
import pandas as pd
import joblib


# Load the dataset
csv_path = "./Model_Generation/Data/Base_Dataset.csv"  
data = pd.read_csv(csv_path)

# Extract features and labels
filehash = data['SHA256']
labels = data['Type']

#change types greater than 1 to 1
labels = labels.apply(lambda x: 0 if x == 0 else 1)


features = data.drop(columns=['SHA256', 'Type'])

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)

# Standardize the features
# scaler = StandardScaler()
# X_train = scaler.fit_transform(X_train)
# X_test = scaler.transform(X_test)

print("Data preprocessing completed.")

# View dataset characteristics before training
print("Dataset Characteristics:")
print("Number of samples:", data.shape[0])
print("Number of features:", data.shape[1] - 2)  
print("Class distribution:")
print(labels.value_counts())
print("First few rows of the dataset:")
print(data.head())


log_reg = LogisticRegression(max_iter=800, random_state=42)
log_reg.fit(X_train, y_train)

print("Model training completed.")

y_pred = log_reg.predict(X_test)
y_prob = log_reg.predict_proba(X_test)[:, 1]



# Print classification report
print("Classification Report:")
print(classification_report(y_test, y_pred))

# Confusion matrix
cm = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:")
print(cm)

joblib.dump(log_reg, './Model_Generation/joblibs/log_reg.joblib')