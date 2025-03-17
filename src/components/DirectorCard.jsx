"use client"

export default function DirectorCard({ director, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={director.profilePicture || "/placeholder.svg"}
            alt={director.name}
            className="w-full md:w-40 h-40 object-cover rounded-md"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{director.name}</h3>
                <p className="text-primary font-medium mb-3">{director.designation}</p>
              </div>
              <button onClick={() => onEdit(director)} className="p-1 rounded-md hover:bg-gray-100 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
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
              </button>
            </div>
            <p className="text-gray-600">{director.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

