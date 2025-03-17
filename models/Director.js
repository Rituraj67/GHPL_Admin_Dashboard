import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Director = sequelize.define('Director', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'directors',
  timestamps: false,
});

export default Director;
