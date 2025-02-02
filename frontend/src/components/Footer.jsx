// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white p-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* About Section */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold">Farm Task Manager</h3>
          <p className="text-sm mt-2">
            A platform to streamline farm operations, from task management to team communication.
          </p>
        </div>

        {/* Links Section */}
        <div className="mb-4 md:mb-0">
          <h4 className="text-lg font-semibold"></h4>
          <ul className="list-none mt-2 space-y-2">
            <li><a href="/" className="hover:underline"></a></li>
            <li><a href="/about" className="hover:underline"></a></li>
            <li><a href="/contact" className="hover:underline"></a></li>
            <li><a href="/privacy" className="hover:underline"></a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="mb-4 md:mb-0">
          <h4 className="text-lg font-semibold">Follow Us</h4>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-white hover:text-yellow-400">Facebook</a>
            <a href="#" className="text-white hover:text-yellow-400">Twitter</a>
            <a href="#" className="text-white hover:text-yellow-400">Instagram</a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-6 text-sm">
        <p>&copy; {new Date().getFullYear()} Farm Task Manager. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
