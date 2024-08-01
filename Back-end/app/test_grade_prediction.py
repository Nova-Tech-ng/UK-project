# from grade_prediction_model import GradePredictionModel

# class MockStudentData:
#     def __init__(self, **kwargs):
#         for key, value in kwargs.items():
#             setattr(self, key, value)

# # Create a mock student data object with sample data
# student_data = MockStudentData(
#     age=16,
#     grade_level="Freshman",
#     learning_style="Visual",
#     socio_economic_status="Middle Income",
#     past_grades=90.8,
#     standardized_test_scores=1200,
#     prior_knowledge="None",
#     course_id=101,
#     course_name="Introduction to Psychology",
#     course_difficulty="Medium",
#     class_size=25,
#     teaching_style="Lecture-based",
#     course_work_load="Projects, Presentations",
#     attendance=90,
#     study_time=15,
#     time_of_year="Spring Semester",
#     extra_curricular_activities="Yes",
#     health="Good",
#     home_environment="Quiet",
#     actual_grade="A",
#     cgpa=3.8
# )

# linear_regression_model_path = './pickle_files/linear_regression_model.pkl'
# decision_tree_model_path = './pickle_files/decision_tree_model.pkl'

# # Instantiate the GradePredictionModel with the paths to the models
# model = GradePredictionModel(linear_regression_model_path, decision_tree_model_path)

# # Run predictions and print the results
# predictions = model.predict(student_data)

# # Print the prediction results
# print("Linear Regression Prediction:")
# print(f"Predicted Grade: {predictions['linear_regression']['predicted_grade']}")
# print("\nDecision Tree Prediction:")
# print(f"Predicted Class: {predictions['decision_tree']['predicted_class']}")
# print(f"Probability Distribution: {predictions['decision_tree']['probability_distribution']}")
