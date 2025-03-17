import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import {
  getAllMilestones,
  createMilestone,
  updateMilestone,
  deleteMilestone,
} from '../controllers/milestoneController.js';

const router = express.Router();

router.get('/', getAllMilestones);
router.post('/', protect, upload.single("image"), createMilestone);
router.put('/:id', protect, upload.single("image"), updateMilestone);
router.delete('/:id', protect, deleteMilestone);

export default router;
