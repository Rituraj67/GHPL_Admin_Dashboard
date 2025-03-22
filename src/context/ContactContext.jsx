import { createContext, useContext, useEffect, useState } from "react";

import axios from "../config/axiosInstance.js"
import { useAuth } from "./AuthContext.jsx";

const ContactContext = createContext(null);

export function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [loading4, setLoading] = useState(false)
  const {isAuthenticated}= useAuth()
  const getAllContact=async()=>{
    try {
        setLoading(true)
        const res= await axios.get("/api/contact/");
        
        setContacts(res.data)
    } catch (error) {
        console.error(error);
    }finally{
        setLoading(false)
    }
  }

  useEffect(() => {
    getAllContact();
  }, [isAuthenticated]);

  const updateContact = (data) => {
    setContacts((prevContact) =>
      prevContact.map((contact) =>
        contact.id === data.id ? data : contact
      )
    );
  };

  
  
  
  return <ContactContext.Provider value={{contacts, loading4, updateContact}}>{children}</ContactContext.Provider>;
}

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useProduct must be used within an AuthProvider");
  }
  return context;
}
