from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from werkzeug.security import check_password_hash, generate_password_hash

# Custom metadata
metadata = MetaData()

# Initialize SQLAlchemy with custom metadata
db = SQLAlchemy(metadata=metadata)

# Association Table for Many-to-Many Relationship (User <-> Task)
user_task = db.Table('worker_task',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),  # Fix: 'users' instead of 'user'
    db.Column('task_id', db.Integer, db.ForeignKey('task.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'users'  # Ensure this is 'users', not 'user' as used before
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(512), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship with Task: Many-to-many
    tasks = db.relationship('Task', secondary=user_task, back_populates='workers')

    def __repr__(self):
        return f"<User {self.username}>"

    def check_password(self, password):
        """Utility method to check if the password is valid."""
        return check_password_hash(self.password_hash, password)

    @classmethod
    def create(cls, username, email, password, role="worker"):
        """Class method to create a new user."""
        hashed_password = generate_password_hash(password)
        new_user = cls(username=username, email=email, password_hash=hashed_password, role=role)
        db.session.add(new_user)
        db.session.commit()
        return new_user


class Farm(db.Model):
    __tablename__ = 'farm'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    size = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(255), nullable=False)

    tasks = db.relationship('Task', backref='farm', lazy=True)

    def __repr__(self):
        return f"<Farm {self.name}>"


class Task(db.Model):
    __tablename__ = 'task'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    deadline = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50), nullable=False, default="not started")
    farm_id = db.Column(db.Integer, db.ForeignKey('farm.id'), nullable=False)

    workers = db.relationship('User', secondary=user_task, back_populates='tasks')

    def __repr__(self):
        return f"<Task {self.title}>"

    @staticmethod
    def from_dict(data):
        deadline_str = data.get('deadline')
        if deadline_str:
            try:
                deadline = datetime.strptime(deadline_str, "%Y-%m-%d %H:%M:%S")
            except ValueError:
                raise ValueError(f"Invalid date format: {deadline_str}")
        else:
            deadline = None
        return Task(
            title=data["title"],
            description=data.get("description"),
            deadline=deadline,
            farm_id=data["farm_id"]
        )


class TokenBlocklist(db.Model):
    __tablename__ = 'token_blocklist'
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), unique=True, nullable=False)

    def __repr__(self):
        return f"<TokenBlocklist {self.jti}>"


class Worker(User):
    __tablename__ = 'worker'
    
    # Inherit from User, so foreign key points to the parent model
    id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    # Define polymorphic identity to differentiate between User and Worker
    __mapper_args__ = {
        'polymorphic_identity': 'worker',
        'polymorphic_on': id  # Ensure inheritance is properly managed
    }

    # Tasks assigned to worker (many-to-many with Task)
    tasks_assigned = db.relationship('Task', secondary=user_task, back_populates='workers')

    def __repr__(self):
        return f"<Worker {self.username}>"
