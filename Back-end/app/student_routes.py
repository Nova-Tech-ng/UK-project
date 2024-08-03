from flask import Blueprint, request, jsonify
from .model import User, Student_data, Predicted_score
from .extensions import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.exceptions import UnsupportedMediaType
import uuid
# from .grade_prediction_model import GradePredictionModel


student_bp = Blueprint('student_bp', __name__)

# init the GradePredictionModel
# grade_model = GradePredictionModel('./pickle_files/linear_regression_model.pkl', './pickle_files/decision_tree_model.pkl')

# Student Registration
@student_bp.route('/api/student/register', methods=['POST'])
def student_register():
    try:
        if request.content_type == 'application/json':
            data = request.get_json()
        elif request.content_type in ['application/x-www-form-urlencoded', 'multipart/form-ddecision_tree_model.pklata', 'multipart/form-data; boundary=X-INSOMNIA-BOUNDARY']:
            data = request.form
        else:
            raise UnsupportedMediaType(f"Unsupported content type: {request.content_type}")

        required_fields = ['first_name', 'last_name', 'username', 'email', 'password']
        for field in required_fields:
            if field not in data:
                return jsonify({"message": f"Missing required field: {field}"}), 400

        if User.query.filter_by(email=data['email']).first():
            return jsonify({"message": "User already exists"}), 400

        new_user = User(
            id=str(uuid.uuid4()),
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['username'],
            email=data['email'],
            password=generate_password_hash(data['password'])
        )

        db.session.add(new_user)
        db.session.commit()
        access_token = create_access_token(identity=new_user.id)

        return jsonify({
            "message": "User registered successfully",
            "user": {
                "id": new_user.id,
                "first_name": new_user.first_name,
                "last_name": new_user.last_name,
                "username": new_user.username,
                "email": new_user.email,
                "access_token": access_token,
            }
        }), 201
    except UnsupportedMediaType as e:
        return jsonify({"message": str(e)}), 415
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

# Student Login
@student_bp.route('/api/student/login', methods=['POST'])
def student_login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            "access_token": access_token,
            "user": {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "username": user.username,
                "email": user.email
            }
        }), 200

    return jsonify({"message": "Invalid credentials"}), 401

# Submit Student Data
@student_bp.route('/api/student/data', methods=['POST'])
@jwt_required()
def submit_student_data():
    data = request.get_json()
    student_id = get_jwt_identity()

    new_student_data = Student_data(
        id=str(uuid.uuid4()),
        age=data['age'],
        grade_level=data['grade_level'],
        learning_style=data['learning_style'],
        socio_economic_status=data['socio_economic_status'],
        past_grades=data['past_grades'],
        standardized_test_scores=data['standardized_test_scores'],
        prior_knowledge=data['prior_knowledge'],
        course_id=data['course_id'],
        course_name=data['course_name'],
        course_difficulty=data['course_difficulty'],
        class_size=data['class_size'],
        teaching_style=data['teaching_style'],
        course_work_load=data['course_work_load'],
        attendance=data['attendance'],
        study_time=data['study_time'],
        time_of_year=data['time_of_year'],
        extra_curricular_activities=data['extra_curricular_activities'],
        health=data['health'],
        home_environment=data['home_environment'],
        actual_grade=data['actual_grade'],
        cgpa=data['cgpa'],
        student_id=student_id
    )

    db.session.add(new_student_data)
    db.session.commit()

    return jsonify({"message": "Student data submitted successfully"}), 201

# @student_bp.route('/api/student/predict', methods=['GET'])
# @jwt_required()
# def student_prediction():
#     current_user = get_jwt_identity()
#     student_prediction_data = Student_data.query.filter_by(student_id=current_user).first()
    
#     if not student_prediction_data:
#         return jsonify({"message": "Student data not found"}), 404
    
#     print(student_prediction_data)
    
    # try:
        
    #     predictions = grade_model.predict(student_prediction_data)
        
    #     # Extract individual predictions
    #     decision_tree_pred = predictions['decision_tree']['predicted_class']
    #     linear_regression_pred = predictions['linear_regression']['predicted_grade']
        
    #     new_prediction = Predicted_score(
    #         id=str(uuid.uuid4()),
    #         predict_grade_decision_tree=decision_tree_pred,
    #         predict_grade_linear_regression=linear_regression_pred,
    #         student_data_id=student_prediction_data.id
    #     )
        
    #     db.session.add(new_prediction)
    #     db.session.commit()
        
    #     return jsonify({
    #         "predictions": predictions,
    #         "stored_prediction": new_prediction.to_dict()
    #     })
    
    # except Exception as e:
    #     db.session.rollback()
    #     return jsonify({
    #         "message": f"An error occurred: {str(e)}"
    #     }), 500