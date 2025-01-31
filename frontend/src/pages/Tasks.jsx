import { useEffect, useState } from "react";
// import { useFarmContext } from "../context/FarmContext";


export default function Tasks() {
  const { fetchTasks, addTask, updateTask, deleteTask, tasks } = useFarmContext();
  const [formData, setFormData] = useState({ title: "", description: "", deadline: "", farm_id: "" });
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTask) {
      await updateTask(selectedTask.id, formData);
    } else {
      await addTask(formData);
    }
    setFormData({ title: "", description: "", deadline: "", farm_id: "" });
    setSelectedTask(null);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setFormData({ title: task.title, description: task.description, deadline: task.deadline, farm_id: task.farm_id });
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Task Management</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="title" value={formData.title} onChange={handleChange} placeholder="Task Title" required className="w-full p-3 border rounded-lg" />
          <Input name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-3 border rounded-lg" />
          <Input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <Input name="farm_id" value={formData.farm_id} onChange={handleChange} placeholder="Farm ID" required className="w-full p-3 border rounded-lg" />
          <Button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            {selectedTask ? "Update" : "Add"} Task
          </Button>
        </form>
        <div className="mt-6">
          {tasks.map((task) => (
            <div key={task.id} className="bg-gray-50 p-4 my-4 rounded-lg shadow-md border">
              <h2 className="text-xl font-semibold text-gray-700">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-gray-600">Deadline: {task.deadline}</p>
              <p className="text-gray-600">Farm ID: {task.farm_id}</p>
              <div className="flex space-x-2 mt-2">
                <Button onClick={() => handleEdit(task)} className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(task.id)} className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
