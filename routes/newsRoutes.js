// routes/newsRoutes.js
import express from 'express';
import {
  getAllNews,
  addNews,
  updateNews,
  deleteNews
} from '../controllers/newsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getAllNews);
router.post('/',protect, upload.single("news_image"), addNews);
router.put('/:id',protect, upload.single("news_image"), updateNews);   // For editing a news item
router.delete('/:id',protect, deleteNews); // For deleting a news item

export default router;
