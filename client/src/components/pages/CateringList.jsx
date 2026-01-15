import React, { useEffect, useState } from "react";
import api from "../../config/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CateringList = () => {
  const [caterings, setCaterings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCaterings = async () => {
    try {
      const res = await api.get("/catering");
      setCaterings(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch catering services");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaterings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Exquisite Catering
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caterings.map((catering) => (
            <div
              key={catering._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={
                    catering.images && catering.images.length > 0
                      ? catering.images[0]
                      : "https://placehold.co/600x400?text=Catering"
                  }
                  alt={catering.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold text-gray-900 truncate">
                    {catering.name}
                  </h2>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                    {catering.menuType}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {catering.description}
                </p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-lg font-bold text-green-600">
                    ₹{catering.pricePerPlate} <span className="text-sm text-gray-400 font-normal">/plate</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {caterings.length === 0 && (
           <div className="text-center text-gray-500 mt-10">
              <p className="text-xl">No catering services found.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default CateringList;
