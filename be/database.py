from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Model Course (môn học)
class Course(db.Model):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(20), unique=True, nullable=False)  # VD: CS101
    name = db.Column(db.String(200), nullable=False)  # Tên môn
    credits = db.Column(db.Integer, nullable=False)  # Số tín chỉ

    def to_dict(self):
        return {
            "id": self.id,
            "code": self.code,
            "name": self.name,
            "credits": self.credits,
        }

# Model Class (lớp học cụ thể cho 1 môn)
class CourseClass(db.Model):
    __tablename__ = "classes"

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)  # User role = tutor
    semester = db.Column(db.String(20), nullable=False)  # VD: "2025-2026-1"
    room = db.Column(db.String(50))
    schedule = db.Column(db.String(200))  # VD: "Thứ 2,4 (07:00-09:00)"
    max_students = db.Column(db.Integer)
    created_at = db.Column(db.String(50), nullable=False)  # lưu string datetime ISO

    # Quan hệ 
    course = db.relationship("Course", backref="classes", lazy=True)
    teacher = db.relationship("User", backref="teaching_classes", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "course_id": self.course_id,
            "course_code": self.course.code if self.course else None,
            "course_name": self.course.name if self.course else None,
            "teacher_id": self.teacher_id,
            "teacher_name": self.teacher.fullname if self.teacher else None,
            "semester": self.semester,
            "room": self.room,
            "schedule": self.schedule,
            "max_students": self.max_students,
            "created_at": self.created_at,
        }

# Model Registration (sinh viên đăng ký lớp)
class Registration(db.Model):
    __tablename__ = "registrations"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey("classes.id"), nullable=False)
    registered_at = db.Column(db.String(50), nullable=False)  # lưu datetime string

    # 1 sinh viên không được đăng ký 1 lớp 2 lần
    __table_args__ = (
        db.UniqueConstraint("student_id", "class_id", name="uq_student_class"),
    )

    student = db.relationship("User", backref="registrations", lazy=True)
    course_class = db.relationship("CourseClass", backref="registrations", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "student_id": self.student_id,
            "student_name": self.student.fullname if self.student else None,
            "class_id": self.class_id,
            "course_code": self.course_class.course.code if self.course_class and self.course_class.course else None,
            "course_name": self.course_class.course.name if self.course_class and self.course_class.course else None,
            "semester": self.course_class.semester if self.course_class else None,
            "registered_at": self.registered_at,
        }
