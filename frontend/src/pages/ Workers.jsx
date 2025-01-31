import { useEffect } from "react";
import { Link } from 'react-router-dom';
// import { useFarmContext } from "../context/FarmContext";

const Worker = () => {
  const { tasks, fetchWorkerTasks, updateTaskProgress } = useFarmContext();

  useEffect(() => {
    fetchWorkerTasks();
  }, []);

  const handleStatusUpdate = async (taskId, status) => {
    await updateTaskProgress(taskId, status);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks assigned.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-sm text-gray-500">Deadline: {task.deadline || "No deadline"}</p>
              <p className="text-sm font-bold mt-2">Status: {task.status}</p>
              <div className="mt-4 flex gap-2">
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  onClick={() => handleStatusUpdate(task.id, "in progress")}
                >
                  Mark In Progress
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={() => handleStatusUpdate(task.id, "completed")}
                >
                  Mark Completed
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Worker;
