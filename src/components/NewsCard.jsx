"use client"

import { useState, useRef, useEffect } from "react"

export default function NewsCard({ news, onEdit }) {
  const [showModal, setShowModal] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const descRef = useRef(null)

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Check if text is truncated
  useEffect(() => {
    const el = descRef.current
    if (el && el.scrollHeight > el.clientHeight) {
      setIsTruncated(true)
    }
  }, [])

  return (
    <>
      {/* Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border relative">
        {/* Image & Edit Button */}
        <div className="relative">
          <img
            src={news.image || "/placeholder.svg"}
            alt={news.title}
            className="w-full h-48 object-cover"
          />
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
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-sm text-gray-500 mb-2">{formatDate(news.date)}</div>
          <h3 className="font-bold text-lg mb-2">{news.title}</h3>
          <p
            className="text-sm text-gray-600 line-clamp-3"
            ref={descRef}
          >
            {news.description}
          </p>
        </div>

        {/* Read More */}
        <div className="px-4 pb-4">
          {isTruncated && (
            <button
              className="text-primary hover:underline text-sm"
              onClick={() => setShowModal(true)}
            >
              Read more
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-lg w-full mx-4 p-6 shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">{news.title}</h2>
            <p className="text-sm text-gray-700 whitespace-pre-line">{news.description}</p>
          </div>
        </div>
      )}
    </>
  )
}
