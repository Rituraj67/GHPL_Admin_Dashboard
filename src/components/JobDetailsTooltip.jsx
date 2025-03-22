export default function JobDetailsTooltip({ job }) {

  if (!job) return null;

  return (
    <div className="absolute z-50 bg-white rounded-md shadow-lg border p-4 w-72 text-sm">
      <h3 className="font-bold text-base mb-2">
        {job.title || "Untitled Job"} <span className="text-gray-500">(ID: {job.id})</span>
      </h3>
      <div className="space-y-2">
        <div>
          <span className="font-medium">Department:</span>{" "}
          {job.department || "Not specified"}
        </div>
        <div>
          <span className="font-medium">Location:</span>{" "}
          {job.location || "Not specified"}
        </div>
        <div>
          <span className="font-medium">Type:</span>{" "}
          {job.employmentType || "Not specified"}
        </div>
        <div>
          <span className="font-medium">Posted:</span>{" "}
          {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Unknown"}
        </div>
      </div>
    </div>
  );
}
