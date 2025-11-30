from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
# Đã khôi phục import bảo mật và datetime
#from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta, datetime
from functools import wraps
import os
from sqlalchemy.sql import func
from flask_cors import CORS # Thêm CORS cho frontend

# Tương thích với database.py của bạn
from database import Course, CourseClass, Registration, db as database_db_instance

#Khởi tạo app
app = Flask(__name__)
# Thêm CORS để cho phép frontend truy cập. 
# Đặt supports_credentials=True để cho phép gửi cookie session.
CORS(app, supports_credentials=True, origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5000"]) 

#secret key cho session
app.config["SECRET_KEY"] = "os.urandom(24)"
#Cau hinh database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///auth.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
#Thoi gian session ton tai
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=10)

# Cấu hình Session Cookie (QUAN TRỌNG CHO MÔI TRƯỜNG DEV)
app.config["SESSION_COOKIE_SAMESITE"] = "Lax" # Giúp session hoạt động trên localhost
app.config["SESSION_COOKIE_SECURE"] = False # Đặt False vì đang dùng HTTP (localhost)

# Khởi tạo db cho app
db = database_db_instance 
db.init_app(app) 

#Model User
class User(db.Model):
  __tablename__ = "user"  
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(100), unique=True, nullable=False)
  password = db.Column(db.String(100), nullable=False)
  fullname = db.Column(db.String(100), nullable=False)
  role = db.Column(db.String(20), nullable=False) 
  
  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "fullname": self.fullname,
      "role": self.role,
    }

