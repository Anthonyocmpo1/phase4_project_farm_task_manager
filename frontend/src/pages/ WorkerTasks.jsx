import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
// import { useFarmContext } from "../context/FarmContext";

const WorkerTask = () => {
  const { apiRequest } = useFarmContext();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", deadline: "", farm_id: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await apiRequest("/worker_tasks/my_tasks", "GET");
      setTasks(response.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      await apiRequest("/worker_tasks/add_task", "POST", newTask);
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await apiRequest(`/worker_tasks/delete_task/${taskId}`, "DELETE");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateTask = async (taskId, status) => {
    try {
      await apiRequest(`/worker_tasks/update_task_progress/${taskId}`, "PUT", { status });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <h2>My Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => handleUpdateTask(task.id, "in progress")}>In Progress</button>
            <button onClick={() => handleUpdateTask(task.id, "completed")}>Completed</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Add Task</h3>
      <input type="text" placeholder="Title" onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
      <input type="text" placeholder="Description" onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
      <input type="date" onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })} />
      <input type="text" placeholder="Farm ID" onChange={(e) => setNewTask({ ...newTask, farm_id: e.target.value })} />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default WorkerTask;
