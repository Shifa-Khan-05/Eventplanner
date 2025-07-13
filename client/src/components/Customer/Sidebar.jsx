import React from "react";
import {
  FaRegChartBar,
  FaBookOpen,
  FaUserCircle,
  FaLifeRing,
  FaCommentDots,
  FaUser,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import api from "../../config/api";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ active, setactive }) => {
  const menuItems = [
    { key: "overview", label: "Overview", icon: <FaRegChartBar /> },
    { key: "Booking", label: "Booking", icon: <FaBookOpen /> },
    { key: "Profile", label: "Profile", icon: <FaUserCircle /> },
    { key: "Support", label: "Support", icon: <FaLifeRing /> },
    { key: "Feedback", label: "Feedback", icon: <FaCommentDots /> },
  ];

  return (
    <div className="w-72 min-h-screen border p-5 shadow-md flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="pb-4 border-b border-red-400 mb-6">
          <h1 className="text-2xl font-extrabold text-red-700 ml-10">
            Customer's Dashboard
          </h1>
        </div>

        {/* Menu Items */}
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.key}
              onClick={() => setactive(item.key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-lg transition 
                ${
                  active === item.key
                    ? "bg-red-500 text-white font-semibold shadow"
                    : "hover:bg-red-300 hover:text-white"
                }`}
            >
              {item.icon}
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <div>
        <button
          className="w-full flex items-center justify-center gap-3 text-lg text-red-700 hover:bg-red-600 hover:text-white border border-red-400 px-4 py-3 rounded-lg transition font-bold"
          onClick={() => alert("Logout Clicked")}
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
