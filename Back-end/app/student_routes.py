import os
from flask import Blueprint, request, jsonify
from .model import User, Student_data, Predicted_score
from .extensions import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.exceptions import UnsupportedMediaType
import uuid
from .predictions.grade_prediction_model import GradePredictionModel


student_bp = Blueprint('student_bp', __name__)

# init the GradePredictionModel
current_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the paths to the pickle files
linear_regression_path = os.path.join(current_dir, 'predictions', 'pickle_files', 'linear_regression_model.pkl')
decision_tree_path = os.path.join(current_dir, 'predictions', 'pickle_files', 'decision_tree_model.pkl')

grade_model = GradePredictionModel(linear_regression_path, decision_tree_path)

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

    # Check if a record already exists for this student and course
    existing_data = Student_data.query.filter_by(
        student_id=student_id,
        course_name=data['course_name']
    ).first()

    if existing_data:
        # If both student_id and course_name match, return error
        return jsonify({"message": "Student data already exists for this course"}), 400

    # If we reach here, either student_id doesn't exist or course_name is different
    # So we create a new record
    new_student_data = Student_data(
        id=str(uuid.uuid4()),
        student_id=student_id,
        **data
    )
    db.session.add(new_student_data)

    try:
        db.session.commit()
        return jsonify({"message": "Student data submitted successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

# Fetch all Student Data
@student_bp.route('/api/student/datas', methods=['GET'])
@jwt_required()
def get_student_data():
    student_id = get_jwt_identity()
    student_data_list = Student_data.query.filter_by(student_id=student_id).all()

    if not student_data_list:
        return jsonify({"message": "Student data not found"}), 404

    student_data_dicts = [student_data.to_dict() for student_data in student_data_list]

    return jsonify(student_data_dicts), 200

# predicting student data   
@student_bp.route('/api/student/create/prediction', methods=['GET'])
@jwt_required()
def create_student_prediction():
    current_user = get_jwt_identity()
    data = request.get_json()
    student_data = Student_data.query.filter_by(student_id=current_user).first()
    
    if not student_data:
        return jsonify({"message": "Student data not found"}), 404
    
    # Check if the student has a prediction for that course already
    existing_prediction = Predicted_score.query.filter_by(
        student_data_id=student_data.id,
        course_name=data['course_name']
    ).first()
    
    if existing_prediction:
        return jsonify({
            "message": "Prediction for this course already exists",
            "existing_prediction": existing_prediction.to_dict()
        }), 400
    
    try:
        # Convert student_data to a dictionary
        student_data_dict = student_data
        
        # Perform prediction
        predictions = grade_model.predict(student_data_dict)
        
        # Extract individual predictions
        decision_tree_pred_class = predictions['decision_tree']['predicted_class']
        decision_tree_pred_prob = predictions['decision_tree']['probability_distribution']
        risk_factor = predictions['risk_factor']
        linear_regression_pred = float(predictions['linear_regression'])
        
        # Create new Predicted_score entry
        new_prediction = Predicted_score(
            decision_tree_pred_class=decision_tree_pred_class,
            decision_tree_pred_prob=decision_tree_pred_prob,
            linear_regression_pred=linear_regression_pred,
            risk_factor=risk_factor,
            student_data_id=student_data.id,
            course_name=student_data.course_name
        )
        
        db.session.add(new_prediction)
        db.session.commit()
        
        return jsonify({
            "predictions": "Prediction made successful",
            "access token": current_user,
            "stored_prediction": new_prediction.to_dict()
        })
    
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "message": f"An error occurred: {str(e)}"
        }), 500

# get all student predictions 
@student_bp.route('/api/student/predictions', methods=['GET'])
@jwt_required()
def get_student_predictions():
    current_user = get_jwt_identity()
    # get the student_data for the current user
    student_data = Student_data.query.filter_by(student_id=current_user).first()
    
    if not student_data:
        return jsonify({"message": "Student data not found"}), 404
    
    # Now get all predictions for this student_data
    predicted_scores = Predicted_score.query.filter_by(student_data_id=student_data.id).all()
    
    # Convert predictions to dict
    predictions = [score.to_dict() for score in predicted_scores]
    
    return jsonify({
        "user_id": current_user,
        "predictions": predictions
    }), 200
