import { uploadToCloudinary } from "../config/cloudinary.js";
import Testimonial from "../models/Testimonial.js";

export const getAllTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { name, designation, message } = req.body;
    const file = req.file;
    const { url } = await uploadToCloudinary(file.buffer);
    const data = await Testimonial.create({
      name,
      designation,
      message,
      profilePicture: url,
    });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTestimonial = async (req, res) => {
  const { name, designation, message, existingImage } = req.body;
  const { id } = req.params;

  console.log(id, existingImage);
  try {
    const testimonialItem = await Testimonial.findByPk(id);
    if (!testimonialItem) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    const file = req.file;
    let newUrl = existingImage;
    if (file) {
      const { url } = await uploadToCloudinary(file.buffer);
      newUrl = url;
    }
    await testimonialItem.update({
      name,
      designation,
      message,
      profilePicture: newUrl,
    });
    res.status(200).json(testimonialItem);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    await testimonial.destroy();

    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res
      .status(500)
      .json({ message: "Server error while deleting testimonial" });
  }
};
