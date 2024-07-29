from flask import Blueprint, request, jsonify
from .model import User, Admin, Student_data
from .extensions import db, jwt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.exceptions import UnsupportedMediaType
import uuid

api = Blueprint('api', __name__)

@api.route('/api/student/register', methods=['POST'])
def student_register():
    try:
        # Check content type and get data accordingly
        if request.content_type == 'application/json':
            data = request.get_json()
        elif request.content_type in ['application/x-www-form-urlencoded', 'multipart/form-data', 'multipart/form-data; boundary=X-INSOMNIA-BOUNDARY']:
            data = request.form
        else:
            raise UnsupportedMediaType(f"Unsupported content type: {request.content_type}")

        # Validate required fields
        required_fields = ['first_name', 'last_name', 'username', 'email', 'password']
        for field in required_fields:
            if field not in data:
                return jsonify({"message": f"Missing required field: {field}"}), 400

        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({"message": "User already exists"}), 400

        # Create new user
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

        return jsonify({
                        "message": "User registered successfully",
                        "user": {
                            "id": new_user.id,
                            "first_name": new_user.first_name,
                            "last_name": new_user.last_name,
                            "username": new_user.username,
                            "email": new_user.email
                        }
                    }), 201
        
    # handle errors of headers
    except UnsupportedMediaType as e:
        return jsonify({"message": str(e)}), 415
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

# Student Login
@api.route('/api/student/login', methods=['POST'])
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

# Admin Registration
@api.route('/api/admin/register', methods=['POST'])
def admin_register():
    try:
        # Check content type and get data accordingly
        if request.content_type == 'application/json':
            data = request.get_json()
        elif request.content_type in ['application/x-www-form-urlencoded', 'multipart/form-data', 'multipart/form-data; boundary=X-INSOMNIA-BOUNDARY']:
            data = request.form
        else:
            raise UnsupportedMediaType(f"Unsupported content type: {request.content_type}")

        # Validate required fields
        required_fields = ['admin_name', 'username', 'email', 'password']
        for field in required_fields:
            if field not in data:
                return jsonify({"message": f"Missing required field: {field}"}), 400
        
        # Check if admin already exists
        if Admin.query.filter_by(email=data['email']).first():
            return jsonify({"message": "Admin already exists"}), 400
        
        # Create new admin
        new_admin = Admin(
            id=str(uuid.uuid4()),
            admin_name=data['admin_name'],
            username=data['username'],
            email=data['email'],
            password=generate_password_hash(data['password'])
        )
        
        db.session.add(new_admin)
        db.session.commit()
        
        return jsonify({
                        "message": "Admin registered successfully",
                        "user": {
                            "id": new_admin.id,
                            "first_name": new_admin.admin_name,
                            "username": new_admin.username,
                            "email": new_admin.email,
                        }
                        }), 201
    # handle errors of headers
    except UnsupportedMediaType as e:
        return jsonify({"message": str(e)}), 415
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

# Admin Login
@api.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    admin = Admin.query.filter_by(email=data['email']).first()
    
    if admin and check_password_hash(admin.password, data['password']):
        access_token = create_access_token(identity=admin.id)
        return jsonify({
            "access_token": access_token,
            "admin":{
                "admin_name": admin.admin_name,
                "username": admin.username,
                "email": admin.email
            }
            }), 200
    
    return jsonify({"message": "Invalid credentials"}), 401

# Submit Student Data
@api.route('/api/student/data', methods=['POST'])
@jwt_required()
def submit_student_data():
    data = request.get_json()
    student_id = get_jwt_identity()
    
    value = data['extra_curricular_activities']
    
    # Convert value to boolean
    if value == 'yes':
        value = True
    else:
        value = False
        
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
        extra_curricular_activities=value,
        health=data['health'],
        home_environment=data['home_environment'],
        actual_grade=data['actual_grade'],
        cgpa=data['cgpa'],
        student_id=student_id
    )
    
    db.session.add(new_student_data)
    db.session.commit()
    
    return jsonify({"message": "Student data submitted successfully"}), 201

# Get All Students (Admin only)
@api.route('/api/admin/students', methods=['GET'])
@jwt_required()
def get_all_students():
    current_user = get_jwt_identity()
    if not Admin.query.get(current_user):
        return jsonify({"message": "Unauthorized access"}), 403
    
    students = User.query.all()
    return jsonify([{"id": s.id, "username": s.username, "email": s.email} for s in students]), 200

# Get Student by ID (Admin only)
@api.route('/api/admin/student/<string:id>', methods=['GET'])
@jwt_required()
def get_student_by_id(id):
    current_user = get_jwt_identity()
    if not Admin.query.get(current_user):
        return jsonify({"message": "Unauthorized access"}), 403
    
    student = User.query.get(id)
    if not student:
        return jsonify({"message": "Student not found"}), 404
    
    student_data = Student_data.query.filter_by(student_id=id).first()
    
    return jsonify({
        "id": student.id,
        "username": student.username,
        "email": student.email,
        "student_data": student_data.to_dict() if student_data else None
    }), 200

def init_app(app):
    jwt.init_app(app)
    app.register_blueprint(api)