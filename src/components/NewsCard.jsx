"use client"

export default function NewsCard({ news, onEdit }) {
  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border">
      <div className="relative">
        <img src={news.image || "/placeholder.svg"} alt={news.title} className="w-full h-48 object-cover" />
        <button
          className="absolute top-2 right-2 p-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => onEdit(news)}
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
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-500 mb-2">{formatDate(news.date)}</div>
        <h3 className="font-bold text-lg mb-2">{news.title}</h3>
        <p className="text-sm line-clamp-3 text-gray-600">{news.description}</p>
      </div>

      <div className="px-4 pb-4">
        <button className="text-primary hover:underline text-sm" onClick={() => onEdit(news)}>
          Read more
        </button>
      </div>
    </div>
  )
}

