import pickle
import numpy as np

class GradePredictionModel:
    def __init__(self, linear_regression_path, decision_tree_path):
        self.linear_regression_model = self.load_model(linear_regression_path)
        self.decision_tree_model = self.load_model(decision_tree_path)
        self.feature_order = [
            'Age', 'Grade Level', 'Learning Style', 'Socio Economic Status',
            'Past Grades', 'Standardized Test Scores', 'Prior Knowledge',
            'Course ID', 'Course Name', 'Course Difficulty', 'Class Size',
            'Teaching Style', 'Course Work Load', 'Attendance', 'Study Time',
            'Time of Year', 'Extra Curricular Activities', 'Health',
            'Home Environment', 'Actual Grade', 'CGPA'
        ]
        self.grade_mapping = {
            "A+": 4, "A": 4, "A-": 4,
            "B+": 3, "B": 3, "B-": 3,
            "C+": 2, "C": 2, "C-": 2,
            "D+": 1, "D": 1, "D-": 1,
            "F": 0
        }
        self.required_fields = [field.lower().replace(' ', '_') for field in self.feature_order]
        

    @staticmethod
    def load_model(model_path):
        """Loads the pickled model from the specified path."""
        with open(model_path, 'rb') as f:
            return pickle.load(f)

    def clean_data(self, student_data):
        """Cleans and processes the student data for prediction."""
        cleaned_data = {}

        # Check if all required fields are present
        missing_fields = [field for field in self.required_fields if not hasattr(student_data, field)]
        if missing_fields:
            raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")

        for field in self.required_fields:
            value = getattr(student_data, field)
            
            # Handle specific fields
            if field == 'actual_grade':
                # If actual_grade is already a number, use it directly
                if isinstance(value, (int, float)):
                    cleaned_data[field] = float(value)
                else:
                    # If it's a letter grade, map it to a number
                    cleaned_data[field] = self.grade_mapping.get(value, 0)
            elif field in ['age', 'class_size', 'attendance', 'study_time', 'course_id', 'standardized_test_scores']:
                cleaned_data[field] = int(value) if value is not None else 0
            elif field in ['past_grades', 'cgpa']:
                cleaned_data[field] = float(value) if value is not None else 0.0
            elif field == 'extra_curricular_activities':
                cleaned_data[field] = 1 if value else 0  # Assuming it's a boolean
            else:
                # Keeps everything else as strings
                cleaned_data[field] = str(value) if value is not None else ''

        # Ensure the feature order matches what the model expects
        ordered_data = [cleaned_data.get(feature.lower().replace(' ', '_'), 0) for feature in self.feature_order]
        
        return np.array(ordered_data).reshape(1, -1)

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

    def predict(self, student_data):
        """Makes predictions using both models and returns a combined result."""
        processed_data = self.clean_data(student_data)
        
        linear_prediction = self.predict_grade_linear_regression(processed_data)
        decision_tree_prediction, probabilities = self.predict_grade_decision_tree(processed_data)
        
        return {
            'linear_regression': {
                'predicted_grade': float(linear_prediction)
            },
            'decision_tree': {
                'predicted_class': decision_tree_prediction,
                'probability_distribution': probabilities
            }
        }