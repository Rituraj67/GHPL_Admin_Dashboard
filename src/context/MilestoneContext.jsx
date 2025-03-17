import { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axiosInstance.js";

const MilestoneContext = createContext(null);

export function MilestoneProvider({ children }) {
  const [isLoadingMilestone, setIsLoading] = useState(false);
  const [milestones, setMilestones] = useState([]);

  const getAllMilestones = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/milestone/");
      setMilestones(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllMilestones();
  }, []);

  const addMilestone = (newMilestone) => {
    setMilestones((prev) => [newMilestone, ...prev ]);
  };

  const updateMilestone = (updated) => {
    setMilestones((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const removeMilestone = (id) => {
    setMilestones((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MilestoneContext.Provider
      value={{
        milestones,
        isLoadingMilestone,
        addMilestone,
        updateMilestone,
        removeMilestone,
      }}
    >
      {children}
    </MilestoneContext.Provider>
  );
}

export function useMilestones() {
  const context = useContext(MilestoneContext);
  if (!context) {
    throw new Error("useMilestones must be used within a MilestoneProvider");
  }
  return context;
}
