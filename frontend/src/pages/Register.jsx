import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Default import
import { Link } from 'react-router-dom'; // Add this line for Link

export default function Register() {
  const { register } = useContext(AuthContext); // Assuming register is provided in your AuthContext
  const navigate = useNavigate(); // Get navigate function from react-router-dom

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(``);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // ====> To Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert("Passwords don't match");
      return;
    }

    // Now passing navigate as an argument to register function
    register(username, email, role, password, navigate); // Ensure register function in AuthContext accepts navigate
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="w-[40%] bg-white p-4 rounded-xl h-min"
      >
        <h3 className="text-2xl my-4 font-bold font-mono">Register</h3>

        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            placeholder="Enter Username"
            required
          />
        </div>

        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Role
          </label>
          <input
            type="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            placeholder="Password"
            required
          />
        </div>

        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Repeat Password
          </label>
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            placeholder="Repeat Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-orange-600 hover:bg-orange-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6 mb-6"
        >
          Sign Up
        </button>

        <div>
          Already have an account? <Link to="/login" className="text-orange-500">Login</Link>
        </div>
      </form>
    </div>
  );
}
