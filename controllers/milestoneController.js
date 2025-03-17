import { uploadToCloudinary } from "../config/cloudinary.js";
import Milestone from "../models/Milestone.js";

export const getAllMilestones = async (req, res) => {
  try {
    const data = await Milestone.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createMilestone = async (req, res) => {
  try {
    const { year, title, description } = req.body;
    const file = req.file;

    // Field validation
    if (!year || !title || !description || !file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { url } = await uploadToCloudinary(file.buffer);

    const data = await Milestone.create({
      year,
      title,
      description,
      image: url,
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateMilestone = async (req, res) => {
  const { year, title, description, existingImage } = req.body;
  const { id } = req.params;

  try {
    // Validate input
    if (!year || !title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const milestoneItem = await Milestone.findByPk(id);
    if (!milestoneItem) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    const file = req.file;
    let newUrl = existingImage;
    if (file) {
      const { url } = await uploadToCloudinary(file.buffer);
      newUrl = url;
    }

    await milestoneItem.update({
      year,
      title,
      description,
      image: newUrl,
    });

    res.status(200).json(milestoneItem);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

export const deleteMilestone = async (req, res) => {
  const { id } = req.params;

  try {
    const milestone = await Milestone.findByPk(id);
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    await milestone.destroy();

    res.status(200).json({ message: "Milestone deleted successfully" });
  } catch (error) {
    console.error("Error deleting milestone:", error);
    res
      .status(500)
      .json({ message: "Server error while deleting milestone" });
  }
};
