import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Banquet", "Catering", "Both", "Custom"], // Added Custom
      required: true,
    },
    banquet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Banquet",
    },
    catering: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catering",
    },
    decoration: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Decoration",
    },
    customizations: {
        type: Map, // Flexible key-value pairs for specific choices
        of: String
    },
    eventDate: {
      type: Date,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    specialRequests: {
      type: String,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
