// controllers/newsController.js
import { uploadToCloudinary } from "../config/cloudinary.js";
import News from "../models/News.js";

// Get all news
export const getAllNews = async (req, res) => {
  try {
    const news = await News.findAll({ order: [["date", "DESC"]] });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Add a news item
export const addNews = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    console.log(title, description, date, req.file);

    if(!title || !description || !date || !req.file){
        res.status(400).json({ message: "All fields are mandetory", error: err.message });
    }

    if(req.file){
        var { optimizedUrl } = await uploadToCloudinary(req.file.buffer);
    }

    const newItem = await News.create({ title, description, date, image: optimizedUrl });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
};

// Update a news item
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, existingImage } = req.body;
    let newImage= null;
    if(req.file){
        const { optimizedUrl } = await uploadToCloudinary(req.file.buffer);
        newImage= optimizedUrl;
    }

    if(!newImage){
        newImage= existingImage;
    }

    const newsItem = await News.findByPk(id);
    if (!newsItem)
      return res.status(404).json({ message: "News item not found" });

    await newsItem.update({ title, description, date, image: newImage });
    res.status(200).json(newsItem);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

// Delete a news item
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const newsItem = await News.findByPk(id);
    if (!newsItem)
      return res.status(404).json({ message: "News item not found" });

    await newsItem.destroy();
    res.json({ message: "News item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
