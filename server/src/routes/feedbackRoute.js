import express from "express";
import {
  createFeedback,
  getAllFeedback,
} from "../controllers/feedbackController.js";
import { Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllFeedback);
router.post("/", Protect, createFeedback);

export default router;
