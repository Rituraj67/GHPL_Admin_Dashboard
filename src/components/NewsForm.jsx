"use client";

import { useState } from "react";
import { useNews } from "../context/NewsContext";
import axios from "../config/axiosInstance";

export default function NewsForm({
  initialData = null,
  onSubmit,
  isEditing = false,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    date: initialData?.date
      ? new Date(initialData.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    image: initialData?.image || "",
  });

  const { addNews, updateNews } = useNews();

  const [newImage, setNewImage] = useState(null); // Actual file to upload
  const [previewImage, setPreviewImage] = useState(initialData?.image || null); // Shown in UI
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const removeImage = () => {
    setNewImage(null);
    setPreviewImage(null);
    if (isEditing) {
      setFormData((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("description", formData.description);
    formPayload.append("date", formData.date);

    if (newImage) {
      formPayload.append("news_image", newImage); // File object
    } else if (formData.image) {
      formPayload.append("existingImage", formData.image); // Existing image URL
    }

    let response;
    try {
      if (isEditing) {
        response = await axios.put(`/api/news/${initialData.id}`, formPayload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        updateNews(response.data);
      } else {
        response = await axios.post("/api/news/", formPayload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        addNews(response.data);
      }
      onSubmit(response?.data);
    } catch (error) {
      console.error("Image upload error:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      {/* Date */}
      <div className="space-y-2">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">News Image</label>

        {previewImage && (
          <div className="relative group inline-block">
            <img
              src={previewImage}
              alt="Preview"
              className="h-48 object-cover rounded-md border"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {!previewImage && (
          <label htmlFor="image-upload" className="cursor-pointer block">
            <div className="flex items-center gap-2 border border-dashed rounded-md p-4 hover:bg-gray-50 transition-colors">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>Add Image</span>
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : isEditing ? "Update News" : "Add News"}
        </button>
      </div>
    </form>
  );
}
