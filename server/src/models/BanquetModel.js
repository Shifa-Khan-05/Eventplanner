import mongoose from "mongoose";

const banquetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Banquet name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
    },
    type: {
      type: String,
      enum: ["Hall", "Garden"],
      default: "Hall",
    },
    pricePerPlate: {
      type: Number,
      required: [true, "Price per plate is required"],
    },
    rentalPrice: { // Base price for the venue without food
       type: Number,
       default: 0
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String], // Array of image URLs
      default: [],
    },
    contactPhone: {
      type: String,
      required: [true, "Contact phone is required"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: String,
        rating: Number,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Banquet = mongoose.model("Banquet", banquetSchema);

export default Banquet;
