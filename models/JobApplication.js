import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Job from "./Job.js"; // Assuming you have a Job model already

const JobApplication = sequelize.define("JobApplication", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  introduction: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  resume: {
    type: DataTypes.STRING, // You can store a URL/path of the uploaded file
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "rejected", "accepted"),
    allowNull: false,
    defaultValue: "pending",
  }
});

// Define the relationship (JobApplication belongs to Job)
JobApplication.belongsTo(Job, {
  foreignKey: {
    name: "jobId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

// Optionally if Job has a one-to-many relationship
Job.hasMany(JobApplication, { foreignKey: "jobId" });

export default JobApplication;
