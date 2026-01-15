import express from "express";
import {
  createCatering,
  getAllCatering,
  updateCatering,
  deleteCatering,
} from "../controllers/cateringController.js";
import { Protect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const upload = multer();
const router = express.Router();

// Public
router.get("/", getAllCatering);

// Protected (Admin)
router.post("/", Protect, upload.array("images", 5), createCatering);
router.put("/:id", Protect, upload.array("images", 5), updateCatering);
router.delete("/:id", Protect, deleteCatering);

export default router;
