import { DataTypes } from "sequelize";
import sequelize from "./index.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING,  allowNull: false },
  otp: { type: DataTypes.STRING, defaultValue: null },
  otpExpiresAt: {
    type: DataTypes.DATE,
  },
  isAuthorized: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default User;
