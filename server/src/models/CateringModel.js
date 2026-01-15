import mongoose from "mongoose";

const cateringSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Catering service name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    menuType: {
      type: String, // e.g., "Veg", "Non-Veg", "Mixed"
      required: true,
    },
    pricePerPlate: {
      type: Number,
      required: true,
    },
    items: {
      type: [String], // List of dishes
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    contactPhone: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Catering = mongoose.model("Catering", cateringSchema);
export default Catering;
