from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta
from functools import wraps
import os

#Khoi tao app
app = Flask(__name__)
#secret key cho session
app.config["SECRET_KEY"] = "os.urandom(24)"
#Cau hinh database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///auth.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
#Thoi gian session ton tai
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=10)

db = SQLAlchemy(app)
#Model User
class User(db.Model):
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
      user = User.query.get(session["user_id"]) # lấy thông tin user từ database
      if not user or user.role not in roles:
        return jsonify({"message": "Không có quyền truy cập"}), 403
      return f(*args, **kwargs)
    return decorated_function
  return decorator

#API dang ky
@app.route("/api/register/student", methods=["POST"])

def register_student():
  data = request.get_json() #lay body json tu request
  username = data.get("username")
  password = data.get("password")
  fullname = data.get("fullname")
  
  if not username or not password or not fullname:
    return jsonify({"message": "Vui lòng điền đầy đủ thông tin"}), 400
  #kiem tra id da ton tai chua co thi bao loi
  if User.query.filter_by(username=username).first():
    return jsonify({"message": "Tên đăng nhập đã tồn tại"}), 400
  
  #hash password truoc khi luu vao db
  hashed_password = generate_password_hash(password)
  new_user = User(username=username, password=hashed_password, fullname=fullname, role="student")
  db.session.add(new_user)
  db.session.commit() #ghi xuong dong
  return jsonify({"message": "Đăng ký sinh viên thành công"}), 201

#dang ky tutor
@app.route("/api/register/tutor", methods=["POST"])

def register_tutor():
  data = request.get_json() #lay body json tu request
  username = data.get("username")
  password = data.get("password")
  fullname = data.get("fullname")
  
  if not username or not password or not fullname:
    return jsonify({"message": "Vui lòng điền đầy đủ thông tin"}), 400
  #kiem tra id da ton tai chua co thi bao loi
  if User.query.filter_by(username=username).first():
    return jsonify({"message": "Tên đăng nhập đã tồn tại"}), 400
  
  #hash password truoc khi luu vao db
  hashed_password = generate_password_hash(password)
  new_user = User(username=username, password=hashed_password, fullname=fullname, role="tutor")
  db.session.add(new_user)
  db.session.commit() #ghi xuong dong
  return jsonify({"message": "Đăng ký tutor thành công"}), 201

#API dang nhap
@app.route("/api/login", methods=["POST"])

def login():
  data = request.get_json()
  username = data.get("username")
  password = data.get("password")
  
  if not username or not password:
    return jsonify({"message": "Vui lòng điền đầy đủ thông tin"}), 400
  
  #tim user theo username
  user = User.query.filter_by(username=username).first()\
  
  #ko co user hoac password ko dung
  if not user or not check_password_hash(user.password, password):
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
  #xoa key user_id khoi session ko thi thoi
  session.pop("user_id", None)
  return jsonify({"message": "Đăng xuất thành công"}), 200

@app.route("/api/me", methods=["GET"])
def get_current_user():
  if "user_id" not in session:
    return jsonify({"message": "Chưa đăng nhập"}), 401
  user = User.query.get(session["user_id"])
  if not user:
    return jsonify({"message": "Người dùng không tồn tại"}), 404
  return jsonify({"user": user.to_dict()}), 200

if __name__ == "__main__":
  with app.app_context():
    db.create_all()  #tao cac bang trong db neu chua co
    print("Database đã được tạo")
  app.run(debug=True)