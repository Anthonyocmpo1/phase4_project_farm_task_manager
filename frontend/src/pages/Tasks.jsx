import React, { useState, useContext } from 'react';
import { FarmContext } from '../context/FarmContext';

const Task = () => {
    const { tasks, addTask, updateTask, deleteTask } = useContext(FarmContext);
    const [taskDescription, setTaskDescription] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);
    const [workerId, setWorkerId] = useState('');

    const handleAddTask = () => {
        if (taskDescription && workerId) {
            addTask(taskDescription, workerId);
            setTaskDescription('');
            setWorkerId('');
        } else {
            alert('Please fill in all fields');
        }
    };

    const handleUpdateTask = (id) => {
        if (taskDescription) {
            updateTask(id, taskDescription);
            setTaskDescription('');
            setSelectedTask(null);
        } else {
            alert('Please provide a description for the task');
        }
    };

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
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        placeholder="Task Description"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="number"
                        value={workerId}
                        onChange={(e) => setWorkerId(e.target.value)}
                        placeholder="Worker ID"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        onClick={handleAddTask}
                        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Add Task
                    </button>
                </div>
            </div>

            {/* Task List */}
            <div className="mt-10 max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Tasks List</h2>
                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <li key={task.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-medium text-gray-700">{task.description}</p>
                                    <p className="text-sm text-gray-500">Worker ID: {task.workerId}</p>
                                </div>
                                <div className="space-x-3">
                                    <button
                                        onClick={() => {
                                            setSelectedTask(task);
                                            setTaskDescription(task.description);
                                        }}
                                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="text-red-600 hover:text-red-800 font-semibold"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Update Task Form */}
            {selectedTask && (
                <div className="mt-10 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Update Task</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            placeholder="Updated Task Description"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            onClick={() => handleUpdateTask(selectedTask.id)}
                            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
                        >
                            Update Task
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Task;
