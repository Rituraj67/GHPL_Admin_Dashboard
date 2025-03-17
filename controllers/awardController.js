import { uploadToCloudinary } from "../config/cloudinary.js";
import Award from "../models/Award.js";

export const getAllAwards = async (req, res) => {
  try {
    const awards = await Award.findAll();
    res.json(awards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAward = async (req, res) => {
  try {
    const { year, title, description } = req.body;
    const file = req.file;

    if (!year || !title || !description || !file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { url } = await uploadToCloudinary(file.buffer);

    const newAward = await Award.create({
      year,
      title,
      description,
      image: url,
    });

    res.status(201).json(newAward);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAward = async (req, res) => {
  const { id } = req.params;
  const { year, title, description, existingImage } = req.body;

  try {
    const award = await Award.findByPk(id);
    if (!award) {
      return res.status(404).json({ message: "Award not found" });
    }

    if (!year || !title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = existingImage;
    const file = req.file;

    if (file) {
      const { url } = await uploadToCloudinary(file.buffer);
      imageUrl = url;
    }

    await award.update({
      year,
      title,
      description,
      image: imageUrl,
    });

    res.status(200).json(award);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

export const deleteAward = async (req, res) => {
  const { id } = req.params;
  try {
    const award = await Award.findByPk(id);
    if (!award) {
      return res.status(404).json({ message: "Award not found" });
    }

    await award.destroy();
    res.status(200).json({ message: "Award deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting award", error: err.message });
  }
};
