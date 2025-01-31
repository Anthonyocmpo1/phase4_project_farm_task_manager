from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Farm, User, Task

farm_bp = Blueprint("farm_bp", __name__)

# Add a new farm
@farm_bp.route("/add_farm", methods=["POST"])
@jwt_required()
def add_farm():
    data = request.get_json()

    # Ensure all required fields are provided
    if not data.get("name") or not data.get("size") or not data.get("location"):
        return jsonify({"error": "Missing required fields (name, size, location)"}), 400

    # Get the current user (only managers can add farms)
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    # Ensure the user is a manager
    if user.role != "manager":
        return jsonify({"error": "Permission denied, manager access required"}), 403

    # Create new farm and save to the database
    new_farm = Farm(
        name=data["name"],
        size=data["size"],
        location=data["location"]
    )
    db.session.add(new_farm)
    db.session.commit()

    return jsonify({"message": "Farm added successfully"}), 201


# View all farms
@farm_bp.route("/farms", methods=["GET"])
@jwt_required()
def get_farms():
    farms = Farm.query.all()
    farms_list = [{"id": farm.id, "name": farm.name, "size": farm.size, "location": farm.location} for farm in farms]

    return jsonify({"farms": farms_list}), 200


# Update an existing farm
@farm_bp.route("/update_farm/<int:farm_id>", methods=["PUT"])
@jwt_required()
def update_farm(farm_id):
    data = request.get_json()

    # Ensure required fields are provided
    if not data.get("name") and not data.get("size") and not data.get("location"):
        return jsonify({"error": "No update data provided"}), 400

    # Get the current user (only managers can update farms)
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    # Ensure the user is a manager
    if user.role != "manager":
        return jsonify({"error": "Permission denied, manager access required"}), 403

    # Find the farm by ID
    farm = Farm.query.get(farm_id)
    if not farm:
        return jsonify({"error": "Farm not found"}), 404

    # Update farm fields with provided data
    if data.get("name"):
        farm.name = data["name"]
    if data.get("size"):
        farm.size = data["size"]
    if data.get("location"):
        farm.location = data["location"]

    db.session.commit()

    return jsonify({"message": "Farm updated successfully"}), 200


# Delete (remove) a farm (only if no tasks are associated with it)
@farm_bp.route("/delete_farm/<int:farm_id>", methods=["DELETE"])
@jwt_required()
def delete_farm(farm_id):
    # Get the current user (only managers can delete farms)
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    # Ensure the user is a manager
    if user.role != "manager":
        return jsonify({"error": "Permission denied, manager access required"}), 403

    # Find the farm by ID
    farm = Farm.query.get(farm_id)
    if not farm:
        return jsonify({"error": "Farm not found"}), 404

    # Check if there are any tasks associated with this farm
    tasks = Task.query.filter_by(farm_id=farm_id).all()
    if tasks:
        return jsonify({"error": "Cannot delete farm, tasks are still associated with it"}), 400

    # Delete the farm if no tasks are associated
    db.session.delete(farm)
    db.session.commit()

    return jsonify({"message": "Farm deleted successfully"}), 200
