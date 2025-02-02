import React from "react";
import { motion } from "framer-motion";

const WorkerHome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
      {/* Farm Task Manager Description Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center bg-amber-100 p-8 rounded-xl shadow-lg mb-8 max-w-4xl w-full mx-4"
      >
        <h1 className="text-4xl font-bold text-green-700">Farm Task Manager: Simplifying Farm Operations</h1>
        <p className="text-lg text-gray-800 mt-4">
          Farm Task Manager is designed to help farmers streamline and organize their daily tasks. Whether you're managing crops, livestock, or equipment, our platform provides a centralized system to keep track of all your operations in one place.
        </p>
        <div className="mt-6 text-left text-lg text-gray-700">
          <h3 className="font-semibold text-xl text-green-600">How It Works:</h3>
          <ul className="list-inside list-disc mt-4 space-y-2">
            <li><strong>Add New Farms:</strong> Easily create and manage multiple farms. Specify important details like farm location, size, and owner to keep everything organized.</li>
            <li><strong>Task Management:</strong> Plan, assign, and track tasks such as planting, irrigation, fertilization, harvesting, and more. Stay on top of your schedule with real-time updates.</li>
            <li><strong>Task Updates:</strong> Update tasks in real-time, making it easier to adapt to changing conditions like weather or equipment availability.</li>
            <li><strong>Efficient Communication:</strong> Share tasks and updates with your team, ensuring everyone is on the same page and working toward the same goal.</li>
            <li><strong>Seamless Integration:</strong> Manage everything from your desktop or mobile device, whether you’re in the field or at home.</li>
          </ul>
        </div>
      </motion.div>

      {/* Existing Worker Sections */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center bg-amber-200 p-8 rounded-xl shadow-lg mb-8 max-w-4xl w-full mx-4"
      >
        <h1 className="text-4xl font-bold text-green-700">Welcome, Worker!</h1>
        <p className="text-lg text-gray-700 mt-2">
          Stay organized and manage your tasks efficiently.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-yellow-700 text-white p-6 rounded-xl shadow-lg mb-8 max-w-4xl w-full mx-4"
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
        className="bg-brown-500 text-white p-6 rounded-xl shadow-lg mb-8 max-w-4xl w-full mx-4"
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
        className="bg-green-600 text-white p-6 rounded-xl shadow-lg mb-8 max-w-4xl w-full mx-4"
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
