# -*- coding: utf-8 -*-
"""decision_tree_model

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/17mMLGYnmSmVcHpwx2Ao7kT5Ek-cXM_MF
"""

# Import libraries
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, mean_squared_error, r2_score
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, mean_squared_error, r2_score
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split, KFold, cross_val_score
from sklearn.metrics import make_scorer
import pickle
from google.colab import files
# from sklearn.model_selection import KFold


# Load student data
data = pd.read_csv("/content/sample_data/student data.csv")

# Preprocess data
# Handle categorical features with one-hot encoding
data = pd.get_dummies(data, columns=["Learning Style", "Course Name", "Course Difficulty", "Teaching Style","Grade Level"])


# Identify numerical features automatically
numerical_features = data.select_dtypes(include=['number']).columns.tolist()


# Standardize numerical features
scaler = StandardScaler()
numerical_features = ["Age", "Standardized Test Scores", "Past Grades", "Attendance", "Study Time", "cgpa"]
data[numerical_features] = scaler.fit_transform(data[numerical_features])



# Split data into features (X) and target variable (y)

# Exclude "Name" from features
features_to_drop = ["Name","Socioeconomic Status","Prior Knowledge", "Coursework Load","Time of Year","Extracurricular Activities","Health","Home Environment","Actual Grade"]
X = data.drop(features_to_drop, axis=1)
y = data["Actual Grade"]


# Map grades to Pass/Fail
# Define a function to map letter grades to Pass/Fail
def map_to_pass_fail(grade):
    if grade in ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C']:
        return 'Pass'
    else:
        return 'Fail'

# Apply the mapping to the 'Actual Grade' column
y = y.apply(map_to_pass_fail)

# Identify relevant columns for imputation (exclude irrelevant ones)
relevant_columns = X.columns

# Handle missing values using SimpleImputer for relevant columns only
imputer = SimpleImputer(strategy='mean')
X[relevant_columns] = imputer.fit_transform(X[relevant_columns])

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train the decision tree model (classification)
model = DecisionTreeClassifier(criterion= "gini",splitter = "best")
model.fit(X_train, y_train)

# # Make predictions on test data


# Make predictions on test data (get probabilities for 'Pass')
y_pred_proba = model.predict_proba(X_test)[:, 1]  # Probability of 'Pass'
y_pred = model.predict(X_test) # Get the actual class predictions

# Set a threshold for 'At Risk' classification
threshold = 0.6

# Classify students as 'At Risk' or 'Not at Risk'
risk_predictions = ['At Risk' if prob < threshold else 'Not at Risk' for prob in y_pred_proba]

# Print risk predictions
for i, prediction in enumerate(risk_predictions):
    print(f"Student {i+1}: {prediction}")


# Print predictions, actual labels, and risk assessments
for i, (prediction, actual, risk) in enumerate(zip(y_pred, y_test, risk_predictions)):
    print(f"Student {i+1}: Predicted - {prediction}, Actual - {actual}, Risk - {risk}")

# Calculate probabilities for "At Risk" and "Not at Risk"
risk_probabilities = np.vstack([1 - y_pred_proba, y_pred_proba]).T

# Print results in the desired format
for i, probs in enumerate(risk_probabilities, start=1):
    print(f"Student {i} {probs.tolist()}")

# Save the model to a pickle file
with open('decision_tree_model.pkl', 'wb') as f:
    pickle.dump(model, f)



# Create a DataFrame to store probabilities for the TEST SET ONLY
results_df = pd.DataFrame({
    'Student ID': X_test['Student ID'],  # Use Student ID from the TEST SET
    'Risk Probability of Failing': risk_probabilities[:, 0],
    'Risk Probability of Passing': risk_probabilities[:, 1]
})
# Save the results DataFrame as a CSV file
results_df.to_csv('decision_tree_results.csv', index=False)


# Download the CSV file
files.download('decision_tree_results.csv')





# Evaluate model performance (classification metrics)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Precision:", precision_score(y_test, y_pred, pos_label='Pass')) # Assuming 'Pass' is the positive label
print("Recall:", recall_score(y_test, y_pred, pos_label='Pass'))
print("F1-score:", f1_score(y_test, y_pred, pos_label='Pass'))


# Set up k-fold cross-validation



k = 5
kf = KFold(n_splits=k, shuffle=True, random_state=42)  # Shuffle data and set random state for reproducibility




# Create scorers with 'Pass' as the positive label
precision_scorer = make_scorer(precision_score, pos_label='Pass')
recall_scorer = make_scorer(recall_score, pos_label='Pass')
f1_scorer = make_scorer(f1_score, pos_label='Pass')

# Perform cross-validation and get scores for different metrics
accuracy_scores = cross_val_score(model, X, y, cv=kf, scoring='accuracy')
precision_scores = cross_val_score(model, X, y, cv=kf, scoring=precision_scorer)  # Use precision_scorer
recall_scores = cross_val_score(model, X, y, cv=kf, scoring=recall_scorer)    # Use recall_scorer
f1_scores = cross_val_score(model, X, y, cv=kf, scoring=f1_scorer)       # Use f1_scorer

# Print the average scores across folds
print("Average Accuracy:", accuracy_scores.mean())
print("Average Precision:", precision_scores.mean())
print("Average Recall:", recall_scores.mean())
print("Average F1-score:", f1_scores.mean())