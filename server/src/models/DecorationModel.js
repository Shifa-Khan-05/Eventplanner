import mongoose from "mongoose";

const decorationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Decoration name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    type: {
      type: String,
      enum: ["Theme", "Floral", "Lighting", "Stage", "Full Package"],
      default: "Full Package",
    },
    images: {
      type: [String],
      default: [],
    },
    contactPhone: { // For the vendor
      type: String, 
    },
    rating: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const Decoration = mongoose.model("Decoration", decorationSchema);
export default Decoration;
