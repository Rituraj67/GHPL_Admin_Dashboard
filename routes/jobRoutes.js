// routes/jobRoutes.js
import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/",protect, createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.put("/:id", protect,  updateJob);
router.delete("/:id",protect, deleteJob);

export default router;
