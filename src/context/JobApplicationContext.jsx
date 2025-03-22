import { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axiosInstance.js";

const JobApplicationContext = createContext(null);

export function JobApplicationProvider({ children }) {
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  const [applications, setApplications] = useState([]);

  const getAllApplications = async () => {
    try {
      setIsLoadingApplications(true);
      const res = await axios.get("/api/jobs/applications");
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setIsLoadingApplications(false);
    }
  };

  useEffect(() => {
    getAllApplications();
  }, []);

  const addApplication = (newApp) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  const updateApplication = (updatedApp) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === updatedApp.id ? updatedApp : app))
    );
  };

  const removeApplication = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <JobApplicationContext.Provider
      value={{
        applications,
        isLoadingApplications,
        addApplication,
        updateApplication,
        removeApplication,
      }}
    >
      {children}
    </JobApplicationContext.Provider>
  );
}

export function useJobApplications() {
  const context = useContext(JobApplicationContext);
  if (!context) {
    throw new Error("useJobApplications must be used within a JobApplicationProvider");
  }
  return context;
}