def role_required(*roles):
  def decorator(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
      if "user_id" not in session:
        return jsonify({"message": "Chưa đăng nhập"}), 401
      
      # FIX: Thay thế Query.get() bằng db.session.get()
      user = db.session.get(User, session["user_id"]) 
      
      if not user or user.role not in roles:
        return jsonify({"message": "Không có quyền truy cập"}), 403
      return f(*args, **kwargs)
    return decorated_function
  return decorator

# --- API XÁC THỰC ---

#API dang ky sinh vien
@app.route("/api/register/student", methods=["POST"])
def register_student():
  data = request.get_json()
  username = data.get("username")
  password = data.get("password")
  fullname = data.get("fullname")
  
  if not username or not password or not fullname:
    return jsonify({"message": "Vui lòng điền đầy đủ thông tin"}), 400
  if User.query.filter_by(username=username).first():
    return jsonify({"message": "Tên đăng nhập đã tồn tại"}), 400
  
  # FIX: Sử dụng generate_password_hash
  hashed_password = password
  new_user = User(username=username, password=hashed_password, fullname=fullname, role="student")
  db.session.add(new_user)
  db.session.commit()
  return jsonify({"message": "Đăng ký sinh viên thành công"}), 201

#dang ky tutor
@app.route("/api/register/tutor", methods=["POST"])
def register_tutor():
  data = request.get_json()
  username = data.get("username")
  password = data.get("password")
  fullname = data.get("fullname")
  
  if not username or not password or not fullname:
    return jsonify({"message": "Vui lòng điền đầy đủ thông tin"}), 400
  if User.query.filter_by(username=username).first():
    return jsonify({"message": "Tên đăng nhập đã tồn tại"}), 400
  
  # Sử dụng generate_password_hash
  hashed_password = password
  new_user = User(username=username, password=hashed_password, fullname=fullname, role="tutor")
  db.session.add(new_user)
  db.session.commit()
  return jsonify({"message": "Đăng ký tutor thành công"}), 201

#API dang nhap
@app.route("/api/login", methods=["POST"])
def login():
  data = request.get_json()
  username = data.get("username")
  password = data.get("password")
  
  if not username or not password:
    return jsonify({"message": "Vui lòng điền đầy đủ thông tin"}), 400
  
  user = User.query.filter_by(username=username).first()
  
  # FIX: Sử dụng check_password_hash
  if not user or not (user.password == password):
    return jsonify({"message": "Tên đăng nhập hoặc mật khẩu không đúng"}), 401
  
  session.permanent = True
  session["user_id"] = user.id
  return jsonify({
    "message": "Đăng nhập thành công",
    "user": user.to_dict()
    }), 200
  
#API dang xuat
@app.route("/api/logout", methods=["POST"])
def logout():
  session.pop("user_id", None)
  return jsonify({"message": "Đăng xuất thành công"}), 200

@app.route("/api/me", methods=["GET"])
def get_current_user():
  if "user_id" not in session:
    return jsonify({"message": "Chưa đăng nhập"}), 401
  
  # FIX: Thay thế Query.get() bằng db.session.get()
  user = db.session.get(User, session["user_id"]) 
  
  if not user:
    return jsonify({"message": "Người dùng không tồn tại"}), 404
  return jsonify({"user": user.to_dict()}), 200

# --- API LẤY DỮ LIỆU ---

@app.route("/courses", methods=["GET"])
@role_required("student")
def get_available_classes():
    # 1. Đếm số lượng sinh viên đã đăng ký cho mỗi lớp
    registration_counts = db.session.query(
        Registration.class_id,
        func.count(Registration.student_id).label('enrolled')
    ).group_by(Registration.class_id).all()

    counts_map = {class_id: enrolled for class_id, enrolled in registration_counts}
    
    # 2. Lấy tất cả các lớp học với thông tin liên quan
    classes = CourseClass.query.all()
    result = []
    
    for cls in classes:
        enrolled = counts_map.get(cls.id, 0)
        max_students = cls.max_students or float('inf') 

        course_data = cls.course.to_dict() if cls.course else {}
        
        class_dict = {
            "id": str(cls.id),
            "code": course_data.get("code"),
            "name": course_data.get("name"),
            "credits": course_data.get("credits"),
            "instructor": cls.teacher.fullname if cls.teacher else None,
            "schedule": cls.schedule,
            "room": cls.room,
            "capacity": cls.max_students,
            "enrolled": enrolled,
            "status": "full" if enrolled >= max_students else "available",
            "semester": cls.semester,
            "department": "Công nghệ thông tin" if cls.course.code.startswith('IT') else ("Toán học" if cls.course.code.startswith('MI') else "Khác"),
            "description": f"Mô tả cho môn {course_data.get('name') or 'này'}.",
        }
        result.append(class_dict)

    return jsonify(result), 200

@app.route("/registered", methods=["GET"])
@role_required("student")
def get_registered_classes():
    student_id = session["user_id"]
    
    registrations = Registration.query.filter_by(student_id=student_id).all()
    
    registered_classes = []
    
    for reg in registrations:
        cls = reg.course_class
        if cls:
             # Lấy số lượng đã đăng ký cho lớp này
            enrolled = Registration.query.filter_by(class_id=cls.id).count()
            course_data = cls.course.to_dict() if cls.course else {}

            class_dict = {
                "id": str(cls.id),
                "code": course_data.get("code"),
                "name": course_data.get("name"),
                "credits": course_data.get("credits"),
                "instructor": cls.teacher.fullname if cls.teacher else None,
                "schedule": cls.schedule,
                "room": cls.room,
                "capacity": cls.max_students,
                "enrolled": enrolled,
                "status": "available", 
                "semester": cls.semester,
                "department": "Công nghệ thông tin" if cls.course.code.startswith('IT') else ("Toán học" if cls.course.code.startswith('MI') else "Khác"),
                "description": f"Mô tả cho môn {course_data.get('name') or 'này'}.",
            }
            registered_classes.append(class_dict)
            
    return jsonify(registered_classes), 200

# --- API ĐĂNG KÝ/HỦY ĐĂNG KÝ ---

@app.route("/api/register_class", methods=["POST"])
@role_required("student")
def register_class():
    student_id = session["user_id"] # Lấy từ session
    data = request.json
    class_id = data.get("class_id")

    if not class_id:
        return jsonify({"error": "class_id là bắt buộc"}), 400

    # FIX: Thay thế Query.get() bằng db.session.get()
    course_class = db.session.get(CourseClass, class_id)
    if not course_class:
        return jsonify({"error": "Không tìm thấy lớp học"}), 404

    existed = Registration.query.filter_by(
        student_id=student_id, class_id=class_id
    ).first()
    if existed:
        return jsonify({"error": "Bạn đã đăng ký lớp này rồi!"}), 409

    if course_class.max_students:
        count_registered = Registration.query.filter_by(
            class_id=class_id
        ).count()
        if count_registered >= course_class.max_students:
            return jsonify({"error": "Lớp đã đủ số lượng sinh viên"}), 400

    new_reg = Registration(
        student_id=student_id, # Dùng ID từ session
        class_id=class_id,
        registered_at=datetime.utcnow().isoformat()
    )
    db.session.add(new_reg)
    db.session.commit()

    return jsonify({
        "message": "Đăng ký thành công!",
        "registration": new_reg.to_dict()
    }), 201

@app.route("/api/unregister_class", methods=["POST"])
@role_required("student")
def unregister_class():
    student_id = session["user_id"]
    data = request.json
    class_id = data.get("class_id")
    
    if not class_id:
        return jsonify({"error": "class_id là bắt buộc"}), 400
        
    registration = Registration.query.filter_by(
        student_id=student_id,
        class_id=class_id
    ).first()
    
    if not registration:
        return jsonify({"error": "Bạn chưa đăng ký lớp này!"}), 404
        
    db.session.delete(registration)
    db.session.commit()
    
    return jsonify({"message": "Hủy đăng ký thành công"}), 200

def create_sample_data():
    if not db.session.query(User).first():
        print("--- Đang tạo dữ liệu mẫu ---")
        # Users
        teacher = User(id=1, username='tutor101', password='123', fullname='PGS.TS. Nguyễn Văn A', role='tutor')
        student = User(id=2, username='student101', password='123', fullname='Trần Văn B', role='student')
        db.session.add_all([teacher, student])
        db.session.commit()
        
        # Courses
        c1 = Course(id=1, code="IT4080", name="Trí tuệ nhân tạo", credits=3)
        c2 = Course(id=2, code="IT4100", name="Học sâu và ứng dụng", credits=4)
        c3 = Course(id=3, code="MI1010", name="Giải tích 1", credits=4)
        c4 = Course(id=4, code="IT4110", name="An toàn thông tin", credits=3)
        db.session.add_all([c1, c2, c3, c4])
        db.session.commit()
        
        # Classes
        current_time = datetime.utcnow().isoformat()
        cls1 = CourseClass(id=1, course_id=c1.id, teacher_id=teacher.id, semester="HK1 2024-2025", room="D3-201", schedule="Thứ 2, 9:00 - 11:00", max_students=60, created_at=current_time) # available
        cls2 = CourseClass(id=2, course_id=c2.id, teacher_id=teacher.id, semester="HK1 2024-2025", room="D3-105", schedule="Thứ 4, 15:00 - 17:00", max_students=1, created_at=current_time) # full after one reg
        cls3 = CourseClass(id=3, course_id=c3.id, teacher_id=teacher.id, semester="HK1 2024-2025", room="C1-105", schedule="Thứ 3, 13:00 - 15:00", max_students=80, created_at=current_time) # registered
        cls4 = CourseClass(id=4, course_id=c4.id, teacher_id=teacher.id, semester="HK1 2024-2025", room="D9-301", schedule="Thứ 5, 9:00 - 11:00", max_students=50, created_at=current_time) # available
        db.session.add_all([cls1, cls2, cls3, cls4])
        db.session.commit()
        
        # Registrations (Đăng ký mẫu cho student 101 - user ID 2)
        reg1 = Registration(student_id=student.id, class_id=cls2.id, registered_at=current_time) 
        reg2 = Registration(student_id=student.id, class_id=cls3.id, registered_at=current_time) 
        db.session.add_all([reg1, reg2])
        db.session.commit()
        
        print("Đã tạo dữ liệu mẫu: 1 Teacher, 1 Student (student101/123), 4 Classes, 2 Registrations.")
    else:
        print("Dữ liệu mẫu đã tồn tại.")

if __name__ == "__main__":
  with app.app_context():
    # Khởi tạo các bảng 
    db.create_all() 
    
    # Tạo dữ liệu mẫu
    create_sample_data()
    
    print("Database đã được tạo/cập nhật")
  
  app.run(debug=True)