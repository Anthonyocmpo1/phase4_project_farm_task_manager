import React, { createContext, useContext, useState, useEffect } from "react"; // Ensure createContext is imported
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
export const FarmContext = createContext();  // This creates the context

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
        
        fetch("https://phase4-project-farm-task-manager-1.onrender.com/farm/farms", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
        })
        .then((response) => response.json())
        .then((response) => {
            if (Array.isArray(response.farms)) {
                setFarms(response.farms);
            } else {
                console.error("Unexpected response format:", response);
                setFarms([]);
            }
        })
        .catch((error) => {
            console.error("Error fetching farms:", error);
        });
    }, [onChange, authToken]);

    // ================================ FARM FUNCTIONS =====================================
    const addFarm = (name, location) => {
        if (!name || !location) {
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
            body: JSON.stringify({ name, location })
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.success && response.farm) {
                toast.dismiss();
                toast.success(response.success);
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
        fetch("https://phase4-project-farm-task-manager-1.onrender.com/farm/add_worker", {
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
                toast.success(response.success);
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
        fetch(`https://phase4-project-farm-task-manager-1.onrender.com/farm/update_worker/${id}`, {
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
                toast.success(response.success);
                setOnChange(!onChange);
            } else {
                toast.dismiss();
                toast.error(response.error || "Failed to update worker");
            }
        });
    };

    const deleteWorker = (id) => {
        toast.loading("Deleting worker ... ");
        fetch(`https://phase4-project-farm-task-manager-1.onrender.com/farm/delete_worker/${id}`, {
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
                toast.success(response.success);
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
    const addTask = (description, workerId) => {
        if (!description || !workerId) {
            toast.dismiss();
            toast.error("Description and worker ID are required for the task!");
            return;
        }

        toast.loading("Adding task ... ");
        fetch("https://phase4-project-farm-task-manager-1.onrender.com/farm/add_task", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ description, workerId })
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.success && response.task) {
                toast.dismiss();
                toast.success(response.success);
                setTasks((prevTasks) => [...prevTasks, response.task]);
            } else {
                toast.dismiss();
                toast.error(response.error || "Failed to add task");
            }
        })
        .catch((error) => {
            toast.dismiss();
            toast.error("Error adding task");
            console.error("Error:", error);
        });
    };

    const updateTask = (id, description) => {
        toast.loading("Updating task ... ");
        fetch(`https://phase4-project-farm-task-manager-1.onrender.com/farm/update_task/${id}`, {
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
                toast.success(response.success);
                setOnChange(!onChange);
            } else {
                toast.dismiss();
                toast.error(response.error || "Failed to update task");
            }
        });
    };

    const deleteTask = (id) => {
        toast.loading("Deleting task ... ");
        fetch(`https://phase4-project-farm-task-manager-1.onrender.com/farm/delete_task/${id}`, {
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
                toast.success(response.success);
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
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.success) {
                toast.dismiss();
                toast.success(response.success);
                setFarms((prevFarms) => prevFarms.filter(farm => farm.id !== id));
                navigate("/");
            } else {
                toast.dismiss();
                toast.error(response.error || "Failed to delete farm");
            }
        })
        .catch((error) => {
            toast.dismiss();
            toast.error("Error deleting farm");
            console.error("Error:", error);
        });
    };

    const data = {
        farms,
        addFarm,  // If addFarm is defined
        deleteFarm,
        workers,
        addWorker,
        updateWorker,
        deleteWorker,
        tasks,
        addTask,
        updateTask,
        deleteTask
    };
    

    return (
        <FarmContext.Provider value={data}>
            {children}
        </FarmContext.Provider>
    );
};
