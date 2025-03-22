"use client"

import { useState, useEffect, useRef } from "react"
import AdminLayout from "../../components/layouts/AdminLayout"
import { motion, AnimatePresence } from "framer-motion"
import { useCareers } from "../../context/CareerContext"
import axios from "../../config/axiosInstance"
import JobCard from "../../components/JobCard"
import JobForm from "../../components/JobForm"
import IntroductionModal from "../../components/IntroductionModal"
import JobDetailsTooltip from "../../components/JobDetailsTooltip"
import ConfirmationDialog from "../../components/ConfirmationDialog"
import { useJobApplications } from "../../context/JobApplicationContext"

export default function Careers() {
  const { applications, isLoadingApplications, addApplication, updateApplication, removeApplication } =
    useJobApplications()
  const { jobs, addJob, updateJob, removeJob } = useCareers()
  const [activeTab, setActiveTab] = useState("jobs")
  const [isAddFormVisible, setIsAddFormVisible] = useState(false)
  const [isEditFormVisible, setIsEditFormVisible] = useState(false)
  const [currentJob, setCurrentJob] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("All")

  // Applications state
  const [introModalOpen, setIntroModalOpen] = useState(false)
  const [currentIntro, setCurrentIntro] = useState({ text: "", name: "" })
  const [hoveredJobId, setHoveredJobId] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const jobIdRefs = useRef({})

  // Rejection confirmation dialog state
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [applicationToReject, setApplicationToReject] = useState(null)
  const [isRejecting, setIsRejecting] = useState(false)

  // Add these new state variables after the rejection state variables
  const [confirmAcceptDialogOpen, setConfirmAcceptDialogOpen] = useState(false)
  const [applicationToAccept, setApplicationToAccept] = useState(null)
  const [isAccepting, setIsAccepting] = useState(false)

  // Get unique departments for filtering
  const departments = ["All", ...new Set(jobs.map((job) => job.department))]

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  const handleAddJob = (newJob) => {
    if (!newJob) {
      setIsAddFormVisible(false)
      return
    }
    addJob(newJob)
    setIsAddFormVisible(false)
    setSuccessMessage("Job posted successfully!")

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  const handleEditJob = (updatedJob) => {
    if (!updatedJob) {
      setIsEditFormVisible(false)
      setCurrentJob(null)
      return
    }

    updateJob(updatedJob)
    setIsEditFormVisible(false)
    setCurrentJob(null)
    setSuccessMessage("Job updated successfully!")

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to remove this job posting? This job posting will be set as Inactive.")) {
      try {
        const res = await axios.delete(`/api/jobs/${jobId}`)
        setSuccessMessage("Job deleted successfully!")
        removeJob(jobId)

        setTimeout(() => {
          setSuccessMessage("")
        }, 3000)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const openEditForm = (job) => {
    setCurrentJob(job)
    setIsEditFormVisible(true)

    if (isAddFormVisible) {
      setIsAddFormVisible(false)
    }

    // Delay scroll until form is rendered
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, 100)
  }

  // Filter jobs by department
  const filteredJobs = filterDepartment === "All" ? jobs : jobs.filter((job) => job.department === filterDepartment)

  const handleDownloadResume = async (resumeUrl, applicantName) => {
    try {
      const response = await fetch(resumeUrl)
      const blob = await response.blob()

      // Create a temporary link element
      const link = document.createElement("a")
      link.href = window.URL.createObjectURL(blob)
      link.download = `${applicantName.replace(/\s+/g, "_")}_Resume.pdf`
      link.click()

      // Optional cleanup
      window.URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error("Failed to download file:", error)
      alert("Failed to download resume. Please try again later.")
    }
  }

  const openIntroModal = (introduction, name) => {
    setCurrentIntro({ text: introduction, name })
    setIntroModalOpen(true)
  }

  const handleJobIdHover = (jobId, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: rect.right + 10,
      y: rect.top,
    })
    setHoveredJobId(jobId)
  }

  // Handle application rejection
  const openRejectConfirmation = (application) => {
    setApplicationToReject(application)
    setConfirmDialogOpen(true)
  }

  const handleRejectApplication = async () => {
    if (!applicationToReject) return

    setIsRejecting(true)

    try {
      // Make API call to update application status
      const response = await axios.put(`/api/jobs/reject/${applicationToReject.id}/`)

      // Update application in context with the response data
      updateApplication(response.data)

      // Show success message
      setSuccessMessage("Application rejected successfully")
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Failed to reject application:", error)
      setSuccessMessage("Failed to reject application. Please try again.")
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } finally {
      setIsRejecting(false)
      setConfirmDialogOpen(false)
      setApplicationToReject(null)
    }
  }

  // Add this new function after handleRejectApplication
  const openAcceptConfirmation = (application) => {
    setApplicationToAccept(application)
    setConfirmAcceptDialogOpen(true)
  }

  const handleAcceptApplication = async () => {
    if (!applicationToAccept) return

    setIsAccepting(true)

    try {
      // Make API call to update application status
      const response = await axios.put(`/api/jobs/accept/${applicationToAccept.id}/`)

      // Update application in context with the response data
      updateApplication(response.data)

      // Show success message
      setSuccessMessage("Application accepted successfully")
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Failed to accept application:", error)
      setSuccessMessage("Failed to accept application. Please try again.")
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } finally {
      setIsAccepting(false)
      setConfirmAcceptDialogOpen(false)
      setApplicationToAccept(null)
    }
  }

  const [hoveredJob, setHoveredJob] = useState(null)
  useEffect(() => {
    if (!hoveredJobId) return

    const getJobById = async (jobId) => {
      try {
        const res = await axios.get(`/api/jobs/${jobId}`)
        setHoveredJob(res.data)
      } catch (error) {}
    }

    getJobById(hoveredJobId)
  }, [hoveredJobId])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Careers Management</h1>
          {activeTab === "jobs" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsAddFormVisible(true)
                setIsEditFormVisible(false)
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
          )}
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

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("jobs")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "jobs"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Job Postings
              </button>
              <button
                onClick={() => setActiveTab("applications")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "applications"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Applications
              </button>
            </nav>
          </div>
        </div>

        {activeTab === "jobs" && (
          <>
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
                  <JobForm onSubmit={handleAddJob} onCancel={() => setIsAddFormVisible(false)} />
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
                      setIsEditFormVisible(false)
                      setCurrentJob(null)
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Department Filter */}
            <div className="mb-6">
              <div className="bg-white p-4 rounded-md shadow border">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Department</h3>
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
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <svg
                  className="animate-spin h-8 w-8 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
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
                          <JobCard job={job} onEdit={openEditForm} onDelete={handleDeleteJob} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {filteredJobs.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                    <p className="text-gray-500">No job postings found. Add your first job!</p>
                  </motion.div>
                )}
              </>
            )}
          </>
        )}

        {activeTab === "applications" && (
          <>
            <div className="bg-white rounded-lg shadow border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Introduction
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Job ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Applied On
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Resume
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {isLoadingApplications ? (
                      <tr>
                        <td colSpan={9} className="px-6 py-4 text-center">
                          <div className="flex justify-center items-center py-4">
                            <svg
                              className="animate-spin h-6 w-6 text-primary"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      applications.map((application) => (
                        <tr key={application.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{application.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{application.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{application.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => openIntroModal(application.introduction, application.name)}
                              className="text-primary hover:text-primary/80 text-sm font-medium"
                            >
                              View Introduction
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className="text-sm text-gray-900 font-semibold underline relative cursor-pointer"
                              ref={(el) => (jobIdRefs.current[application.jobId] = el)}
                              onMouseEnter={(e) => handleJobIdHover(application.jobId, e)}
                              onMouseLeave={() => setHoveredJobId(null)}
                            >
                              #{application.jobId}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {formatDate(application.createdAt || application.appliedAt)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() =>
                                handleDownloadResume(application.resume || application.resumeUrl, application.name)
                              }
                              className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              Download
                            </button>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold
                              ${application.status === "pending" && "bg-gray-200 text-gray-800"}
                              ${application.status === "rejected" && "bg-red-200 text-red-800"}
                              ${application.status === "accepted" && "bg-green-200 text-green-800"}
                            `}
                            >
                              {application.status
                                ? application.status.charAt(0).toUpperCase() + application.status.slice(1)
                                : "Pending"}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {application.status == "pending" && <div className="flex space-x-3">
                              {application.status !== "accepted" && (
                                <button
                                  onClick={() => openAcceptConfirmation(application)}
                                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                                  disabled={isAccepting}
                                >
                                  Accept
                                </button>
                              )}
                              {application.status !== "rejected" && (
                                <button
                                  onClick={() => openRejectConfirmation(application)}
                                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                                  disabled={isRejecting}
                                >
                                  Reject
                                </button>
                              )}
                            </div>}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {applications.length === 0 && !isLoadingApplications && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No applications received yet.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Introduction Modal */}
      <IntroductionModal
        isOpen={introModalOpen}
        onClose={() => setIntroModalOpen(false)}
        introduction={currentIntro.text}
        applicantName={currentIntro.name}
      />

      {/* Job Details Tooltip */}
      {hoveredJobId !== null && (
        <div
          style={{
            position: "fixed",
            top: `${tooltipPosition.y}px`,
            left: `${tooltipPosition.x}px`,
            zIndex: 100,
          }}
        >
          <JobDetailsTooltip job={hoveredJob} />
        </div>
      )}

      {/* Confirmation Dialog for Rejection */}
      <ConfirmationDialog
        isOpen={confirmDialogOpen}
        onClose={() => {
          setConfirmDialogOpen(false)
          setApplicationToReject(null)
        }}
        onConfirm={handleRejectApplication}
        title="Reject Application"
        message={`Are you sure you want to reject the application from ${applicationToReject?.name || "this applicant"}? This action cannot be undone.`}
        confirmText={isRejecting ? "Rejecting..." : "Confirm"}
        confirmButtonClass="bg-red-600 hover:bg-red-700 text-white"
        cancelText="Cancel"
      />

      {/* Confirmation Dialog for Acceptance */}
      <ConfirmationDialog
        isOpen={confirmAcceptDialogOpen}
        onClose={() => {
          setConfirmAcceptDialogOpen(false)
          setApplicationToAccept(null)
        }}
        onConfirm={handleAcceptApplication}
        title="Accept Application"
        message={`Are you sure you want to accept the application from ${applicationToAccept?.name || "this applicant"}? An acceptance email will be sent to the candidate upon confirmation.`}
        confirmText={isAccepting ? "Accepting..." : "Confirm"}
        confirmButtonClass="bg-green-600 hover:bg-green-700 text-white"
        cancelText="Cancel"
      />
    </AdminLayout>
  )
}

