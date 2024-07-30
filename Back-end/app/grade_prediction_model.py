import pickle
import numpy as np

class GradePredictionModel:
    def __init__(self, linear_regression_path, decision_tree_path):
        self.linear_regression_model = self.load_model(linear_regression_path)
        self.decision_tree_model = self.load_model(decision_tree_path)
        self.feature_order = ['Age', 'Past Grades', 'Standardized Test Scores', 'Class Size', 'Attendance', 'Study Time']

    @staticmethod
    def load_model(model_path):
        """Loads the pickled model from the specified path."""
        with open(model_path, 'rb') as f:
            return pickle.load(f)

    def process_data(self, data):
        """Processes the input data into the correct format for model prediction."""
        return np.array([data[feature] for feature in self.feature_order]).reshape(1, -1)

    def predict_grade_linear_regression(self, data):
        """Predicts a student's grade using the linear regression model."""
        processed_data = self.process_data(data)
        prediction = self.linear_regression_model.predict(processed_data)
        return prediction[0]

    def predict_grade_decision_tree(self, data):
        """Predicts a student's grade using the decision tree model."""
        processed_data = self.process_data(data)
        probabilities = self.decision_tree_model.predict_proba(processed_data)[0]
        threshold = 0.5  # Adjust threshold as needed
        predicted_class = "Pass" if probabilities[1] >= threshold else "Fail"
        return predicted_class, probabilities.tolist()

    def predict(self, data):
        """Makes predictions using both models and returns a combined result."""
        linear_prediction = self.predict_grade_linear_regression(data)
        decision_tree_prediction, probabilities = self.predict_grade_decision_tree(data)
        
        return {
            'linear_regression': {
                'predicted_grade': float(linear_prediction)
            },
            'decision_tree': {
                'predicted_class': decision_tree_prediction,
                'probability_distribution': probabilities
            }
        }