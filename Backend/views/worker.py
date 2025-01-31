from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Task, User

worker_bp = Blueprint("worker_bp", __name__)

# View all tasks assigned to the worker
@worker_bp.route("/my_tasks", methods=["GET"])
@jwt_required()
def my_tasks():
    # Get the current worker's ID from JWT
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    # Ensure the user is a worker
    if user.role != "worker":
        return jsonify({"error": "Permission denied, worker access required"}), 403

    # Get all tasks assigned to this worker
    tasks = user.tasks  # Assuming a relationship between User and Task (many-to-many)

    tasks_list = [
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "deadline": task.deadline,
            "status": task.status,
            "farm_id": task.farm_id
        }
        for task in tasks
    ]

    return jsonify({"tasks": tasks_list}), 200


# Update task progress (e.g., mark as in progress or completed)
@worker_bp.route("/update_task_progress/<int:task_id>", methods=["PUT"])
@jwt_required()
def update_task_progress(task_id):
    data = request.get_json()

    # Get the current worker's ID from JWT
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    # Ensure the user is a worker
    if user.role != "worker":
        return jsonify({"error": "Permission denied, worker access required"}), 403

    # Find the task by ID
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    # Ensure the task is assigned to the worker
    if user not in task.workers:
        return jsonify({"error": "This task is not assigned to you"}), 400

    # Validate the progress update (status can be 'in progress' or 'completed')
    new_status = data.get("status")
    if new_status not in ["in progress", "completed"]:
        return jsonify({"error": "Invalid status, must be 'in progress' or 'completed'"}), 400

    # Update the task's status
    task.status = new_status
    db.session.commit()

    return jsonify({"message": f"Task status updated to {new_status}"}), 200
