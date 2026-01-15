import React, { useState } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";
import { FaStar, FaPaperPlane } from "react-icons/fa";

const Feedback = () => {
  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
    serviceType: "General",
  });
  const [hover, setHover] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/feedback", formData);
      toast.success("Thank you for your feedback!");
      setFormData({ rating: 5, comment: "", serviceType: "General" });
    } catch (error) {
      toast.error("Failed to submit feedback");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">We Value Your Feedback</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <label className="text-gray-600 mb-2 font-medium">Rate your experience</label>
            <div className="flex gap-2">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setFormData({ ...formData, rating: ratingValue })}
                      className="hidden"
                    />
                    <FaStar
                      className="cursor-pointer transition-colors duration-200"
                      color={ratingValue <= (hover || formData.rating) ? "#ffc107" : "#e4e5e9"}
                      size={40}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <div>
             <label className="block text-gray-700 font-medium mb-1">Service Type</label>
             <select 
               className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-amber-400"
               value={formData.serviceType}
               onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
             >
                <option value="General">General Platform</option>
                <option value="Banquet">Banquet Service</option>
                <option value="Catering">Catering Service</option>
             </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Your Comments</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-amber-400 min-h-[120px]"
              placeholder="Tell us what you liked or how we can improve..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-amber-600 hover:to-orange-700 transition shadow-md flex justify-center items-center gap-2"
          >
            <FaPaperPlane /> Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;