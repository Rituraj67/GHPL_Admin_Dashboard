"use client";

import { useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import MilestoneForm from "../../components/MilestoneForm";
import MilestoneCard from "../../components/MilestoneCard";
import { useMilestones } from "../../context/MilestoneContext";

export default function AdminMilestones() {
  const { milestones, addMilestone, updateMilestone } = useMilestones();
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState(null);

  // Sort milestones by year (newest first)
  const sortedMilestones = [...milestones].sort((a, b) => b.year - a.year);

  const handleAddMilestone = (newMilestone) => {
    if (!newMilestone) {
      setIsAddFormVisible(false);
      return;
    }
    addMilestone(newMilestone);
    setIsAddFormVisible(false);
  };

  const handleEditMilestone = (updatedMilestone) => {
    if (!updatedMilestone) {
      setIsEditFormVisible(false);
      setCurrentMilestone(null);
      return;
    }
    updateMilestone(updatedMilestone);
    setIsEditFormVisible(false);
    setCurrentMilestone(null);
  };

  const openEditForm = (milestone) => {
    if (isAddFormVisible) {
      setIsAddFormVisible(false);
    }
    setCurrentMilestone(milestone);
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
          <h1 className="text-3xl font-bold">Milestones</h1>
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
            Add Milestone
          </button>
        </div>

        {/* Add Milestone Form */}
        {isAddFormVisible && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-bold mb-4">Add New Milestone</h2>
            <MilestoneForm
              onSubmit={handleAddMilestone}
              onCancel={() => setIsAddFormVisible(false)}
              //   onCancel={() => setIsAddFormVisible(false)}
            />
          </div>
        )}

        {/* Edit Milestone Form */}
        {isEditFormVisible && currentMilestone && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-bold mb-4">Edit Milestone</h2>
            <MilestoneForm
              initialData={currentMilestone}
              onSubmit={handleEditMilestone}
              isEditing={true}
              onCancel={() => {
                setIsEditFormVisible(false);
                setCurrentMilestone(null);
              }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMilestones.map((milestone) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              onEdit={openEditForm}
            />
          ))}
        </div>

        {milestones.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No milestones found. Add your first milestone!
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
