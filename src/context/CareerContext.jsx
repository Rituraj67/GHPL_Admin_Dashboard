import { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axiosInstance.js";

const CareerContext = createContext(null);

export function CareerProvider({ children }) {
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [jobs, setJobs] = useState([]);

  const getAllJobs = async () => {
    try {
      setIsLoadingJobs(true);
      const res = await axios.get("/api/jobs/");
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  const addJob = (newJob) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  const updateJob = (updatedJob) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  const removeJob = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <CareerContext.Provider
      value={{
        jobs,
        isLoadingJobs,
        addJob,
        updateJob,
        removeJob,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
}

export function useCareers() {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error("useCareers must be used within a CareerProvider");
  }
  return context;
}
