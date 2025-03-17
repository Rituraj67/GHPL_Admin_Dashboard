
import { useState } from "react"
import axios from "../config/axiosInstance"

export default function AwardForm({ initialData = null, onSubmit, isEditing = false, onCancel }) {
  const [formData, setFormData] = useState({
    year: initialData?.year || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
  })

  const [newImage, setNewImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]

    if (file) {
      // In a real app, you would upload this file to a server
      // For this demo, we'll create an object URL
      const imageUrl = URL.createObjectURL(file)
      setFormData({...formData, image: file})
      setNewImage(imageUrl)
    }
  }

  const removeImage = () => {
    setNewImage(null)

    if (isEditing) {
      setFormData({
        ...formData,
        image: "",
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
  
    try {
      const formDataToSend = new FormData()
      formDataToSend.append("year", formData.year)
      formDataToSend.append("title", formData.title)
      formDataToSend.append("description", formData.description)
  
      // Only append image if it's a new File object (not a URL string)
      if (formData.image && typeof formData.image !== "string" && newImage) {
        formDataToSend.append("image", formData.image)
      }
      else{
        formDataToSend.append("existingImage", formData.image);
      }
  
      let res= null;
      if (isEditing && initialData?.id) {
        res= await axios.put(`/api/award/${initialData.id}`, formDataToSend, 
          {
            headers:{
              "Content-Type":"multipart/form-data"
            }
          }) 
      }else{
        res= await axios.post('api/award/', formDataToSend,
          {
            headers:{
              "Content-Type":"multipart/form-data"
            }
          })
      }
      console.log("Award submitted successfully:", res.data)
      onSubmit(res.data)
    } catch (error) {
      console.error("Error submitting award:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            id="year"
            name="year"
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Award Title
          </label>
          <input
            id="title"
            name="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Award Image</label>

        {/* Current Image */}
        {(formData.image || newImage) && (
          <div className="relative group inline-block">
            <img src={newImage || formData.image} alt="Award" className="h-48 object-cover rounded-md border" />
            <button
              type="button"
              className="absolute top-2 right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={removeImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}

        {/* Upload Button */}
        {!newImage && !formData.image && (
          <div>
            <label htmlFor="image-upload" className="cursor-pointer block">
              <div className="flex items-center gap-2 border border-dashed rounded-md p-4 hover:bg-gray-50 transition-colors">
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
                <span>Add Image</span>
              </div>
              <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : isEditing ? "Update Award" : "Add Award"}
        </button>
      </div>
    </form>
  )
}

