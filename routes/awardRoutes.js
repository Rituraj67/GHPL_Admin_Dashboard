import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import {
  getAllAwards,
  createAward,
  updateAward,
  deleteAward
} from '../controllers/awardController.js';

const router = express.Router();

router.get('/', getAllAwards);
router.post('/', protect, upload.single("image"), createAward);
router.put('/:id', protect, upload.single("image"), updateAward);
router.delete('/:id', protect, deleteAward);

export default router;
