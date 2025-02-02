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
  const register = (username, email, password, navigate) => {
    toast.loading("Registering ... ");
    
    fetch("https://phase4-project-farm-task-manager-1.onrender.com/auth/register", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, email, password })
    })
    .then((resp) => resp.json())
    .then((response) => {
      console.log(response);
  
      toast.dismiss();
      
      if (response.msg) {
        toast.success(response.msg);
        navigate("/login"); // Redirect to login page after successful registration
      } else if (response.error) {
        toast.error(response.error);
      } else {
        toast.error("Failed to add user.");
      }
    })
    .catch((error) => {
      toast.dismiss();
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
