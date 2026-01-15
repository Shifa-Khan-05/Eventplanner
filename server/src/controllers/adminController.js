import { response } from "express";
import Contact from "../models/contactModel.js";
import User from "../models/userModel.js";
import Booking from "../models/BookingModel.js";
import Banquet from "../models/BanquetModel.js";
import sendEmail from "../utils/sendEmail.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.estimatedDocumentCount();
    const totalBookings = await Booking.countDocuments();
    const activeBanquets = await Banquet.countDocuments();
    const pendingQueries = await Contact.countDocuments({ status: "Pending" });
    
    // Calculate Revenue (simple sum of all bookings)
    const revenueAgg = await Booking.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    res.status(200).json({
      data: {
        totalUsers,
        totalBookings,
        activeBanquets,
        pendingQueries,
        totalRevenue
      }
    });
  } catch (error) {
    next(error);
  }
};

export const GetAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ message: "All Contacts Fetched", data: contacts });
  } catch (error) {
    next(error);
  }
};

export const UpdateContacts = async (req, res, next) => {
  try {
    const QueryId = req.params.Qid;
    const { status, reply } = req.body;

    const updatedQuery = await Contact.findByIdAndUpdate(
      QueryId,
      {
        status,
        reply,
      },
      { new: true }
    );

    const statusColors = {
      Pending: "#f0ad4e",
      Resolved: "#5cb85c",
      Rejected: "#d9534f",
    };
    const mailBody = `
     <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
    <div style="max-width: 600px; background-color: #ffffff; margin: 0 auto; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 30px;">
      <h2 style="color: #333333;">Message Status Notification</h2>

      <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> <span style="color: #000;">${
        updatedQuery.name
      }</span></p>

      <p style="margin: 10px 0;"><strong style="color: #555;">Phone:</strong> <span style="color: #000;">${
        updatedQuery.phn
      }</span></p>

      <p style="margin: 10px 0;"><strong style="color: #555;">Original Message:</strong><br />
        <span style="color: #000;">${updatedQuery.msg}</span>
      </p>

      <p style="margin: 10px 0;"><strong style="color: #555;">Festive Flair Reply:</strong><br />
        <span style="color: #000;">${updatedQuery.reply}</span>
      </p>

       <p style="margin: 10px 0;"><strong style="color: #555;">Note:</strong>
        <span style="color: #000;">Please Contact Again if Required.</span>
      </p>

      <p style="margin: 10px 0;">
        <strong style="color: #555;">Status:</strong>
        <span style="display: inline-block; padding: 6px 12px; font-weight: bold; border-radius: 5px; color: #fff; background-color: ${
          statusColors[updatedQuery.status]
        };">
          ${updatedQuery.status}
        </span>
      </p>

      
      <p style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
        © ${new Date().getFullYear()} Festive Flair Event Planner PVT. LTD. | All rights reserved.
      </p>
    </div>
  </div>
    `;

    const MailStatus = await sendEmail(
      updatedQuery.email,
      updatedQuery.subject,
      mailBody
    );

    if (!MailStatus) {
      console.log("Error Sending Email");
    }

    res.status(200).json({ message: "Contact Updated", data: updatedQuery });
  } catch (error) {
    next(error);
  }
};