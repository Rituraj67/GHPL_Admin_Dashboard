import PublicLayout from "../components/layouts/PublicLayout"
import {useDirectors} from "../context/DirectorContext"


export default function DirectorsPage() {

  const {directors}= useDirectors()
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Board of Directors</h1>
        <p className="text-gray-600 mb-8">Meet the leadership team driving Genoviq's vision and success</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {directors.map((director) => (
            <div key={director.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={director.profilePicture || "/placeholder.svg"}
                    alt={director.name}
                    className="w-full md:w-40 h-40 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{director.name}</h3>
                    <p className="text-primary font-medium mb-3">{director.designation}</p>
                    <p className="text-gray-600">{director.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  )
}

