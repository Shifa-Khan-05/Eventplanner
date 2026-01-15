import express from "express";
import {
  createBanquet,
  getAllBanquets,
  getBanquetById,
  updateBanquet,
  deleteBanquet,
} from "../controllers/banquetController.js";
import { Protect } from "../middlewares/authMiddleware.js"; // Assuming you want protection
import multer from "multer";

const upload = multer();
const router = express.Router();

// Public routes
router.get("/", getAllBanquets);
router.get("/:id", getBanquetById);

// Protected routes (Only admin or registered users can create? Let's assume generic protection for now, or check role inside controller)
router.post("/", Protect, upload.array("images", 5), createBanquet);
router.put("/:id", Protect, upload.array("images", 5), updateBanquet);
router.delete("/:id", Protect, deleteBanquet);

export default router;
