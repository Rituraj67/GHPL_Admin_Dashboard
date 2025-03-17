import PublicLayout from "../components/layouts/PublicLayout"
import {useTestimonials} from "../context/TestimonialContext"


export default function TestimonialsPage() {
  const {testimonials}= useTestimonials()
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Client Testimonials</h1>
        <p className="text-gray-600 mb-8">What our clients and partners say about Genoviq</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
              <div className="p-6">
                <div className="flex flex-col items-center mb-4">
                  <img
                    src={testimonial.profilePicture || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover mb-3"
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
                  <p className="text-gray-600 italic pl-6 pr-2">{testimonial.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  )
}

