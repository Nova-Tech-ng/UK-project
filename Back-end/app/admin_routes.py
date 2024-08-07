from flask import Blueprint, request, jsonify, render_template
from .model import Admin, User, Student_data, Predicted_score
from sqlalchemy import or_, func
from .extensions import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.exceptions import UnsupportedMediaType
import uuid

admin_bp = Blueprint('admin_bp', __name__)

@admin_bp.route('/')
def api_documentation():
    return render_template('api_documentation.html')

# Admin Registration
@admin_bp.route('/api/admin/register', methods=['POST'])
def admin_register():
    """Registeration Route for admin

    Raises:
        UnsupportedMediaType: _description_

    Returns:
        JSON: {
                    "message": "Admin registered successfully",
                    "user": {
                        "access_token": "........",
                        "email": "........",
                        "first_name": "........",
                        "id": "........",
                        "username": "........."
                    }
                }
    """
    
    try:
        if request.content_type == 'application/json':
            data = request.get_json()
        elif request.content_type in ['application/x-www-form-urlencoded', 'multipart/form-data', 'multipart/form-data; boundary=X-INSOMNIA-BOUNDARY']:
            data = request.form
        else:
            raise UnsupportedMediaType(f"Unsupported content type: {request.content_type}")

        required_fields = ['admin_name', 'username', 'email', 'password']
        for field in required_fields:
            if field not in data:
                return jsonify({"message": f"Missing required field: {field}"}), 400

        if Admin.query.filter_by(email=data['email']).first():
            return jsonify({"message": "Admin already exists"}), 400

        new_admin = Admin(
            id=str(uuid.uuid4()),
            admin_name=data['admin_name'],
            username=data['username'],
            email=data['email'],
            password=data['password']
        )

        db.session.add(new_admin)
        db.session.commit()
        access_token = create_access_token(identity=new_admin.id)

        return jsonify({
            "message": "Admin registered successfully",
            "user": {
                "id": new_admin.id,
                "first_name": new_admin.admin_name,
                "username": new_admin.username,
                "email": new_admin.email,
                "access_token": access_token,
            }
        }), 201
    except UnsupportedMediaType as e:
        return jsonify({"message": str(e)}), 415
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

# Admin Login
@admin_bp.route('/api/admin/login', methods=['POST'])
def admin_login():
    """Login route for Admin

    Returns:
        JSON: {
                    "access_token": "........",
                    "admin": {
                        "admin_name": ".........",
                        "email": ".........",
                        "username": "........."
                    }
                }
    """
    data = request.get_json()
    admin = Admin.query.filter_by(email=data['email']).first()

    if admin and (admin.password == data['password']):
        access_token = create_access_token(identity=admin.id)
        return jsonify({
            "access_token": access_token,
            "admin": {
                "admin_name": admin.admin_name,
                "username": admin.username,
                "email": admin.email
            }
        }), 200

    return jsonify({"message": "Invalid credentials"}), 401

# Get All Students (Admin only)
@admin_bp.route('/api/admin/students', methods=['GET'])
@jwt_required()
def get_all_students():
    """ fetch all student route for admin

    Returns:
        JSON: [
                    {
                        "email": ".......",
                        "id": "...........",
                        "username": "........"
                    },
                    {
                        "email": "........",
                        "id": "...........",
                        "username": "........",
                        "full_name": "........",
                    },
                    ..........
                ]
    """
    current_user = get_jwt_identity()
    if not Admin.query.get(current_user):
        return jsonify({"message": "Unauthorized access"}), 403

    students = User.query.all()
    return jsonify([{"id": s.id, "username": s.username, "email": s.email, "first_name": s.first_name,  "last_name": s.last_name, "gender": s.gender} for s in students]), 200

# Get Student by ID 
@admin_bp.route('/api/admin/student/<string:id>', methods=['GET'])
@jwt_required()
def get_student_by_id(id: str):
    """_summary_

    Args:
        id (str): uses the ID to fetch the student

    Returns:
        JSON: {
                "email": ".......@gmail.com",
                "id": "........",
                "student_data": [
                    {
                        "actual_grade": "..........",
                        "age": ..........,
                        "attendance": ..........,
                        "cgpa": 4...........,
                        "class_size": ..........,
                        "course_difficulty": "..........",
                        "course_id": ..........,
                        ........
                    },	
                ],
                "username": "........"
            }
    """
    
    current_user = get_jwt_identity()
    if not Admin.query.get(current_user):
        return jsonify({"message": "Unauthorized access"}), 403

    student = User.query.get(id)
    if not student:
        return jsonify({"message": "Student not found"}), 404
    
    student_data = Student_data.query.filter_by(student_id=id).all()

    student_data_dict = [data.to_dict() for data in student_data] if student_data else None

    return jsonify({
        "id": student.id,
        "username": student.username,
        "email": student.email,
        "student_data": student_data_dict
    }), 200

