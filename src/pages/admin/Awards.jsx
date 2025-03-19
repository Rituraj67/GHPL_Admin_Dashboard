import { useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import AwardForm from "../../components/AwardForm";
import AwardCard from "../../components/AwardCard";
import { useAwards } from "../../context/AwardContext";

export default function AdminAwards() {
  const { awards, addAward, updateAward } = useAwards();
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [currentAward, setCurrentAward] = useState(null);

  // Get unique years for filtering
  const years = [...new Set(awards.map((award) => award.year))].sort(
    (a, b) => b - a
  );
  const [selectedYear, setSelectedYear] = useState("All");

  // Filter awards by selected year
  const filteredAwards =
    selectedYear === "All"
      ? awards
      : awards.filter((award) => award.year.toString() === selectedYear);

  const handleAddAward = (newAward) => {
    if (!newAward) {
      setIsAddFormVisible(false);
      return;
    }
    addAward(newAward);
    setIsAddFormVisible(false);
  };

  const handleEditAward = (updatedAward) => {
    if (updatedAward) updateAward(updatedAward);
    setIsEditFormVisible(false);
    setCurrentAward(null);
  };

  const openEditForm = (award) => {
    setCurrentAward(award);
    if (isAddFormVisible) {
      setIsAddFormVisible(false);
    }
    setIsEditFormVisible(true);
    // Delay scroll until form is rendered
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100); // Adjust timing if needed
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Awards & Recognition</h1>
          <button
            onClick={() => {
              setIsAddFormVisible(true);
              setIsEditFormVisible(false);
            }}
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
            Add Award
          </button>
        </div>

        {/* Add Award Form */}
        {isAddFormVisible && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-bold mb-4">Add New Award</h2>
            <AwardForm
              onSubmit={handleAddAward}
              onCancel={() => setIsAddFormVisible(false)}
            />
          </div>
        )}

        {/* Edit Award Form */}
        {isEditFormVisible && currentAward && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-bold mb-4">Edit Award</h2>
            <AwardForm
              initialData={currentAward}
              onSubmit={handleEditAward}
              isEditing={true}
              onCancel={() => {
                setIsEditFormVisible(false);
                setCurrentAward(null);
              }}
            />
          </div>
        )}

        {/* Year Filter */}
        <div className="mb-6">
          <div className="bg-white p-4 rounded-md shadow border">
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedYear === "All"
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAwards.map((award) => (
            <AwardCard key={award.id} award={award} onEdit={openEditForm} />
          ))}
        </div>

        {filteredAwards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No awards found for the selected year.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
