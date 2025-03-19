"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "../config/axiosInstance";

const employmentTypes = ["Full-time", "Part-time", "Internship", "Contract"];

const jobDepartments = [
  "Sales",
  "Marketing",
  "Business Development",
  "Medical Affairs",
  "Regulatory & Compliance",
  "Operations & Supply Chain",
  "Finance & Accounts",
  "Human Resources (HR)",
  "Legal & Contracts",
  "IT & Support",
  "Administration",
  "Training & Development",
  "Research & Development",
];

export default function JobForm({
  initialData = null,
  onSubmit,
  isEditing = false,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    department: initialData?.department || "",
    location: initialData?.location || "",
    employmentType: initialData?.employmentType || "Full-time",
    description: initialData?.description || "",
    qualifications: initialData?.qualifications || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Job title is required";
    }

    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Job description is required";
    }

    if (!formData.qualifications.trim()) {
      newErrors.qualifications = "Job qualifications are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // In a real app, this would be an API call
    try {
      setIsSubmitting(true);
      let res = null;
      if (isEditing && initialData) {
        res = await axios.put(`/api/jobs/${initialData.id}`, formData);
      } else {
        res = await axios.post(`/api/jobs/`, formData);
      }
      console.log(res);
      onSubmit(res.data);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Job Title*
          </label>
          <input
            id="title"
            name="title"
            className={`w-full px-3 py-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            value={formData.title}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700"
          >
            Department*
          </label>
          <select
            id="department"
            name="department"
            className={`w-full px-3 py-2 border ${
              errors.department ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            value={formData.department}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="" disabled>
              Select a department
            </option>
            {jobDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-red-500 text-xs mt-1">{errors.department}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location*
          </label>
          <input
            id="location"
            name="location"
            className={`w-full px-3 py-2 border ${
              errors.location ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            value={formData.location}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="employmentType"
            className="block text-sm font-medium text-gray-700"
          >
            Employment Type*
          </label>
          <select
            id="employmentType"
            name="employmentType"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.employmentType}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            {employmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Job Description*
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className={`w-full px-3 py-2 border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
          value={formData.description}
          onChange={handleChange}
          disabled={isSubmitting}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="qualifications"
          className="block text-sm font-medium text-gray-700"
        >
          Qualifications*
        </label>
        <textarea
          id="qualifications"
          name="qualifications"
          rows={4}
          className={`w-full px-3 py-2 border ${
            errors.qualifications ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
          value={formData.qualifications}
          onChange={handleChange}
          disabled={isSubmitting}
        ></textarea>
        {errors.qualifications && (
          <p className="text-red-500 text-xs mt-1">{errors.qualifications}</p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </motion.button>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span>Submitting...</span>
            </>
          ) : (
            <span>{isEditing ? "Update Job" : "Post Job"}</span>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}
