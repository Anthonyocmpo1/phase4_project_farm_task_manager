import React, { createContext, useContext, useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { toast } from 'react-toastify'; // Ensure toast is imported for notifications

export const FarmContext = createContext();

export const FarmProvider = ({ children }) => {
    const navigate = useNavigate();
    const { authToken } = useContext(AuthContext);

    const [farms, setFarms] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [onChange, setOnChange] = useState(true);

    // ================================ FETCH FARMS =====================================
    useEffect(() => {
        if (!authToken) return;

        toast.loading("Loading farms ...");
        fetch("https://phase4-project-farm-task-manager-1.onrender.com/farm/farms", {
            method: "GET",
            headers: {
               'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((response) => response.json())
        .then((response) => {
            if (Array.isArray(response.farms)) {
                setFarms(response.farms);
                toast.dismiss();
            } else {
                console.error("Unexpected response format:", response);
                setFarms([]);
                toast.dismiss();
                toast.error("Failed to load farms.");
            }
        })
        .catch((error) => {
            console.error("Error fetching farms:", error);
            toast.dismiss();
            toast.error("Error fetching farms.");
        });
    }, [onChange]);

    // ================================ FARM FUNCTIONS =====================================
    const addFarm = (name, location, size) => {
        if (!name || !location  || !size) {
            toast.dismiss();
            toast.error("Farm name and location are required!");
            return;
        }

        toast.loading("Adding farm ... ");
        fetch("https://phase4-project-farm-task-manager-1.onrender.com/farm/add_farm", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ name,  location, size })
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.success && response.farm) {
                toast.dismiss();
                toast.success("Farm added successfully!");
                setFarms((prevFarms) => [...prevFarms, response.farm]);
            } else {
                toast.dismiss();
                toast.error(response.error || "Failed to add farm");
            }
        })
        .catch((error) => {
            toast.dismiss();
            toast.error("Error adding farm");
            console.error("Error:", error);
        });
    };

    // ================================ WORKER FUNCTIONS =====================================
    const addWorker = (name, role) => {
        if (!name || !role) {
            toast.dismiss();
            toast.error("All fields are required for the worker!");
            return;
        }

        toast.loading("Adding worker ... ");
        fetch("https://phase4-project-farm-task-manager-1.onrender.com/worker/add_worker", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ name, role })
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.success && response.worker) {
                toast.dismiss();
                toast.success("Worker added successfully!");
                setWorkers((prevWorkers) => [...prevWorkers, response.worker]);
            } else {
                toast.dismiss();
                toast.error(response.error || "Failed to add worker");
            }
        })
        .catch((error) => {
            toast.dismiss();
            toast.error("Error adding worker");
            console.error("Error:", error);
        });
    };

    const updateWorker = (id, name, role) => {
        toast.loading("Updating worker ... ");
        fetch(`https://phase4-project-farm-task-manager-1.onrender.com/worker/update_worker/${id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ name, role })
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.success) {
                toast.dismiss();
                toast.success("Worker updated successfully!");
                setOnChange(!onChange);
            } else {
                toast.dismiss();
                toast.error(response.error || "Failed to update worker");
            }
        })
        .catch((error) => {
            toast.dismiss();
            toast.error("Error updating worker");
            console.error("Error:", error);
        });
    };

    const deleteWorker = (id) => {
        toast.loading("Deleting worker ... ");
        fetch(`https://phase4-project-farm-task-manager-1.onrender.com/worker/delete_worker/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            }
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.success) {
                toast.dismiss();
                toast.success("Worker deleted successfully!");
                setWorkers((prevWorkers) => prevWorkers.filter(worker => worker.id !== id));
            } else {
                toast.dismiss();
                toast.error(response.error || "Failed to delete worker");
            }
        })
        .catch((error) => {
            toast.dismiss();
            toast.error("Error deleting worker");
            console.error("Error:", error);
        });
    };

    // ================================ TASK FUNCTIONS =====================================
    const addTask = (title, description, deadline, farmId) => {
        
    
        toast.loading("Adding task ... ")
        fetch("https://phase4-project-farm-task-manager-1.onrender.com/task/add_task", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                title, description, deadline, farmId
            }),
        })
        .then((resp) => resp.json())
        .then((response) => {
            console.log( response);
    
            if(response.success){
                toast.dismiss()
                toast.success(response.success)
                setOnChange(!onChange)
            }
            else if(response.error){
                toast.dismiss()
                toast.error(response.error)

            }
            else{
                toast.dismiss()
                toast.error("Failed to add")

            }
        });
    };
    

    const updateTask = (title, description, deadline,  farmId) => {
        toast.loading("Updating task ... ");
        fetch(`https://phase4-project-farm-task-manager-1.onrender.com/task/update_task/${id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ description })
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.success) {
                toast.dismiss();
                toast.success("Task updated successfully!");
                setOnChange(!onChange);
            } else {
                toast.dismiss();
                toast.error(response.error || "Failed to update task");
            }
        })
        .catch((error) => {
            toast.dismiss();
            toast.error("Error updating task");
            console.error("Error:", error);
        });
    };

    const deleteTask = (id) => {
        toast.loading("Deleting task ... ");
        fetch(`https://phase4-project-farm-task-manager-1.onrender.com/task/delete_task/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            }
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.success) {
                toast.dismiss();
                toast.success("Task deleted successfully!");
                setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
            } else {
                toast.dismiss();
                toast.error(response.error || "Failed to delete task");
            }
        })
        .catch((error) => {
            toast.dismiss();
            toast.error("Error deleting task");
            console.error("Error:", error);
        });
    };

    // ================================ DELETE FARM =====================================
    const deleteFarm = (id) => {
        toast.loading("Deleting farm ... ");
        fetch(`https://phase4-project-farm-task-manager-1.onrender.com/farm/delete_farm/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            }
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.message) {
                toast.dismiss();
                toast.message("Farm deleted successfully!");
                setFarms((prevFarms) => prevFarms.filter(farm => farm.id !== id));
            } else if (response.error) {
                toast.dismiss();
                toast.error(response.error);
            } else {
              toast.dismiss();
              toast.error("Failed to delect farm");
            }
        })
        // .catch((error) => {
        //     toast.dismiss();
        //     toast.error("Error deleting farm");
        //     console.error("Error:", error);
        // });
    };

    return (
        <FarmContext.Provider value={{ farms, workers, tasks, addFarm, addWorker, updateWorker, deleteWorker, addTask, updateTask, deleteTask, deleteFarm }}>
            {children}
        </FarmContext.Provider>
    );
};
