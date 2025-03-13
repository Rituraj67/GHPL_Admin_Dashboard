"use client"

import { useState, useRef } from "react"
import axios from "../config/axiosInstance"
import { useProduct } from "../context/ProductContext"

export default function ProductForm({ initialData = null, onSubmit, isEditing = false, onCancel }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    mrp: initialData?.mrp || "",
    composition: initialData?.composition || "",
    description: initialData?.description || "",
    division: initialData?.division || "",
    type: initialData?.type || "",
    packaging: initialData?.packaging || "",
  })

  // Store existing images as URLs for display
  const [existingImages, setExistingImages] = useState(initialData?.images || [])

  // Store new image files for FormData submission
  const [newImageFiles, setNewImageFiles] = useState([])
  // Store new image previews for display
  const [newImagePreviews, setNewImagePreviews] = useState([])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  const {addProduct, updateProduct}= useProduct()

  // Division options
  const divisionOptions = [
    "Pain Management",
    "Antibiotics",
    "Nutritional Supplements",
    "Allergy Care",
    "Gastroenterology",
    "Diabetes Care",
    "Cardiovascular",
    "Respiratory",
    "Oncology",
    "Neurology",
    "Dermatology",
    "Psychiatry",
    "Infectious Diseases",
  ]

  // Medicine type options
  const medicineTypes = [
    "Tablet",
    "Capsule",
    "Syrup",
    "Suspension",
    "Ointment",
    "Cream",
    "Lotion",
    "Inhaler",
    "Injectable",
    "Suppository",
    "Patch",
    "Drop",
    "Gel",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    // Store the actual file objects for FormData submission
    setNewImageFiles((prevFiles) => [...prevFiles, ...files])

    // Create preview URLs for display only
    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setNewImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews])
  }

  const removeExistingImage = (index) => {
    const updatedImages = [...existingImages]
    updatedImages.splice(index, 1)
    setExistingImages(updatedImages)
  }

  const removeNewImage = (index) => {
    // Remove from previews
    const updatedPreviews = [...newImagePreviews]
    updatedPreviews.splice(index, 1)
    setNewImagePreviews(updatedPreviews)

    // Remove from files
    const updatedFiles = [...newImageFiles]
    updatedFiles.splice(index, 1)
    setNewImageFiles(updatedFiles)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create FormData object for API submission
      const productFormData = new FormData()

      // Add all text fields
      Object.keys(formData).forEach((key) => {
        productFormData.append(key, formData[key])
      })

      // Add product ID if editing
      if (isEditing && initialData?.id) {
        productFormData.append("id", initialData.id)
      }

      // Add existing image URLs as JSON string
      if (existingImages.length > 0) {
        productFormData.append("existingImages", JSON.stringify(existingImages))
      }

      // Add new image files
      newImageFiles.forEach((file, index) => {
        productFormData.append(`product_images`, file)
      })

      // For demo/development, log the FormData contents
      console.log("Form data to be submitted:", productFormData)
      console.log("Existing images:", existingImages)
      console.log("New image files:", newImageFiles)

    
      let res;
      if(isEditing){
        res = await axios.put(`/api/products/${initialData.id}`, productFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        updateProduct(res.data.product)
        
      }else{
        res = await axios.post('/api/products/add', productFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        addProduct(res.data)
      }
      onSubmit()
      console.log(res);

    } catch (error) {
      console.error("Error submitting product:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="mrp" className="block text-sm font-medium text-gray-700">
            MRP (₹)
          </label>
          <input
            id="mrp"
            name="mrp"
            type="number"
           
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.mrp}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="division" className="block text-sm font-medium text-gray-700">
            Division
          </label>
          <select
            id="division"
            name="division"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.division}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Division
            </option>
            {divisionOptions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Medicine Type
          </label>
          <select
            id="type"
            name="type"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Type
            </option>
            {medicineTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="packaging" className="block text-sm font-medium text-gray-700">
            Packaging
          </label>
          <input
            id="packaging"
            name="packaging"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.packaging}
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
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="space-y-2">
        <label htmlFor="composition" className="block text-sm font-medium text-gray-700">
          Composition
        </label>
        <textarea
          id="composition"
          name="composition"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={formData.composition}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Product Images</label>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Current Images</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {existingImages.map((image, index) => (
                <div key={`existing-${index}`} className="relative group">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    className="h-24 w-full object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeExistingImage(index)}
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
              ))}
            </div>
          </div>
        )}

        {/* New Images */}
        {newImagePreviews.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">New Images</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newImagePreviews.map((preview, index) => (
                <div key={`new-${index}`} className="relative group">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`New Product ${index + 1}`}
                    className="h-24 w-full object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeNewImage(index)}
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
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
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
              <span>Add Images</span>
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
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
          {isSubmitting ? "Saving..." : isEditing ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  )
}

