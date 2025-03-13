import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { addProduct, getProducts, updateProduct } from "../controllers/productController.js";
const router = express.Router();

router.post("/add", protect, upload.array("product_images", 5), addProduct);
router.put("/:id", protect, upload.array("product_images", 5),  updateProduct);
router.get("/", getProducts);

export default router;