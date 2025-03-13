"use client"

import { useState } from "react"
import PublicLayout from "../components/layouts/PublicLayout"

// Mock data for public news display
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

export default function NewsroomPage() {
  const currentYear = new Date().getFullYear()
  const availableYears = [...new Set(mockNews.map((item) => new Date(item.date).getFullYear()))].sort((a, b) => b - a)
  const [selectedYear, setSelectedYear] = useState(currentYear.toString())

  // Filter news by selected year
  const filteredNews = mockNews.filter((item) => {
    const newsYear = new Date(item.date).getFullYear().toString()
    return newsYear === selectedYear
  })

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Newsroom</h1>
        <p className="text-gray-600 mb-8">Stay updated with the latest news and announcements from PharmaCorp</p>

        <div className="flex flex-wrap gap-2 mb-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((newsItem) => (
            <div key={newsItem.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
              <img
                src={newsItem.image || "/placeholder.svg"}
                alt={newsItem.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{formatDate(newsItem.date)}</div>
                <h3 className="text-xl font-bold mb-2">{newsItem.title}</h3>
                <p className="text-gray-600 mb-4">{newsItem.description}</p>
                <button className="text-primary hover:underline">Read more</button>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No news articles found for {selectedYear}</p>
          </div>
        )}
      </div>
    </PublicLayout>
  )
}

