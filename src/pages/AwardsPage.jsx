import { useState } from "react"
import PublicLayout from "../components/layouts/PublicLayout"
import {useAwards} from "../context/AwardContext"


export default function AwardsPage() {

  const {awards}=  useAwards()

  // Get unique years for filtering
  const years = [...new Set(awards.map((award) => award.year))].sort((a, b) => b - a)
  const [selectedYear, setSelectedYear] = useState("All")

  // Filter awards by selected year
  const filteredAwards =
    selectedYear === "All" ? awards : awards.filter((award) => award.year.toString() === selectedYear)

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Awards & Recognition</h1>
        <p className="text-gray-600 mb-8">Celebrating our achievements and contributions to healthcare</p>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            className={`px-4 py-2 rounded-md ${
              selectedYear === "All" ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedYear("All")}
          >
            All Years
          </button>

          {years.map((year) => (
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAwards.map((award) => (
            <div key={award.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
              <div className="relative">
                <img src={award.image || "/placeholder.svg"} alt={award.title} className="w-full h-48 object-cover" />
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-2 rounded-bl-lg font-bold">
                  {award.year}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{award.title}</h3>
                <p className="text-gray-600">{award.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredAwards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No awards found for the selected year.</p>
          </div>
        )}
      </div>
    </PublicLayout>
  )
}

