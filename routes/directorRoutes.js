import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import {
  getAllDirectors,
  createDirector,
  updateDirector,
  deleteDirector
} from '../controllers/directorController.js';

const router = express.Router();

router.get('/', getAllDirectors);
router.post('/', protect, upload.single("dp"), createDirector);
router.put('/:id', protect, upload.single("dp"), updateDirector);
router.delete('/:id', protect, deleteDirector);

export default router;
