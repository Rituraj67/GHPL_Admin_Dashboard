import { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axiosInstance.js";

const DirectorContext = createContext(null);

export function DirectorProvider({ children }) {
  const [isLoadingDirector, setIsLoading] = useState(false);
  const [directors, setDirectors] = useState([]);

  const getAllDirectors = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/director/");
      setDirectors(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllDirectors();
  }, []);

  const addDirector = (newDirector) => {
    setDirectors((prev) => [newDirector, ...prev]);
  };

  const updateDirector = (updated) => {
    setDirectors((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const removeDirector = (id) => {
    setDirectors((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <DirectorContext.Provider
      value={{
        directors,
        isLoadingDirector,
        addDirector,
        updateDirector,
        removeDirector,
      }}
    >
      {children}
    </DirectorContext.Provider>
  );
}

export function useDirectors() {
  const context = useContext(DirectorContext);
  if (!context) {
    throw new Error("useDirectors must be used within a DirectorProvider");
  }
  return context;
}
