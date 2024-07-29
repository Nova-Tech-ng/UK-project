from .extensions import db

class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=db.func.uuid_generate_v4())
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    created = db.Column(db.DateTime, server_default=db.func.now())
    
    def __repr__(self):
        return f'<User {self.username}>'

class Admin(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=db.func.uuid_generate_v4())
    admin_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    created = db.Column(db.DateTime, server_default=db.func.now())
    
    def __repr__(self):
        return f'<Admin {self.username}>'

class Student_data(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=db.func.uuid_generate_v4())
    age = db.Column(db.Integer, nullable=False)
    grade_level = db.Column(db.String(5), nullable=False)
    learning_style = db.Column(db.String(50), nullable=False)
    socio_economic_status = db.Column(db.String(50), nullable=False)
    past_grades = db.Column(db.String(50), nullable=False)
    standardized_test_scores = db.Column(db.String(50), nullable=False)
    prior_knowledge = db.Column(db.String(50), nullable=False)
    course_id = db.Column(db.Integer, nullable=False)
    course_name = db.Column(db.String(50), nullable=False)
    course_difficulty = db.Column(db.String(50), nullable=False)
    class_size = db.Column(db.Integer, nullable=False)
    teaching_style = db.Column(db.String(50), nullable=False)
    course_work_load = db.Column(db.String(50), nullable=False)
    attendance = db.Column(db.Integer, nullable=False)
    study_time = db.Column(db.Integer, nullable=False)
    time_of_year = db.Column(db.String(50), nullable=False)
    extra_curricular_activities = db.Column(db.String(50), nullable=False)
    health = db.Column(db.String(50), nullable=False)
    home_environment = db.Column(db.String(50), nullable=False)
    actual_grade = db.Column(db.String(50), nullable=False)
    cgpa = db.Column(db.Integer, nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Student_data {self.id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'age': self.age,
            'grade_level': self.grade_level,
            'learning_style': self.learning_style,
            'socio_economic_status': self.socio_economic_status,
            'past_grades': self.past_grades,
            'standardized_test_scores': self.standardized_test_scores,
            'prior_knowledge': self.prior_knowledge,
            'course_id': self.course_id,
            'course_name': self.course_name,
            'course_difficulty': self.course_difficulty,
            'class_size': self.class_size,
            'teaching_style': self.teaching_style,
            'course_work_load': self.course_work_load,
            'attendance': self.attendance,
            'study_time': self.study_time,
            'time_of_year': self.time_of_year,
            'extra_curricular_activities': self.extra_curricular_activities,
            'health': self.health,
            'home_environment': self.home_environment,
            'actual_grade': self.actual_grade,
            'cgpa': self.cgpa,
            'student_id': self.student_id
        }