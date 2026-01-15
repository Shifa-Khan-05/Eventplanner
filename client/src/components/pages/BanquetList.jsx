import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import BookingModal from "./modals/BookingModal";

const BanquetList = () => {
  const navigate = useNavigate(); // Assume useNavigate is imported or will be
  const { isLogin } = useAuth();
  
  const [banquets, setBanquets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBanquet, setSelectedBanquet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNow = (banquet) => {
    if (!isLogin) {
      toast.error("Please login to proceed with booking");
      navigate("/login");
      return;
    }
    setSelectedBanquet(banquet);
    setIsModalOpen(true);
  };



  const fetchBanquets = async () => {
    try {
      const res = await api.get("/banquet");
      setBanquets(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch banquets");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanquets();
  }, []);



  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Our Premium Banquets
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {banquets.map((banquet) => (
            <div
              key={banquet._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={
                    banquet.images && banquet.images.length > 0
                      ? banquet.images[0]
                      : "https://placehold.co/600x400?text=No+Image"
                  }
                  alt={banquet.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold text-gray-900 truncate">
                    {banquet.name}
                  </h2>
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-semibold">
                    ⭐ {banquet.rating || "N/A"}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {banquet.description}
                </p>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <span>📍 {banquet.city}, {banquet.state}</span>
                </div>
                 <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span>👥 Capacity: {banquet.capacity}</span>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 gap-2">
                  <span className="text-lg font-bold text-amber-600">
                    ₹{banquet.pricePerPlate} <span className="text-sm text-gray-400 font-normal">/plate</span>
                  </span>
                  <div className="flex gap-2">
                    {/* <Link
                      to={`/banquet/${banquet._id}`}
                      className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                    >
                      Details
                    </Link> */}
                    <button
                      onClick={() => handleBookNow(banquet)}
                      className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition text-sm font-medium shadow-md"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {banquets.length === 0 && (
           <div className="text-center text-gray-500 mt-10">
              <p className="text-xl">No banquets found.</p>
           </div>
        )}

        <BookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          banquet={selectedBanquet} 
        />
      </div>
    </div>
  );
};

export default BanquetList;
