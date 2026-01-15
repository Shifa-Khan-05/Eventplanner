import express from "express";
import {
  createDecoration,
  getAllDecorations,
  updateDecoration,
  deleteDecoration,
} from "../controllers/decorationController.js";
import { Protect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const upload = multer();
const router = express.Router();

// Public
router.get("/", getAllDecorations);

// Protected (Admin)
router.post("/", Protect, upload.array("images", 5), createDecoration);
router.put("/:id", Protect, upload.array("images", 5), updateDecoration);
router.delete("/:id", Protect, deleteDecoration);

export default router;
