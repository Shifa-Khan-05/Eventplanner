import Feedback from "../models/FeedbackModel.js";

export const createFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({ message: "Feedback Submitted", data: feedback });
  } catch (error) {
    next(error);
  }
};

export const getAllFeedback = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "fname photo");
    res.status(200).json({ data: feedbacks });
  } catch (error) {
    next(error);
  }
};
