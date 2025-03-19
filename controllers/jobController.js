import Job  from "../models/Job.js";
import { nanoid } from "nanoid"; // install with `npm install nanoid`

// Helper to validate required fields
const validateJobInput = (body) => {
  const requiredFields = ["title", "department", "location", "employmentType"];
  const missingFields = requiredFields.filter((field) => !body[field]);
  return missingFields;
};

export const createJob = async (req, res) => {
  try {
    console.log(req.body);
    const missingFields = validateJobInput(req.body);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }
    const id = `${req.body.department?.slice(0, 3).toUpperCase()}-${nanoid(
      6
    ).toUpperCase()}`;

    const job = await Job.create({
      ...req.body,
      id,
    });
    res.status(201).json(job);
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({ where: { isActive: true },  order: [["createdAt", "DESC"]], });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Get All Jobs Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const job = await Job.findByPk(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json(job);
  } catch (error) {
    console.error("Get Job By ID Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided to update" });
    }

    const [updated] = await Job.update(req.body, {
      where: { id: jobId },
    });

    if (!updated) return res.status(404).json({ message: "Job not found" });

    const updatedJob = await Job.findByPk(jobId);
    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Update Job Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    // Find the job
    const job = await Job.findByPk(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Set isActive to false
    job.isActive = false;
    await job.save();

    res.status(200).json({ message: "Job soft-deleted successfully", job });
  } catch (error) {
    console.error("Delete Job Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
