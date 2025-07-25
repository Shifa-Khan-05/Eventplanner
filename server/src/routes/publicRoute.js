import express from "express";
import ContactUs from "../models/publicModel.js";

const router = express.Router();

router.post("/ContactUs", async (req, res) => {    
  const { name, email, msg, budget } = req.body;

  if (!name || !email) {
    return res
      .status(400)
      .json({ message: "Please fill all required fields." });
  }

  try {
    const newContact = new ContactUs({ name, email, msg, budget });
    await newContact.save();
    res.status(201).json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});

export default router;
