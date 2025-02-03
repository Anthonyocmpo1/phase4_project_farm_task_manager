import { useState, useContext } from "react";
import { FarmContext } from "../context/FarmContext"; // Ensure this import is correct

const WorkerTask = () => {
  const farmContext = useContext(FarmContext); // Using the correct hook
  const { tasks, message, addTask, deleteTask, updateTaskStatus, updateTask } = farmContext; // Accessing the context values

  const [newTask, setNewTask] = useState({ worker_name: "", worker_id: "", title: "", farm_name: "", deadline: "" });
  const [editingTaskId, setEditingTaskId] = useState(null); // Track which task is being edited

  const handleAddTask = async () => {
    if (!newTask.worker_name || !newTask.worker_id || !newTask.title || !newTask.farm_name || !newTask.deadline) {
      toast.dismiss();
      toast.error("Please fill in all fields.");
      return;
    }

    const addedTask = {
      id: tasks.length + 1,
      ...newTask,
      status: "Pending",
    };

    try {
      await addTask(addedTask);  // Assuming addTask is async
      setNewTask({ worker_name: "", worker_id: "", title: "", farm_name: "", deadline: "" });
    } catch (error) {
      toast.error("Error adding task");
    }
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    toast.success("Task deleted successfully!");
  };

  const handleUpdateTaskStatus = (taskId, status) => {
    updateTaskStatus(taskId, status);
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setNewTask({ ...taskToEdit });
    setEditingTaskId(taskId);
  };

  const handleSaveTask = () => {
    updateTask(editingTaskId, newTask);
    setEditingTaskId(null);
    setNewTask({ worker_name: "", worker_id: "", title: "", farm_name: "", deadline: "" });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">My Tasks</h2>
      {message && <p className="text-green-600 font-semibold">{message}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border-b py-4 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-purple-600">{task.title}</h3>
            <p className="text-gray-600">Worker: <span className="text-blue-500">{task.worker_name}</span> (ID: {task.worker_id})</p>
            <p className="text-gray-600">Farm: <span className="text-green-500">{task.farm_name}</span></p>
            <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
            <p className="text-sm text-gray-700">Status: {task.status}</p>
            <div className="mt-2 space-x-2">
              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                onClick={() => handleUpdateTaskStatus(task.id, "in progress")}
              >
                In Progress
              </button>
              <button
                className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg"
                onClick={() => handleUpdateTaskStatus(task.id, "completed")}
              >
                Completed
              </button>
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-700 text-white rounded-lg"
                onClick={() => handleEditTask(task.id)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-bold mt-6 text-purple-700">{editingTaskId ? "Update Task" : "Add Task"}</h3>
      <div className="space-y-2 bg-white p-4 rounded-lg shadow">
        <input
          className="w-full p-2 border rounded text-gray-700"
          type="text"
          placeholder="Worker Name"
          onChange={(e) => setNewTask({ ...newTask, worker_name: e.target.value })}
          value={newTask.worker_name}
        />
        <input
          className="w-full p-2 border rounded text-gray-700"
          type="text"
          placeholder="Worker ID"
          onChange={(e) => setNewTask({ ...newTask, worker_id: e.target.value })}
          value={newTask.worker_id}
        />
        <input
          className="w-full p-2 border rounded text-gray-700"
          type="text"
          placeholder="Task Name"
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          value={newTask.title}
        />
        <input
          className="w-full p-2 border rounded text-gray-700"
          type="text"
          placeholder="Farm Name"
          onChange={(e) => setNewTask({ ...newTask, farm_name: e.target.value })}
          value={newTask.farm_name}
        />
        <input
          className="w-full p-2 border rounded text-gray-700"
          type="date"
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
          value={newTask.deadline}
        />
        <button
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg"
          onClick={editingTaskId ? handleSaveTask : handleAddTask}
        >
          {editingTaskId ? "Save Changes" : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default WorkerTask;
