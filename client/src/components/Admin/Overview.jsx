import React, { useEffect, useState } from "react";
import api from "../../config/api";
import { FaUser, FaCalendarCheck, FaMoneyBillWave, FaConciergeBell } from "react-icons/fa";

const Overview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    activeBanquets: 0,
    pendingQueries: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        setStats(res.data.data);
      } catch (error) {
        console.error("Failed to fetch stats");
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "Total Users", value: stats.totalUsers, icon: <FaUser />, color: "bg-blue-500" },
    { title: "Total Bookings", value: stats.totalBookings, icon: <FaCalendarCheck />, color: "bg-green-500" },
    { title: "Total Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, icon: <FaMoneyBillWave />, color: "bg-yellow-500" },
    { title: "Active Banquets", value: stats.activeBanquets, icon: <FaConciergeBell />, color: "bg-purple-500" },
  ];

  return (
    <div className="p-6 bg-[#FFF5F0] min-h-[87vh]">
       <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FFB79A] to-[#C23B22] bg-clip-text text-transparent mb-8">Dashboard Overview</h1>
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         {cards.map((card, index) => (
           <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-[#FFD1BA] flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{card.value}</h3>
              </div>
              <div className={`p-4 rounded-full text-white ${card.color} opacity-80`}>
                <span className="text-xl">{card.icon}</span>
              </div>
           </div>
         ))}
       </div>

       {/* Recent Activity Section could go here */}
       <div className="bg-white p-6 rounded-xl shadow-sm border border-[#FFD1BA]">
         <h2 className="text-xl font-bold mb-4 text-gray-800">Welcome to Admin Dashboard</h2>
         <p className="text-gray-600">Here you can manage all aspects of your event planning platform. Use the sidebar to navigate between different modules.</p>
       </div>
    </div>
  );
};

export default Overview;