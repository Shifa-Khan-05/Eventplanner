import React, { useState, useEffect } from "react";
import api from "../../config/api";
import { FaBookmark, FaClock, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Overview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
        // Since we don't have a specific user stats endpoint, we can derive it from bookings
        try {
            const res = await api.get("/booking/my-bookings");
            const bookings = res.data.data;
            setStats({
                total: bookings.length,
                pending: bookings.filter(b => b.status === "Pending").length,
                confirmed: bookings.filter(b => b.status === "Confirmed").length,
            });
        } catch (error) {
            console.error("Error fetching stats");
        }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.fname}!</h1>
        <p className="text-gray-600">Here's what's happening with your events.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 flex items-center justify-between">
            <div>
                <p className="text-gray-500 font-medium">Total Bookings</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.total}</h3>
            </div>
            <FaBookmark className="text-4xl text-blue-100" />
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 flex items-center justify-between">
            <div>
                <p className="text-gray-500 font-medium">Pending Approval</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.pending}</h3>
            </div>
            <FaClock className="text-4xl text-yellow-100" />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 flex items-center justify-between">
            <div>
                <p className="text-gray-500 font-medium">Confirmed Events</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.confirmed}</h3>
            </div>
            <FaCheckCircle className="text-4xl text-green-100" />
        </div>
      </div>
      
      {/* Quick Action? */}
    </div>
  );
};

export default Overview;