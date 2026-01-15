import React, { useState, useEffect } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

const CustomerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const res = await api.get("/feedback");
      setFeedbacks(res.data.data);
    } catch (error) {
      toast.error("Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="p-6 bg-[#FFF5F0] min-h-[87vh]">
      <h1 className="text-3xl font-bold text-[#C23B22] mb-6">Customer Feedback</h1>
      
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((f) => (
            <div key={f._id} className="bg-white p-6 rounded-xl shadow-sm border border-[#FFD1BA]">
              <div className="flex items-center gap-3 mb-4">
                <img src={f.user?.photo || "https://via.placeholder.com/40"} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                   <h3 className="font-bold text-gray-800">{f.user?.fname || "Anonymous"}</h3>
                   <div className="flex text-yellow-400">
                     {[...Array(5)].map((_, i) => (
                       <FaStar key={i} className={i < f.rating ? "text-yellow-400" : "text-gray-300"} />
                     ))}
                   </div>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{f.comment}</p>
              <div className="text-xs text-gray-400 mt-2">
                 Service: {f.serviceType} | {new Date(f.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerFeedback;