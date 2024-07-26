## Student Data Analysis

### Description
This project analyzes student data to predict academic performance and identify potential risk factors. A decision tree model is used to classify students as "at risk" or "not at risk." and a linear regression model is used to predict student grades

### Dataset
The dataset contains information about students, including demographic data, academic performance, and behavioral factors.

### Dependencies
* pandas
* numpy
* scikit-learn
* matplotlib
* pickle

### Usage
1. Install required libraries using `pip install pandas numpy scikit-learn matplotlib pickle`
2. Prepare your student data in a CSV file with the same format as the provided sample data.
3. Replace the sample data file path with your data file path.
4. Run the Python script.

### Model
A decision tree classifier is used to predict student performance, as well as classify them into "At risk" and "Not at risk". The model is evaluated using accuracy, precision, recall, and F1-score.
A linear regression model is used to predict the students score. The model is evaluated using Mean squared Error and the predicted grade is plotted against the actual grade

### Results
Linear regression MSE rating:
	-Mean Squared Error: 0.27519532575238875
 
Decision tree Evaluations: 
 	-Accuracy: 0.9545454545454546
	-Precision: 0.9705882352941176
	-Recall: 0.9705882352941176
	-F1-score: 0.9705882352941176
 
Decision tree Cross-validation values: 
	-Average Accuracy: 0.9681818181818181
	-Average Precision: 0.9884033613445379
	-Average Recall: 0.9657017484413121
	-Average F1-score: 0.9768218645171393


##  Model Integration
Both trained models were extracted using pickle library for easy integration with other applications 
