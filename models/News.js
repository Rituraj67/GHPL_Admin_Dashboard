// models/News.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // your Sequelize instance

const News = sequelize.define('News', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'news',
  timestamps: false,
});

export default News;
