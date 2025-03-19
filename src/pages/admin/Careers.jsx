"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import JobForm from "../../components/careers/JobForm";

import { motion, AnimatePresence } from "framer-motion";
import JobCard from "../../components/careers/jobCard";
import { useCareers } from "../../context/CareerContext";
import axios from "../../config/axiosInstance";

// Mock data for jobs

export default function Careers() {
  const { jobs, addJob, updateJob, removeJob } = useCareers();
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");

  // Get unique departments for filtering
  const departments = ["All", ...new Set(jobs.map((job) => job.department))];

  const handleAddJob = (newJob) => {
    if (!newJob) {
      setIsAddFormVisible(false);
      return;
    }
    addJob(newJob);
    setIsAddFormVisible(false);
    setSuccessMessage("Job posted successfully!");

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleEditJob = (updatedJob) => {
    if (!updatedJob) {
      setIsEditFormVisible(false);
      setCurrentJob(null);
      return;
    }

    updateJob(updatedJob);
    setIsEditFormVisible(false);
    setCurrentJob(null);
    setSuccessMessage("Job updated successfully!");

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to remove this job posting? This job posting will be set as Inactive.")) {
      try {
        const res = await axios.delete(`/api/jobs/${jobId}`);
        setSuccessMessage("Job deleted successfully!");
        removeJob(jobId);

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const openEditForm = (job) => {
    setCurrentJob(job);
    setIsEditFormVisible(true);

    if (isAddFormVisible) {
      setIsAddFormVisible(false);
    }

    // Delay scroll until form is rendered
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100); // Adjust timing if needed
  };

  // Filter jobs by department
  const filteredJobs =
    filterDepartment === "All"
      ? jobs
      : jobs.filter((job) => job.department === filterDepartment);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Careers Management</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsAddFormVisible(true);
              setIsEditFormVisible(false);
            }}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Post New Job
          </motion.button>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Job Form */}

        <AnimatePresence mode="wait">
          {isAddFormVisible && (
            <motion.div
              key="add-form"
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 bg-white p-6 rounded-lg shadow border overflow-hidden"
            >
              <h2 className="text-xl font-bold mb-4">Post New Job</h2>
              <JobForm
                onSubmit={handleAddJob}
                onCancel={() => setIsAddFormVisible(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isEditFormVisible && currentJob && (
            <motion.div
              key="edit-form"
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 bg-white p-6 rounded-lg shadow border overflow-hidden"
            >
              <h2 className="text-xl font-bold mb-4">Edit Job</h2>
              <JobForm
                initialData={currentJob}
                onSubmit={handleEditJob}
                isEditing={true}
                onCancel={() => {
                  setIsEditFormVisible(false);
                  setCurrentJob(null);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Department Filter */}
        <div className="mb-6">
          <div className="bg-white p-4 rounded-md shadow border">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Filter by Department
            </h3>
            <div className="flex flex-wrap gap-2">
              {departments.map((department) => (
                <button
                  key={department}
                  className={`px-3 py-1 rounded-md ${
                    filterDepartment === department
                      ? "bg-primary text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setFilterDepartment(department)}
                >
                  {department}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}

        <>
          {/* Job Listings */}
          <div className="relative z-0">
            <div className="grid grid-cols-1 gap-6 mt-4">
              <AnimatePresence>
                {filteredJobs.map((job, index) => (
                  <motion.div
                    layout
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <JobCard
                      job={job}
                      onEdit={openEditForm}
                      onDelete={handleDeleteJob}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500">
                No job postings found. Add your first job!
              </p>
            </motion.div>
          )}
        </>
      </div>
    </AdminLayout>
  );
}
