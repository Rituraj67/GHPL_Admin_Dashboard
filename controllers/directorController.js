import { uploadToCloudinary } from "../config/cloudinary.js";
import Director from "../models/Director.js";


export const getAllDirectors = async (req, res) => {
  try {
    const directors = await Director.findAll();
    res.json(directors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const createDirector = async (req, res) => {
  try {
    const { name, designation, description } = req.body;
    const file = req.file;

    if (!name || !designation || !description || !file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { url } = await uploadToCloudinary(file.buffer);

    const newDirector = await Director.create({
      name,
      designation,
      description,
      profilePicture: url,
    });

    res.status(201).json(newDirector);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateDirector = async (req, res) => {
  const { id } = req.params;
  const { name, designation, description, existingImage } = req.body;

  try {
    const director = await Director.findByPk(id);
    if (!director) {
      return res.status(404).json({ message: "Director not found" });
    }

    if (!name || !designation || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = existingImage;
    const file = req.file;

    if (file) {
      const { url } = await uploadToCloudinary(file.buffer);
      imageUrl = url;
    }

    await director.update({
      name,
      designation,
      description,
      profilePicture: imageUrl,
    });

    res.status(200).json(director);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};


export const deleteDirector = async (req, res) => {
  const { id } = req.params;
  try {
    const director = await Director.findByPk(id);
    if (!director) {
      return res.status(404).json({ message: "Director not found" });
    }

    await director.destroy();
    res.status(200).json({ message: "Director deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting director", error: err.message });
  }
};
