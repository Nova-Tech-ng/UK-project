from grade_prediction_model import GradePredictionModel

class MockStudentData:
    def __init__(self, **kwargs):
        self.__dict__ = kwargs
        for key, value in kwargs.items():
            setattr(self, key, value)
    
    def __iter__(self):
        return iter(self.__dict__.values())


# Create a mock student data object with sample data
student_data = MockStudentData(
    age=20,
    grade_level="Freshman",
    learning_style="Visual",
    socio_economic_status="Middle Income",
    past_grades=39.8,
    standardized_test_scores=900,
    prior_knowledge="None",
    course_id=101,
    course_name="Advanced Calculus",
    course_difficulty="Hard",
    class_size=45,
    teaching_style="Lecture-based",
    course_work_load="Projects, Presentations",
    attendance=20,
    study_time=5,
    time_of_year="Spring Semester",
    extra_curricular_activities="Yes",
    health="Good",
    home_environment="Quiet",
    actual_grade="D",
    cgpa=1.5
)
 

linear_regression_model_path = 'pickle_files/linear_regression_model.pkl'
decision_tree_model_path = 'pickle_files/decision_tree_model.pkl'

# Instantiate the GradePredictionModel with the paths to the models
model = GradePredictionModel(linear_regression_model_path, decision_tree_model_path)

# Run predictions and print the results
predictions = model.predict(student_data)

pred = float(predictions['linear_regression'])

risk_factor = ""

if pred > 3.5:
    risk_factor = "Not at risk"

elif pred >= 3.0:
    risk_factor = "Risky"
else:
    risk_factor = "At risk"

print(risk_factor)

