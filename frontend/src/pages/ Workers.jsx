import { useState, useContext } from "react";
import { FarmContext } from "../context/FarmContext";

const Worker = () => {
  const { farms } = useContext(FarmContext); // Access the farms from FarmContext
  const farmContext = useContext(FarmContext);
  // Worker data
  const [worker, setWorker] = useState({
    id: 1,
    name: "John Doe",
    role: "Farm Worker",
    contact: "555-1234",
    status: "Active",
    farm: farms[0]?.name || "", // Set farm from the first farm in the list if available
  });

  // State to track worker updates
  const [editing, setEditing] = useState(false);
  const [updatedWorker, setUpdatedWorker] = useState(worker);

  // State for adding new worker
  const [newWorker, setNewWorker] = useState({
    id: null,
    name: "",
    role: "",
    contact: "",
    status: "Active",
    farm: farms[0]?.name || "", // Set farm from the first farm in the list if available
  });

  // State for messages
  const [message, setMessage] = useState("");

  // Update worker details
  const handleUpdate = () => {
    setWorker(updatedWorker);
    setEditing(false);
    setMessage("Worker details successfully updated!");
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };

  // Delete worker details (reset to empty)
  const handleDelete = () => {
    setWorker({
      id: null,
      name: "",
      role: "",
      contact: "",
      status: "",
      farm: "",
    });
    setMessage("Worker successfully deleted!");
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };

  // Handle input changes when editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedWorker((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle input changes for new worker
  const handleNewWorkerChange = (e) => {
    const { name, value } = e.target;
    setNewWorker((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Add new worker
  const handleAddWorker = () => {
    setWorker(newWorker);
    setNewWorker({
      id: null,
      name: "",
      role: "",
      contact: "",
      status: "Active",
      farm: farms[0]?.name || "", // Use farm from the first farm if available
    });
    setMessage("New worker added successfully!");
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-teal-700">Worker Details</h1>

      {/* Success Message */}
      {message && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
          <p>{message}</p>
        </div>
      )}

      {/* Add Worker Section */}
      <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Add New Worker</h2>
        <div>
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newWorker.name}
              onChange={handleNewWorkerChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700" htmlFor="role">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={newWorker.role}
              onChange={handleNewWorkerChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700" htmlFor="contact">
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={newWorker.contact}
              onChange={handleNewWorkerChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={newWorker.status}
              onChange={handleNewWorkerChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700" htmlFor="farm">
              Farm
            </label>
            <select
              id="farm"
              name="farm"
              value={newWorker.farm}
              onChange={handleNewWorkerChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {farms.map((farm) => (
                <option key={farm.id} value={farm.name}>
                  {farm.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            onClick={handleAddWorker}
          >
            Add Worker
          </button>
        </div>
      </div>

      {/* Worker Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-teal-800">Worker Information</h2>
        {!editing ? (
          <div>
            <p className="text-lg font-semibold">Name: {worker.name}</p>
            <p className="text-lg">Role: {worker.role}</p>
            <p className="text-lg">Contact: {worker.contact}</p>
            <p className="text-lg">Status: {worker.status}</p>
            <p className="text-lg">Farm: {worker.farm}</p>
            <div className="mt-4 flex gap-2">
              <button
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                onClick={() => setEditing(true)}
              >
                Edit Details
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete Worker
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="block text-lg font-semibold text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={updatedWorker.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-semibold text-gray-700" htmlFor="role">
                Role
              </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={updatedWorker.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-semibold text-gray-700" htmlFor="contact">
                Contact
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={updatedWorker.contact}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-semibold text-gray-700" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={updatedWorker.status}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-semibold text-gray-700" htmlFor="farm">
                Farm
              </label>
              <select
                id="farm"
                name="farm"
                value={updatedWorker.farm}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {farms.map((farm) => (
                  <option key={farm.id} value={farm.name}>
                    {farm.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Worker;
