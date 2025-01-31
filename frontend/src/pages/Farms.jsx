import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
// import { useFarmContext } from "../context/FarmContext";


export default function Farm() {
  const { fetchFarms, addFarm, updateFarm, deleteFarm, farms } = useFarmContext();
  const [formData, setFormData] = useState({ name: "", size: "", location: "" });
  const [selectedFarm, setSelectedFarm] = useState(null);

  useEffect(() => {
    fetchFarms();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFarm) {
      await updateFarm(selectedFarm.id, formData);
    } else {
      await addFarm(formData);
    }
    setFormData({ name: "", size: "", location: "" });
    setSelectedFarm(null);
  };

  const handleEdit = (farm) => {
    setSelectedFarm(farm);
    setFormData({ name: farm.name, size: farm.size, location: farm.location });
  };

  const handleDelete = async (id) => {
    await deleteFarm(id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Farm Management</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" value={formData.name} onChange={handleChange} placeholder="Farm Name" required className="w-full p-3 border rounded-lg" />
          <Input name="size" value={formData.size} onChange={handleChange} placeholder="Size" required className="w-full p-3 border rounded-lg" />
          <Input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required className="w-full p-3 border rounded-lg" />
          <Button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            {selectedFarm ? "Update" : "Add"} Farm
          </Button>
        </form>
        <div className="mt-6">
          {farms.map((farm) => (
            <div key={farm.id} className="bg-gray-50 p-4 my-4 rounded-lg shadow-md border">
              <h2 className="text-xl font-semibold text-gray-700">{farm.name}</h2>
              <p className="text-gray-600">Size: {farm.size}</p>
              <p className="text-gray-600">Location: {farm.location}</p>
              <div className="flex space-x-2 mt-2">
                <Button onClick={() => handleEdit(farm)} className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(farm.id)} className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600">
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
