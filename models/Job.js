import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Job = sequelize.define("Job", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employmentType: {
    type: DataTypes.ENUM(
      "Full-time",
      "Part-time",
      "Internship",
      "Contract",
    ),
    allowNull: false,
    defaultValue: "Full-time",
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  qualifications: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

export default Job;
