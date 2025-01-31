import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false); // Optional: Loading state for requests

  // LOGIN
  const login = (email, password) => {
    setIsLoading(true);
    toast.loading("Logging you in ... ");
    fetch("http://127.0.0.1:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        setIsLoading(false);
        if (response.access_token) {
          toast.dismiss();
          sessionStorage.setItem("token", response.access_token);
          setAuthToken(response.access_token);
          toast.success("Successfully Logged in");
          navigate("/");
        } else {
          toast.dismiss();
          toast.error(response.error || "Failed to login");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.dismiss();
        toast.error("Network error, please try again later");
      });
  };

  // ADD user (Register)
  const addUser = (username, email, password) => {
    setIsLoading(true);
    toast.loading("Registering ... ");
    fetch("http://127.0.0.1:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        setIsLoading(false);
        if (response.msg) {
          toast.dismiss();
          toast.success(response.msg);
          navigate("/login");
        } else {
          toast.dismiss();
          toast.error(response.error || "Failed to register");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.dismiss();
        toast.error("Network error, please try again later");
      });
  };

  // LOGOUT
  const logout = () => {
    sessionStorage.removeItem("token");
    setAuthToken(null);
    navigate("/login");
  };

  const data = {
    authToken,
    login,
    addUser,
    logout,
    isLoading, // Pass loading state to context
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
