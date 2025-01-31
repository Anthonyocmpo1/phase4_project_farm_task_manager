import React from "react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const WorkerHome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center bg-white p-10 rounded-xl shadow-lg mb-8"
      >
        <h1 className="text-4xl font-bold text-green-600">Welcome, Worker!</h1>
        <p className="text-lg text-gray-600 mt-2">
          Stay organized and manage your tasks efficiently.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-blue-600 text-white p-6 rounded-xl shadow-lg mb-8 w-3/4"
      >
        <h2 className="text-2xl font-semibold">Manage Your Schedule</h2>
        <p className="mt-2 text-lg">
          Easily keep track of your tasks and appointments. Boost your productivity with ease!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg w-3/4"
      >
        <h2 className="text-2xl font-semibold">Quick Access to Tools</h2>
        <p className="mt-2 text-lg">
          Get fast access to the tools you need, all in one place, for a seamless experience.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-green-500 text-white p-6 rounded-xl shadow-lg w-3/4"
      >
        <h2 className="text-2xl font-semibold">Stay Connected</h2>
        <p className="mt-2 text-lg">
          Stay connected with your team and clients through real-time updates and notifications.
        </p>
      </motion.div>
    </div>
  );
};

export default WorkerHome;
