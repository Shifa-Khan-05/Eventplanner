import mongoose from "mongoose";

const ContactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    msg: {
      type: String,
      required: true,
    },

    budget: {
      type: String,
      default: "N/A",
      enum: ["Primary", "Secondary", "Tertiary", "N/A"],
      required: true,
    },
  },
  { timestamps: true }
);

const ContactUs = mongoose.model("Contactus", ContactSchema);

export default ContactUs;
