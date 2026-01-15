import express from "express";
import {
  createBooking,
  getAllBookings,
  getMyBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected Routes
router.post("/", Protect, createBooking);
router.get("/my-bookings", Protect, getMyBookings);

// Admin Routes (Should implement IsAdmin middleware ideally)
router.get("/all", Protect, getAllBookings);
router.put("/:id/status", Protect, updateBookingStatus);

export default router;
