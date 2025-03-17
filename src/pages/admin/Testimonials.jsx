import { useState } from "react"
import AdminLayout from "../../components/layouts/AdminLayout"
import TestimonialForm from "../../components/TestimonialForm"
import TestimonialCard from "../../components/TestimonialCard"
import { useTestimonials } from "../../context/TestimonialContext"



export default function AdminTestimonials() {
  const {testimonials, addTestimonial, updateTestimonial}= useTestimonials()
  const [isAddFormVisible, setIsAddFormVisible] = useState(false)
  const [isEditFormVisible, setIsEditFormVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(null)

  const handleAddTestimonial = (newTestimonial) => {
    if (!newTestimonial) {
      setIsAddFormVisible(false)
      return
    }
    addTestimonial(newTestimonial)
    setIsAddFormVisible(false)
  }

  const handleEditTestimonial = (updatedTestimonial) => {
    if (!updatedTestimonial) {
      setIsEditFormVisible(false)
      setCurrentTestimonial(null)
      return
    }
    updateTestimonial(updatedTestimonial)
    setIsEditFormVisible(false)
    setCurrentTestimonial(null)
  }

  const openEditForm = (testimonial) => {
    if(isAddFormVisible){
      setIsAddFormVisible(false)
    }
    setCurrentTestimonial(testimonial)
    setIsEditFormVisible(true)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <button
            onClick={() => {setIsAddFormVisible(true)
                            setIsEditFormVisible(false)
            }}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
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
            Add Testimonial
          </button>
        </div>

        {/* Add Testimonial Form */}
        {isAddFormVisible && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-bold mb-4">Add New Testimonial</h2>
            <TestimonialForm onSubmit={handleAddTestimonial} onCancel={() => setIsAddFormVisible(false)} />
          </div>
        )}

        {/* Edit Testimonial Form */}
        {isEditFormVisible && currentTestimonial && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-bold mb-4">Edit Testimonial</h2>
            <TestimonialForm
              initialData={currentTestimonial}
              onSubmit={handleEditTestimonial}
              isEditing={true}
              onCancel={() => {
                setIsEditFormVisible(false)
                setCurrentTestimonial(null)
              }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} onEdit={openEditForm} />
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No testimonials found. Add your first testimonial!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

