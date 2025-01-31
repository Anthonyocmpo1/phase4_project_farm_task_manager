from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_mail import Mail
from flask_cors import CORS
from models import db
from models import TokenBlocklist
# Initialize Flask app
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS)
CORS(app)

# Database and migration setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://farm_task_manger_db_user:gKdiTZtJmNsaaOIEvIsw0VMuQbcvSOIn@dpg-cue6dql2ng1s7383d69g-a.oregon-postgres.render.com/farm_task_manger_db'  # Replace with your actual database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # To disable SQLAlchemy event system, optional
migrate = Migrate(app, db)
db.init_app(app)

# Flask mail configuration
app.config["MAIL_SERVER"] = 'smtp.gmail.com'
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USE_SSL"] = False
app.config["MAIL_USERNAME"] = "anthony.mwaura@student.moringaschool.com"  # Replace with your email
app.config["MAIL_PASSWORD"] = "Ocmpo@12"  # Replace with your email password
app.config["MAIL_DEFAULT_SENDER"] = "mwauraa634@gmail.com"  # Replace with your sender email

mail = Mail(app)

# JWT configuration
app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"  # Replace with a strong secret key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = None
app.config["JWT_ALGORITHM"] = "HS256" 

# Initialize JWT manager
jwt = JWTManager(app)

# Import blueprints
from views.auth import auth_bp
from views.farm import farm_bp
from views.task import task_bp
from views.worker import worker_bp
from views.workerTasks import worker_tasks_bp

# Register blueprints with specific URL prefixes
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(farm_bp, url_prefix='/farm')
app.register_blueprint(task_bp, url_prefix='/task')
app.register_blueprint(worker_bp, url_prefix='/worker')
app.register_blueprint(worker_tasks_bp, url_prefix='/workerTasks')

# JWT Token Revocation Handler (Check if token is in the blocklist)
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
    print(f"Checking token: {jti}, Found: {token is not None}")
    return token is not None

# Default route for testing the server
@app.route("/")
def home():
    return "Welcome to the Farm Task Manager API!"

# Health check route
@app.route("/health")
def health():
    return jsonify({"status": "healthy", "message": "The server is running smoothly."}), 200

# Custom 404 error handler
@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"error": "Not Found", "message": "The requested URL was not found on the server."}), 404

# Running the app
if __name__ == "__main__":
    app.run(debug=True)
