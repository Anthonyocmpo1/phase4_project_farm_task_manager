import { useState, useContext } from "react";
import { FarmContext } from "../context/FarmContext";
import { toast } from "react-toastify";

export default function Farms() {
  const farmContext = useContext(FarmContext);
  const { farms, addFarm, updateFarm, deleteFarm } = farmContext || {};

  const [formData, setFormData] = useState({ name: "", size: "", location: "" });
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (Add / Update farm)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (selectedFarm) {
        const updatedFarm = { name: formData.name, location: formData.location, size: formData.size };
        const response = await updateFarm(selectedFarm.id, updatedFarm);
        response?.success ? toast.success("Farm updated successfully!") : toast.error("Failed to update farm.");
      } else {
        await addFarm(formData.name, formData.location, formData.size);
        toast.success("Farm added successfully!");
      }

      setFormData({ name: "", size: "", location: "" });
      setSelectedFarm(null);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle farm deletion
  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this farm?")) {
  //     setIsLoading(true);
  //     try {
  //       const response = await deleteFarm(id);
  //       response?.success ? toast.message("Farm deleted successfully!") : toast.error("Failed to delete farm.");
  //     } catch (error) {
  //       console.error("Delete error:", error);
  //       toast.error("Error deleting farm.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // };

  // Handle farm edit (populate form)
  const handleEdit = (farm) => {
    setSelectedFarm(farm);
    setFormData({ name: farm.name, size: farm.size, location: farm.location });
  };

  // Sample data if no farms are available
  const sampleFarms = [
    { id: 1, name: "Green Valley Farm", size: "120 acres", location: "Texas, USA" },
    { id: 2, name: "Sunset Acres", size: "80 acres", location: "California, USA" },
    { id: 3, name: "Blue Ridge Farm", size: "150 acres", location: "Colorado, USA" },
  ];

  const displayFarms = Array.isArray(farms) && farms.length > 0 ? farms : sampleFarms;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Farm Management</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Farm Name"
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="Size"
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full p-3 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : selectedFarm ? "Update" : "Add"} Farm
          </button>
        </form>

        <div className="mt-6">
          {displayFarms.length > 0 ? (
            displayFarms.map((farm) => (
              <div key={farm.id} className="bg-gray-50 p-4 my-4 rounded-lg shadow-md border">
                <h2 className="text-xl font-semibold text-gray-700">{farm.name}</h2>
                <p className="text-gray-600">Size: {farm.size}</p>
                <p className="text-gray-600">Location: {farm.location}</p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleEdit(farm)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteFarm(farm.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No farms available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
