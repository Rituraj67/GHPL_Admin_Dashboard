import { createContext, useContext, useState, useEffect } from "react";
import axios from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [usersCount, setUsersCount]= useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading1, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const refreshLogin = async () => {
      try {
        setIsLoading(true)
        const res = await axios.post("/api/auth/refresh");
       
        if (res.status == 200) {
          
          setUser(res.data.name);
          setUsersCount(res.data.count);
          setIsAuthenticated(true);
          navigate("/admin");
        }
      } catch (error) {
        console.error(error);
      }finally{
        setIsLoading(false)
      }
    };
    refreshLogin();
  }, []);

  const login = async (userData, userCount) => {
    setUser(userData);
    setUsersCount(userCount)
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, usersCount, isLoading1, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
