import React, { useState } from "react";
import api from "../../../config/api";
import toast from "react-hot-toast";
import { FaCalendarAlt, FaUsers, FaClipboardList, FaTimes } from "react-icons/fa";

const BookingModal = ({ isOpen, onClose, banquet }) => {
  const [formData, setFormData] = useState({
    eventDate: "",
    guests: "",
    specialRequests: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!banquet) return;

    try {
      const payload = {
        type: "Banquet",
        banquet: banquet._id,
        eventDate: formData.eventDate,
        guests: formData.guests,
        specialRequests: formData.specialRequests,
        totalAmount: banquet.pricePerPlate * formData.guests, // Rough estimate
      };

      await api.post("/booking", payload);
      toast.success("Booking request sent successfully!");
      onClose();
      setFormData({ eventDate: "", guests: "", specialRequests: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Book Banquet</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={24} />
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{banquet?.name}</h3>
          <p className="text-gray-500 mb-6">Price: ₹{banquet?.pricePerPlate} / plate</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Event Date</label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Number of Guests</label>
              <div className="relative">
                <FaUsers className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  min="1"
                  max={banquet?.capacity}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none"
                  placeholder={`Max ${banquet?.capacity}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Special Requests</label>
              <div className="relative">
                <FaClipboardList className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none"
                  placeholder="Any specific requirements..."
                  rows="3"
                ></textarea>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 flex justify-between">
                    <span>Estimated Total:</span>
                    <span className="font-bold text-lg">
                        ₹{(formData.guests * (banquet?.pricePerPlate || 0)).toLocaleString()}
                    </span>
                </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-amber-600 hover:to-orange-700 transition shadow-md"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
