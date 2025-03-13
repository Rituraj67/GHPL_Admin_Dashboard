
import { createContext, useContext, useState, useEffect } from "react"
import axios from "../config/axiosInstance"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigate = useNavigate();
  
  


  useEffect(() => {
      try {
        const refreshLogin= async()=>{
          const res= await axios.post("/api/auth/refresh");
          console.log(res);
          if(res.status== 200){
            setUser(res.data.id)
            setIsAuthenticated(true)
            navigate("/admin")
          }
        }
        refreshLogin();
      } catch (error) {
        console.error("Error parsing stored user:", error)
      }
  }, [])

  const login = async (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    return true
  }

  const logout = () => {
    
    setUser(null)
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

 