import express from "express";
import { addUser, logoutUser, refreshLogin, sendOtpToEmail, verifyOtp } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/send-otp", sendOtpToEmail);
router.post("/verify-otp", verifyOtp);
router.post("/refresh", protect, refreshLogin );
router.post("/logout", protect, logoutUser );
// Route: POST /api/users
router.post("/", addUser);

export default router;