@admin_bp.route('/api/admin/student/<string:id>/predictions', methods=['GET'])
@admin_bp.route('/api/admin/student/<string:id>/predictions/<string:course_name>', methods=['GET'])
@jwt_required()
def get_student_predictions_admin(id: str, course_name: str=None):
    """_summary_

    Args:
        id (str): student_id
        course_name (str, optional): course name . Defaults to None.

    Returns:
        _type_: {
                    "predictions": [
                        {
                            "course name": ".............",
                            "course_name": ".............",
                            "decision tree pred class": .............,
                            "decision tree pred prob": .............,
                            "id": ".............",
                            "linear regression pred": .............,
                            "risk factor": ".............",
                            "student_data_id": "............."
                        }
                    ],
                    "student_id": "........",
                    "student_username": "......"
                }
    """
    current_user = get_jwt_identity()
    if not Admin.query.get(current_user):
        return jsonify({"message": "Unauthorized access"}), 403

    student = User.query.get(id)
    if not student:
        return jsonify({"message": "Student not found"}), 404

    # Base query
    query = Student_data.query.filter_by(student_id=id)
    
    # If course_name is provided, filter by it
    if course_name:
        query = query.filter_by(course_name=course_name)
    
    student_data_entries = query.all()
    
    if not student_data_entries:
        return jsonify({"message": "No student data found"}), 404
    
    all_predictions = []
    
    for student_data in student_data_entries:
        predicted_scores = Predicted_score.query.filter_by(student_data_id=student_data.id).all()
        
        for score in predicted_scores:
            prediction_dict = score.to_dict()
            prediction_dict['course_name'] = student_data.course_name
            all_predictions.append(prediction_dict)
    
    return jsonify({
        "student_id": id,
        "student_username": student.username,
        "predictions": all_predictions
    }), 200
    
    
# get all prediction
@admin_bp.route('/api/admin/students/predictions', methods=['GET'])
@jwt_required()
def get_all_prediction():
    current_user = get_jwt_identity()
    if not Admin.query.get(current_user):
        return jsonify({"message": "Unauthorized access"}), 403
    
    # Query to join User, Student_data, and Predicted_score tables
    results = db.session.query(User, Student_data, Predicted_score)\
        .join(Student_data, User.id == Student_data.student_id)\
        .join(Predicted_score, Student_data.id == Predicted_score.student_data_id)\
        .all()

    # Process the results
    predictions = {}
    for user, student_data, predicted_score in results:
        full_name = f"{user.first_name} {user.last_name}"
        username = user.username
        
        if username not in predictions:
            predictions[username] = {
                "student_name": full_name,
                "actual_grades": {},
                "predicted_grades": {}
            }
        
        course_name = student_data.course_name
        
        # Add actual grade
        predictions[username]["actual_grades"][course_name] = student_data.actual_grade
        predictions[username]["actual_grades"]["cgpa"] = student_data.cgpa
        
        # Add predicted grade
        if course_name not in predictions[username]["predicted_grades"]:
            predictions[username]["predicted_grades"][course_name] = []
        
        predictions[username]["predicted_grades"][course_name].append({
            "predicted_grade": predicted_score.predicted_grade,
            "linear_regression_pred": predicted_score.linear_regression_pred,
            "risk_factor": predicted_score.risk_factor
        })

    return jsonify(predictions), 200

@admin_bp.route('/api/admin/courses-and-students', methods=['GET'])
@jwt_required()
def get_courses_and_student_count():
    """
    Admin route to get all unique courses and total student count

    Returns:
        JSON: {
            "courses": [
                "course1",
                "course2",
                ...
            ],
            "total_students": 100
        }
    """
    try:
        current_user = get_jwt_identity()
        admin = Admin.query.get(current_user)
        
        if not admin:
            return jsonify({"message": "Unauthorized access"}), 403

        # Get unique courses
        courses = db.session.query(Student_data.course_name).distinct().all()
        course_list = [course[0] for course in courses]

        # Get total number of students
        total_students = db.session.query(func.count(User.id)).scalar()

        return jsonify({
            "courses": course_list,
            "total_students": total_students
        }), 200
        

    except Exception as e:
        # Log the error (you may want to use a proper logging system)
        print(f"An error occurred: {str(e)}")
        
        # Return a 500 error with the error message
        return jsonify({
            "message": "An internal server error occurred",
            "error": str(e)
        }), 500


@admin_bp.route('/api/admin/course-data/<string:course_name>', methods=['GET'])
@jwt_required()
def get_course_data(course_name):
    """
    Admin route to get all student data and predictions for a specific course

    Args:
        course_name (str): The name of the course

    Returns:
        JSON: {
            "course_name": "course_name",
            "students": [
                {
                    "student_id": "...",
                    "username": "...",
                    "student_data": {
                        "age": ...,
                        "grade_level": "...",
                        "actual_grade": "...",
                        ...
                    },
                    "predicted_data": {
                        "predicted_grade": "...",
                        "linear_regression_pred": ...,
                        "risk_factor": "...",
                        ...
                    }
                },
                ...
            ]
        }
    """
    try:
        current_user = get_jwt_identity()
        admin = Admin.query.get(current_user)

        if not admin:
            return jsonify({"message": "Unauthorized access"}), 403

        # Query to join User, Student_data, and Predicted_score tables
        results = db.session.query(User, Student_data, Predicted_score)\
            .join(Student_data, User.id == Student_data.student_id)\
            .join(Predicted_score, Student_data.id == Predicted_score.student_data_id)\
            .filter(Student_data.course_name == course_name)\
            .all()

        if not results:
            return jsonify({"message": f"No data found for course: {course_name}"}), 404

        students_data = []
        for user, student_data, predicted_score in results:
            student_info = {
                "student_id": user.id,
                "username": user.username,
                "student_data": student_data.to_dict(),
                "predicted_data": predicted_score.to_dict()
            }
            students_data.append(student_info)

        return jsonify({
            "course_name": course_name,
            "students": students_data
        }), 200

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return jsonify({
            "message": "An internal server error occurred",
            "error": str(e)
        }), 500

