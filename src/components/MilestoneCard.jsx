"use client";

export default function MilestoneCard({ milestone, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border">
      <div className="relative">
        <img
          src={milestone.image || "/placeholder.svg"}
          alt={milestone.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 bg-primary text-white px-4 py-2 rounded-br-lg font-bold">
          {milestone.year}
        </div>
        <button
          className="absolute top-2 right-2 p-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => onEdit(milestone)}
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
        <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
        <div className="text-gray-600 text-sm max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
          {milestone.description}
        </div>
      </div>
    </div>
  );
}
