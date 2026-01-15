import Booking from "../models/BookingModel.js";

// Create Booking
export const createBooking = async (req, res, next) => {
  try {
    const newBooking = await Booking.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({ message: "Booking Request Sent", data: newBooking });
  } catch (error) {
    next(error);
  }
};

// Get All Bookings (Admin)
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "fname email phn")
      .populate("banquet", "name")
      .populate("catering", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({ data: bookings });
  } catch (error) {
    next(error);
  }
};

// Get My Bookings (User)
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("banquet", "name")
      .populate("catering", "name");
    res.status(200).json({ data: bookings });
  } catch (error) {
    next(error);
  }
};

// Update Status (Admin)
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus },
      { new: true }
    );
     // TODO: Send email notification
    res.status(200).json({ message: "Booking Updated", data: booking });
  } catch (error) {
    next(error);
  }
};
