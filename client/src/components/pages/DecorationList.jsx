import React, { useEffect, useState } from "react";
import api from "../../config/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const DecorationList = () => {
  const [decorations, setDecorations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDecorations = async () => {
    try {
      const res = await api.get("/decoration");
      setDecorations(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch decorations");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDecorations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Enchanting Decorations
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {decorations.map((decoration) => (
            <div
              key={decoration._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={
                    decoration.images && decoration.images.length > 0
                      ? decoration.images[0]
                      : "https://placehold.co/600x400?text=Decoration"
                  }
                  alt={decoration.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold text-gray-900 truncate">
                    {decoration.name}
                  </h2>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-semibold">
                    {decoration.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {decoration.description}
                </p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-lg font-bold text-purple-600">
                    ₹{decoration.price}
                  </span>
                  {/* Future: Add to Cart / Select for Builder */}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {decorations.length === 0 && (
           <div className="text-center text-gray-500 mt-10">
              <p className="text-xl">No decoration services found.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default DecorationList;
