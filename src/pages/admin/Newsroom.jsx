"use client"

import { useState } from "react"
import AdminLayout from "../../components/layouts/AdminLayout"
import NewsForm from "../../components/NewsForm"
import NewsCard from "../../components/NewsCard"

// Mock data for news
const mockNews = [
  {
    id: 1,
    title: "New Product Launch: Advanced Pain Relief Formula",
    description:
      "We're excited to announce the launch of our new advanced pain relief formula, designed to provide faster and longer-lasting relief.",
    date: "2023-12-15",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "PharmaCorp Expands Global Reach with New Partnership",
    description:
      "PharmaCorp has signed a strategic partnership with European healthcare provider to expand distribution across the continent.",
    date: "2023-10-05",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Research Breakthrough in Diabetes Treatment",
    description:
      "Our research team has made a significant breakthrough in diabetes treatment that could improve quality of life for millions.",
    date: "2023-08-22",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Annual Healthcare Conference Announcement",
    description:
      "PharmaCorp will be hosting its annual healthcare conference in September, bringing together experts from around the world.",
    date: "2022-11-30",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    title: "New Research Facility Opening",
    description: "PharmaCorp is proud to announce the opening of our new state-of-the-art research facility in Boston.",
    date: "2022-07-15",
    image: "/placeholder.svg",
  },
]

export default function AdminNewsroom() {
  const [news, setNews] = useState(mockNews)
  const [isAddFormVisible, setIsAddFormVisible] = useState(false)
  const [isEditFormVisible, setIsEditFormVisible] = useState(false)
  const [currentNews, setCurrentNews] = useState(null)

  // Get current year and available years from news data
  const currentYear = new Date().getFullYear()
  const availableYears = [...new Set(news.map((item) => new Date(item.date).getFullYear()))].sort((a, b) => b - a)
  const [selectedYear, setSelectedYear] = useState(currentYear.toString())

  const handleAddNews = (newNews) => {
    if (!newNews) {
      setIsAddFormVisible(false)
      return
    }

    const newsWithId = {
      ...newNews,
      id: news.length + 1,
    }
    setNews([...news, newsWithId])
    setIsAddFormVisible(false)
  }

  const handleEditNews = (updatedNews) => {
    if (!updatedNews) {
      setIsEditFormVisible(false)
      setCurrentNews(null)
      return
    }

    setNews(news.map((item) => (item.id === updatedNews.id ? updatedNews : item)))
    setIsEditFormVisible(false)
    setCurrentNews(null)
  }

  const openEditForm = (newsItem) => {
    setCurrentNews(newsItem)
    setIsEditFormVisible(true)
  }

  // Filter news by selected year
  const filteredNews = news.filter((item) => {
    const newsYear = new Date(item.date).getFullYear().toString()
    return newsYear === selectedYear
  })

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Newsroom</h1>
          <button
            onClick={() => setIsAddFormVisible(true)}
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
            Add News
          </button>
        </div>

        {/* Add News Form */}
        {isAddFormVisible && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-bold mb-4">Add News Article</h2>
            <NewsForm onSubmit={handleAddNews} onCancel={() => setIsAddFormVisible(false)} />
          </div>
        )}

        {/* Edit News Form */}
        {isEditFormVisible && currentNews && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-bold mb-4">Edit News Article</h2>
            <NewsForm
              initialData={currentNews}
              onSubmit={handleEditNews}
              isEditing={true}
              onCancel={() => {
                setIsEditFormVisible(false)
                setCurrentNews(null)
              }}
            />
          </div>
        )}

        {/* Year Filter */}
        <div className="mb-6">
          <div className="bg-white p-4 rounded-md shadow border">
            <div className="flex flex-wrap gap-2">
              {availableYears.map((year) => (
                <button
                  key={year}
                  className={`px-4 py-2 rounded-md ${
                    selectedYear === year.toString()
                      ? "bg-primary text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setSelectedYear(year.toString())}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((newsItem) => (
            <NewsCard key={newsItem.id} news={newsItem} onEdit={openEditForm} />
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No news articles found for {selectedYear}</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

