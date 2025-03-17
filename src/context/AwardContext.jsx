import { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axiosInstance.js";

const AwardContext = createContext(null);

export function AwardProvider({ children }) {
  const [isLoadingAward, setIsLoading] = useState(false);
  const [awards, setAwards] = useState([]);

  const getAllAwards = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/award/");
      setAwards(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllAwards();
  }, []);

  const addAward = (newAward) => {
    setAwards((prev) => [...prev, newAward]);
  };

  const updateAward = (updated) => {
    setAwards((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const removeAward = (id) => {
    setAwards((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AwardContext.Provider
      value={{
        awards,
        isLoadingAward,
        addAward,
        updateAward,
        removeAward,
      }}
    >
      {children}
    </AwardContext.Provider>
  );
}

export function useAwards() {
  const context = useContext(AwardContext);
  if (!context) {
    throw new Error("useAwards must be used within an AwardProvider");
  }
  return context;
}
