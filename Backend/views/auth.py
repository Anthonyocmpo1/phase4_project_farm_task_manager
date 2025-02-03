from flask import Blueprint, jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User
from datetime import timedelta
from flask_mail import Message
from app import mail

# Create the Blueprint for authentication
auth_bp = Blueprint('auth', __name__)

# Register route
@auth_bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()

    # Validate data
    if not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing required fields: username, email, or password"}), 400

    # Additional validation for email format
    if '@' not in data['email']:
        return jsonify({"error": "Invalid email format"}), 400
    
    # Validate role (must be either 'worker' or 'manager')
    role = data.get('role', 'worker')  # Default to 'worker' if no role is provided
    if role not in ['worker', 'manager']:
        return jsonify({"error": "Invalid role. Must be 'worker' or 'manager'"}), 400

    # Check if user already exists
    if User.query.filter_by(username=data['username']).first() or User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Username or email already exists"}), 400

    # Create new user
    hashed_password = generate_password_hash(data['password'])
    new_user = User(username=data['username'], email=data['email'], password_hash=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()

    # Send registration email
    send_welcome_email(new_user.email)

    return jsonify({"message": "User created successfully!"}), 201

# Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Check if email exists
    user = User.query.filter_by(email=data["email"]).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Check password
    if not check_password_hash(user.password_hash, data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    # Create JWT token
    access_token = create_access_token(identity=user.id, fresh=True, expires_delta=timedelta(hours=1))

    # Send login notification email
    send_login_email(user.email)

    return jsonify({
        "access_token": access_token,
        "message": "You have successfully logged in. A notification email has been sent."
    }), 200


# Function to send a welcome email upon registration
def send_welcome_email(user_email):
    msg = Message("Welcome to Our Service", recipients=[user_email])
    msg.body = "Thank you for registering! We're happy to have you on board."
    try:
        mail.send(msg)
    except Exception as e:
        print(f"Error sending email: {e}")


# Function to send a login notification email
def send_login_email(user_email):
    msg = Message("Login Notification", recipients=[user_email])
    msg.body = "You have successfully logged in to your account."
    try:
        mail.send(msg)
    except Exception as e:
        print(f"Error sending email: {e}")

