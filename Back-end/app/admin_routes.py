from flask import Blueprint, request, jsonify
from .model import Admin, User, Student_data
from .extensions import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.exceptions import UnsupportedMediaType
import uuid

admin_bp = Blueprint('admin_bp', __name__)

# Admin Registration
@admin_bp.route('/api/admin/register', methods=['POST'])
def admin_register():
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
            password=generate_password_hash(data['password'])
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
    data = request.get_json()
    admin = Admin.query.filter_by(email=data['email']).first()

    if admin and check_password_hash(admin.password, data['password']):
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
    current_user = get_jwt_identity()
    if not Admin.query.get(current_user):
        return jsonify({"message": "Unauthorized access"}), 403

    students = User.query.all()
    return jsonify([{"id": s.id, "username": s.username, "email": s.email} for s in students]), 200

# Get Student by ID (Admin only)
@admin_bp.route('/api/admin/student/<string:id>', methods=['GET'])
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