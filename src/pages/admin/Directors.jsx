"use client";

import { useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import DirectorForm from "../../components/DirectorForm";
import DirectorCard from "../../components/DirectorCard";
import { useDirectors } from "../../context/DirectorContext";

export default function AdminDirectors() {
  const { directors, addDirector, updateDirector } = useDirectors();
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [currentDirector, setCurrentDirector] = useState(null);

  const handleAddDirector = (newDirector) => {
    if (!newDirector) {
      setIsAddFormVisible(false);
      return;
    }
    addDirector(newDirector);
    setIsAddFormVisible(false);
  };

  const handleEditDirector = (updatedDirector) => {
    if (!updatedDirector) {
      setIsEditFormVisible(false);
      setCurrentDirector(null);
      return;
    }
    updateDirector(updatedDirector);

    setIsEditFormVisible(false);
    setCurrentDirector(null);
  };

  const openEditForm = (director) => {
    if (isAddFormVisible) {
      setIsAddFormVisible(false);
    }
    setCurrentDirector(director);
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
          <h1 className="text-3xl font-bold">Board of Directors</h1>
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
            Add Director
          </button>
        </div>

        {/* Add Director Form */}
        {isAddFormVisible && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-bold mb-4">Add New Director</h2>
            <DirectorForm
              onSubmit={handleAddDirector}
              onCancel={() => setIsAddFormVisible(false)}
            />
          </div>
        )}

        {/* Edit Director Form */}
        {isEditFormVisible && currentDirector && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-bold mb-4">Edit Director</h2>
            <DirectorForm
              initialData={currentDirector}
              onSubmit={handleEditDirector}
              isEditing={true}
              onCancel={() => {
                setIsEditFormVisible(false);
                setCurrentDirector(null);
              }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {directors.map((director) => (
            <DirectorCard
              key={director.id}
              director={director}
              onEdit={openEditForm}
            />
          ))}
        </div>

        {directors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No directors found. Add your first director!
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
