// server.js or index.js
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import serverless from 'serverless-http';

import sequelize from './config/db.js'; // Sequelize instance
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import newsRoutes from "./routes/newsRoutes.js"
import contactRoutes from './routes/contactRoutes.js'
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/contact', contactRoutes);
app.get("/", (req, res)=>{
  res.send("Express App is Running...");
})
app.get("/health", (req, res)=>{
  res.send("Express App is Running...");
})

// // Test DB connection
// try {
//   await sequelize.authenticate();
//   console.log('✅ PostgreSQL connected via Sequelize'); 

//   await sequelize.sync({ alter: true, force: false }); // `force: false` by default
//   console.log('✅ Database synced');
// } catch (err) {
//   console.error('❌ Unable to connect or sync DB:', err);
// }

// Only initialize DB when NOT in Lambda
if (process.env.IS_OFFLINE || process.env.NODE_ENV !== 'production') {
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('✅ PostgreSQL connected via Sequelize');
      await sequelize.sync({ alter: true });
      console.log('✅ Database synced');
    } catch (err) {
      console.error('❌ DB error:', err);
    }
  })();
}

// Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

export const handler = serverless(app);

