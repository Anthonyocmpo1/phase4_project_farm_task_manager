from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from models import db, Task, User, Farm

task_bp = Blueprint("task_bp", __name__)  # Define Blueprint

# Create a new task
@task_bp.route("/add_task", methods=["POST"])
@jwt_required()
def add_task():
    try:
        data = request.get_json()
        if not data or not data.get("title") or not data.get("farm_id"):
            return jsonify({"error": "Missing required fields (title, farm_id)"}), 400

        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user or user.role != "manager":
            return jsonify({"error": "Permission denied, manager access required"}), 403

        farm = Farm.query.get(data["farm_id"])
        if not farm:
            return jsonify({"error": "Farm not found"}), 404

        deadline = None
        if data.get("deadline"):
            try:
                deadline = datetime.strptime(data["deadline"], "%Y-%m-%d").date()
            except ValueError:
                return jsonify({"error": "Invalid date format, expected YYYY-MM-DD"}), 400

        new_task = Task(
            title=data["title"],
            description=data.get("description"),
            deadline=deadline,
            farm_id=data["farm_id"]
        )
        db.session.add(new_task)
        db.session.commit()

        return jsonify({"message": "Task created successfully", "task_id": new_task.id}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# View all tasks
@task_bp.route("/tasks", methods=["GET"])
@jwt_required()
def get_tasks():
    tasks = Task.query.all()
    tasks_list = [
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "deadline": task.deadline.isoformat() if task.deadline else None,
            "status": task.status,
            "farm_id": task.farm_id
        }
        for task in tasks
    ]
    return jsonify({"tasks": tasks_list}), 200


# Update task details
@task_bp.route("/update_task/<int:task_id>", methods=["PUT"])
@jwt_required()
def update_task(task_id):
    data = request.get_json()
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user or user.role != "manager":
        return jsonify({"error": "Permission denied, manager access required"}), 403

    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    task.title = data.get("title", task.title)
    task.description = data.get("description", task.description)
    
    if data.get("deadline"):
        try:
            task.deadline = datetime.strptime(data["deadline"], "%Y-%m-%d").date()
        except ValueError:
            return jsonify({"error": "Invalid deadline format. Expected YYYY-MM-DD"}), 400
    
    task.status = data.get("status", task.status)
    db.session.commit()

    return jsonify({"message": "Task updated successfully"}), 200


# Assign workers to a task
@task_bp.route("/assign_workers/<int:task_id>", methods=["PUT"])
@jwt_required()
def assign_workers(task_id):
    data = request.get_json()
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user or user.role != "manager":
        return jsonify({"error": "Permission denied, manager access required"}), 403

    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    worker_ids = data.get("worker_ids", [])
    workers = User.query.filter(User.id.in_(worker_ids), User.role == "worker").all()

    if not workers:
        return jsonify({"error": "No valid workers found"}), 400

    task.workers.extend(workers)  # Ensure relationship is properly handled
    db.session.commit()

    return jsonify({"message": "Workers assigned to task successfully"}), 200


# Delete a task
@task_bp.route("/delete_task/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user or user.role != "manager":
        return jsonify({"error": "Permission denied, manager access required"}), 403

    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted successfully"}), 200
