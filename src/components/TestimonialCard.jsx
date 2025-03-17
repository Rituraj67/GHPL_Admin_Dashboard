"use client"

export default function TestimonialCard({ testimonial, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border">
      <div className="p-6">
        <div className="flex flex-col items-center mb-4">
          <img
            src={testimonial.profilePicture || "/placeholder.svg"}
            alt={testimonial.name}
            className="w-24 h-24 rounded-full object-cover mb-3"
          />
          <h3 className="text-lg font-bold">{testimonial.name}</h3>
          <p className="text-sm text-gray-500">{testimonial.designation}</p>
        </div>

        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-200 absolute top-0 left-0 -mt-2 -ml-2"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-gray-600 italic pl-6 pr-2 mb-4">{testimonial.message}</p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => onEdit(testimonial)}
            className="text-primary hover:text-primary/80 flex items-center gap-1"
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
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

