// routes/jobRoutes.js
import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  sendApplication,
  getAllApplications,
  rejectApplication,
  acceptApplication,
} from "../controllers/jobController.js";
import { upload } from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/:id', upload.single("resume"), sendApplication)
router.post("/",protect, createJob);
router.get('/applications', protect, getAllApplications);
router.get("/:id", getJobById);
router.get("/", getAllJobs);
router.put('/reject/:id', protect, rejectApplication )
router.put('/accept/:id', protect, acceptApplication )
router.put("/:id", protect,  updateJob);
router.delete("/:id",protect, deleteJob);


export default router;
