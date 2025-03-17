import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { createTestimonial, deleteTestimonial, getAllTestimonials, updateTestimonial } from '../controllers/testimonialController.js';

const router = express.Router();

router.get('/', getAllTestimonials);
router.post('/', protect, upload.single("dp"), createTestimonial);
router.put('/:id', protect, upload.single("dp"), updateTestimonial);
router.delete("/:id", protect, deleteTestimonial);

export default router;