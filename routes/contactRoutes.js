// routes/contactRoutes.js
import express from 'express';
import { getAllMessages, sendQuery, send_Reply, changeStatus } from '../controllers/contactController.js';
import {protect} from "../middleware/authMiddleware.js"
import { upload } from '../middleware/uploadMiddleware.js';


const router = express.Router();
router.post('/send-query', sendQuery); // ← New route
router.put('/mark-viewed/:id',protect,  changeStatus); // ← New route
router.post('/send-reply',protect, upload.array("attachments", 3) , send_Reply);
router.get('/',protect, getAllMessages);

export default router;
