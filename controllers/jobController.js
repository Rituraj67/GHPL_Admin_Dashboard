import { uploadPdfToCloudinary } from "../config/cloudinary.js";
import Job from "../models/Job.js";
import { nanoid } from "nanoid"; // install with `npm install nanoid`
import JobApplication from "../models/JobApplication.js";
import { Op } from "sequelize";
import { sendApplicationAcknowledgement } from "../utils/sendApplicationAcknowledgement.js";
import { sendRejectionMail } from "../utils/sendRejectionMail.js";
import { sendAcceptanceMail } from "../utils/sendAcceptanceMail.js";

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
    const jobs = await Job.findAll({
      where: { isActive: true },
      order: [["createdAt", "DESC"]],
    });
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


export const sendApplication = async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const { name, phone, email, introduction } = req.body;

    const existingApplication = await JobApplication.findOne({
      where: {
        jobId,
        [Op.or]: [{ email }, { phone }],
      },
    });

    if (existingApplication) {
      return res.status(409).json({
        message: "You have already applied for this job with this phone or email.",
      });
    }

    const { url } = await uploadPdfToCloudinary(
      req.file.buffer,
      req.file.originalname
    );

    const result = await JobApplication.create({
      name,
      phone,
      email,
      introduction,
      resume: url,
      jobId,
    });

    sendApplicationAcknowledgement({jobId, email, name, jobTitle: job.title });

    res.status(201).json(result);
  } catch (error) {
    console.error("Application Error:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};


export const getAllApplications = async (req, res) => {
  try {
    const result = await JobApplication.findAll({
      order: [['createdAt', 'DESC']], // Sort by createdAt in descending order
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



export const rejectApplication = async (req, res) => {
  const applicationId = req.params.id;

  try {
    // 1. Find the application
    const application = await JobApplication.findByPk(applicationId, {
      include: {
        model: Job,
        attributes: ["id","title"]
      }
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // 2. Update status to "rejected"
    application.status = "rejected";
    await application.save();

    // 3. Send rejection email
    const { email, name } = application;
    const jobTitle = application.Job?.title || "the position you applied for";
    const jobId= application.Job?.id

    await sendRejectionMail({email, name, jobId, jobTitle});
    res.status(200).json(application);

  } catch (error) {
    console.error("❌ Error rejecting application:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const acceptApplication = async (req, res) => {
  const applicationId = req.params.id;

  try {
    // 1. Find the application
    const application = await JobApplication.findByPk(applicationId, {
      include: {
        model: Job,
        attributes: ["id","title"]
      }
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // 2. Update status to "rejected"
    application.status = "accepted";
    await application.save();

    // 3. Send rejection email
    const { email, name } = application;
    const jobTitle = application.Job?.title || "the position you applied for";
    const jobId= application.Job?.id

    await sendAcceptanceMail({email, name, jobId, jobTitle});
    res.status(200).json(application);

  } catch (error) {
    console.error("❌ Error rejecting application:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// export const downloadResume = async (req, res) => {
//   const { fileUrl, name } = req.body;

//   res.setHeader(
//     "Content-Disposition",
//     `attachment; filename=${name}_resume.pdf`
//   );
//   res.setHeader("Content-Type", "application/octet-stream");

//   const file = await fetch(fileUrl);
//   const buffer = await file.arrayBuffer();

//   res.send(Buffer.from(buffer));
// };
