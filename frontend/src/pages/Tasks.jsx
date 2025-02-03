import React, { useState, useContext } from 'react';
import { FarmContext } from '../context/FarmContext';
import { toast } from 'react-toastify';

const Task = () => {
    const { farms, tasks, addTask, updateTask, deleteTask } = useContext(FarmContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [farmId, setFarmId] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);

    // Function to handle adding a task
    const handleAddTask = () => {
        if (!title || !farmId || !deadline || !description ) {
            toast.error("Title and Farm ID are required!");
            return;
        }
        addTask(title, description, deadline, farmId);
        setTitle('');  // fixed: use single quotes
        setFarmId('');  // fixed: use single quotes
        setDeadline('');  // fixed: use single quotes
        setDescription('');  // fixed: use single quotes
    };

    // Function to handle updating a task
    const handleUpdateTask = (id) => {
        if (taskDescription) {
            updateTask(id, taskDescription);
            setTaskDescription('');
            setSelectedTask(null);
        } else {
            toast.error('Please provide a description for the task');
        }
    };

    // Function to handle deleting a task
    const handleDeleteTask = (id) => {
        deleteTask(id);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4">
            <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">Farm Task Management</h1>

            {/* Add Task Form */}
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Add New Task</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task Title"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Task Description"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        placeholder="Task Deadline"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <select onChange={(e) => setFarmId(e.target.value)} className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" >
                        <option value="">Select</option>
                        {farms && farms.map((farm) => (
                            <option value={farm.id} key={farm.id}>{farm.name}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleAddTask}
                        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task;
