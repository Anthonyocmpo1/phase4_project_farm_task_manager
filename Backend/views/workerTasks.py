from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Task, User
from datetime import datetime

worker_tasks_bp = Blueprint("worker_tasks_bp", __name__)

# View all tasks assigned to the current worker
@worker_tasks_bp.route("/my_tasks", methods=["GET"])
@jwt_required()
def my_tasks():
    # Get the current worker's ID from JWT
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    # Ensure the user is a worker
    if user.role != "worker":
        return jsonify({"error": "Permission denied, worker access required"}), 403

    # Get all tasks assigned to this worker
    tasks = user.tasks  # Many-to-many relationship with Task

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


# Add a new task (Only workers can add tasks for themselves)
@worker_tasks_bp.route("/add_task", methods=["POST"])
@jwt_required()
def add_task():
    # Get the current worker's ID from JWT
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    # Ensure the user is a worker
    if user.role != "worker":
        return jsonify({"error": "Permission denied, worker access required"}), 403

    data = request.get_json()

    # Ensure all required fields are provided
    if not data.get("title") or not data.get("description") or not data.get("deadline") or not data.get("farm_id"):
        return jsonify({"error": "Missing required fields (title, description, deadline, farm_id)"}), 400

    # Parse the deadline string to a datetime object
    try:
        # Convert the deadline string to a datetime object (YYYY-MM-DD format)
        deadline = datetime.strptime(data["deadline"], "%Y-%m-%d")
    except ValueError:
        return jsonify({"error": "Invalid date format, please use 'YYYY-MM-DD'"}), 400

    # Create the new task and assign it to the worker
    new_task = Task(
        title=data["title"],
        description=data["description"],
        deadline=deadline,  # Use the datetime object
        status="pending",  # Default status for new tasks
        farm_id=data["farm_id"]
    )
    db.session.add(new_task)
    db.session.commit()

    # Assign the task to the worker
    new_task.workers.append(user)
    db.session.commit()

    return jsonify({"message": f"Task '{new_task.title}' added successfully"}), 201


# Delete a task (Only workers can delete tasks they are assigned to)
@worker_tasks_bp.route("/delete_task/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
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

    # Delete the task
    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": f"Task '{task.title}' deleted successfully"}), 200


# Update task progress (e.g., mark as in progress or completed)
@worker_tasks_bp.route("/update_task_progress/<int:task_id>", methods=["PUT"])
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


# View details of a specific task assigned to the worker
@worker_tasks_bp.route("/task_detail/<int:task_id>", methods=["GET"])
@jwt_required()
def task_detail(task_id):
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

    task_detail = {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "deadline": task.deadline,
        "status": task.status,
        "farm_id": task.farm_id
    }

    return jsonify({"task": task_detail}), 200
