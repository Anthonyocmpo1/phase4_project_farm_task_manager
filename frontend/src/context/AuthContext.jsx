import React, { createContext, useContext, useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();  // Named export

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Declare navigate here

  // LOGIN
  const login = (email, password) => {
    toast.loading("Logging you in ... ")
    fetch("https://phase4-project-farm-task-manager-1.onrender.com/auth/login", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email, password
      })
    })
    .then((resp) => resp.json())
    .then((response) => {
      if (response.access_token) {
        toast.dismiss()
        sessionStorage.setItem("token", response.access_token);
        setAuthToken(response.access_token)

        toast.success("Successfully Logged in")
        navigate("/")
      }
      else if (response.error) {
        toast.dismiss()
        toast.error(response.error)
      }
      else {
        toast.dismiss()
        toast.error("Failed to login")
      }
    })
  };

  // REGISTER FUNCTION
  const register = (username, email, role, password, navigate) => {
    toast.loading("Registering...");
  
    const requestBody = JSON.stringify({ username, email, role, password });
    console.log("Request Body:", requestBody); // Log the request being sent
  
    fetch("https://phase4-project-farm-task-manager-1.onrender.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then(async (resp) => {
        console.log("Raw Response:", resp);
        const responseText = await resp.text(); // Read raw response text
        console.log("Response Text:", responseText);
  
        try {
          return JSON.parse(responseText); // Try parsing as JSON
        } catch {
          return { error: "Invalid JSON response from server" };
        }
      })
      .then((response) => {
        console.log("Parsed Response:", response); // Log parsed response
        toast.dismiss();
  
        if (response?.message) { // Corrected to use 'message' instead of 'msg'
          toast.success(response.message); // Show success message
          setTimeout(() => {
            navigate("/login"); // Redirect after 2 seconds
          }, 2000);
        } else if (response?.error) {
          toast.error(response.error); // Show error message
        } else {
          toast.error("Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        toast.dismiss();
        console.error("Registration error:", error);
        toast.error("An error occurred while registering.");
      });
  };
  
  
  // LOGOUT FUNCTION
  const logout = () => {
    sessionStorage.removeItem("token");
    setAuthToken(null);
  };

  const data = { authToken, login, register, logout }; // Define data for context provider

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};
