// models/Contact.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('New', 'Viewed', 'Replied'),
    defaultValue: 'New',
  },
}, {
  timestamps: true, // includes createdAt and updatedAt
});

export default Contact;
