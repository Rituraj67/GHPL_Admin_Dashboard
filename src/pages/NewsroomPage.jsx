import { useState } from "react"
import PublicLayout from "../components/layouts/PublicLayout"
import { useNews } from "../context/NewsContext"
import { Dialog } from "@headlessui/react" // for modal

export default function NewsroomPage() {
  const { news } = useNews();

  const [selectedYear, setSelectedYear] = useState("All");
  const [modalNews, setModalNews] = useState(null);

  const currentYear = new Date().getFullYear();
  const newsYears = [...new Set(news.map((item) => new Date(item.date).getFullYear()))];
  const availableYears = Array.from(
    new Set(["All", ...newsYears.filter((year) => year <= currentYear).sort((a, b) => b - a)])
  );

  const filteredNews =
    selectedYear === "All"
      ? news
      : news.filter((item) => new Date(item.date).getFullYear().toString() === selectedYear);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const isDescriptionLong = (desc) => {
    const words = desc.split(" ");
    return words.length > 40; // ~3 lines approx
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Newsroom</h1>
        <p className="text-gray-600 mb-8">
          Stay updated with the latest news and announcements from Genoviq
        </p>

        {availableYears.length > 1 && (
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
        )}

        {news.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            No news available at the moment.
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            No news articles found for {selectedYear}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((newsItem) => (
              <div
                key={newsItem.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border"
              >
                <img
                  src={newsItem.image || "/placeholder.svg"}
                  alt={newsItem.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {formatDate(newsItem.date)}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{newsItem.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{newsItem.description}</p>
                  {isDescriptionLong(newsItem.description) && (
                    <button
                      className="text-primary hover:underline"
                      onClick={() => setModalNews(newsItem)}
                    >
                      Read more
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Popup Modal */}
        <Dialog
          open={modalNews !== null}
          onClose={() => setModalNews(null)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl rounded bg-white p-6 shadow-xl">
              <Dialog.Title className="text-xl font-bold mb-2">
                {modalNews?.title}
              </Dialog.Title>
              <p className="text-sm text-gray-500 mb-4">{formatDate(modalNews?.date)}</p>
              <img
                src={modalNews?.image || "/placeholder.svg"}
                alt="News Image"
                className="w-full h-60 object-cover mb-4 rounded"
              />
              <p className="text-gray-700 whitespace-pre-line">{modalNews?.description}</p>
              <div className="mt-6 text-right">
                <button
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
                  onClick={() => setModalNews(null)}
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </PublicLayout>
  )
}
