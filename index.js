import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import serverless from "serverless-http";

import sequelize from "./config/db.js"; // Sequelize instance
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import testimonialRoute from "./routes/testimonialRoutes.js";
import milestoneRoute from "./routes/milestoneRoutes.js";
import awardRoute from "./routes/awardRoutes.js";
import directorRoute from "./routes/directorRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, postman, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/testimonial", testimonialRoute);
app.use("/api/milestone", milestoneRoute);
app.use("/api/award", awardRoute);
app.use("/api/director", directorRoute);
app.use("/api/jobs", jobRoutes);

// Health check
app.get("/", (req, res) => res.send("Express App is Running..."));
app.get("/health", (req, res) => res.send("Express App is Running..."));

// // Test DB connection
// try {
//   await sequelize.authenticate();
//   console.log('✅ PostgreSQL connected via Sequelize');

//   await sequelize.sync({ alter: true, force: false }); // force: false by default
//   console.log('✅ Database synced');
// } catch (err) {
//   console.error('❌ Unable to connect or sync DB:', err);
// }

// Only initialize DB when NOT in Lambda
if (process.env.IS_OFFLINE || process.env.NODE_ENV !== "production") {
  (async () => {
    try {
      await sequelize.authenticate();
      console.log("✅ PostgreSQL connected via Sequelize");
      await sequelize.sync({alter: true});
      console.log("✅ Database synced");
    } catch (err) {
      console.error("❌ DB error:", err);
    }
  })();
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
