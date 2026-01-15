import React from "react";
import {
  FaTachometerAlt,
  FaBoxes,
  FaUsers,
  FaCalendarCheck,
  FaQuestionCircle,
  FaCommentDots,
  FaSignOutAlt,
  FaPaintBrush,
} from "react-icons/fa";
import { GiCook } from "react-icons/gi";

import api from "../../config/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ active, setActive }) => {
  const { setUser, setIsLogin, setIsAdmin } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await api.get("/auth/logout");
    setUser("");
    sessionStorage.removeItem("EventUser");
    setIsLogin(false);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <>
      <div className="w-100 bg-gradient-to-b from-[#FFF5F0] to-[#FFE7D1] border-r border-[#FFD1BA] min-h-[87vh] p-6 flex flex-col justify-between shadow-lg">
        <div>
          <div className="border-b-2 border-[#FFD1BA] pb-4 h-fit text-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#FFB79A] to-[#C23B22] bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </div>

          <div className="py-8 px-2">
            <ul className="grid gap-3">
              <li
                className={`flex items-center gap-3 border border-[#FFD1BA] p-4 rounded-xl text-lg font-medium cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-[#FFD1BA] hover:to-[#E55353] hover:text-white hover:shadow-md hover:scale-105 ${
                  active === "overview" &&
                  "bg-gradient-to-r from-[#FFD1BA] to-[#E55353] text-white shadow-md scale-105"
                }`}
                onClick={() => setActive("overview")}
              >
                <FaTachometerAlt className="text-xl" /> Overview
              </li>
              <li
                className={`flex items-center gap-3 border border-[#FFD1BA] p-4 rounded-xl text-lg font-medium cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-[#FFD1BA] hover:to-[#E55353] hover:text-white hover:shadow-md hover:scale-105 ${
                  active === "packages" &&
                  "bg-gradient-to-r from-[#FFD1BA] to-[#E55353] text-white shadow-md scale-105"
                }`}
                onClick={() => setActive("BanquetHall")}
              >
                <FaBoxes className="text-xl" /> BanquetHall
              </li>
              <li
                className={`flex items-center gap-3 border border-[#FFD1BA] p-4 rounded-xl text-lg font-medium cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-[#FFD1BA] hover:to-[#E55353] hover:text-white hover:shadow-md hover:scale-105 ${
                  active === "CateringService" &&
                  "bg-gradient-to-r from-[#FFD1BA] to-[#E55353] text-white shadow-md scale-105"
                }`}
                onClick={() => setActive("CateringService")}
              >
                <GiCook className="text-xl" /> CateringService
              </li>
              <li
                className={`flex items-center gap-3 border border-[#FFD1BA] p-4 rounded-xl text-lg font-medium cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-[#FFD1BA] hover:to-[#E55353] hover:text-white hover:shadow-md hover:scale-105 ${
                  active === "DecorationManagement" &&
                  "bg-gradient-to-r from-[#FFD1BA] to-[#E55353] text-white shadow-md scale-105"
                }`}
                onClick={() => setActive("DecorationManagement")}
              >
                <FaPaintBrush className="text-xl" /> Decorations
              </li>

              <li
                className={`flex items-center gap-3 border border-[#FFD1BA] p-4 rounded-xl text-lg font-medium cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-[#FFD1BA] hover:to-[#E55353] hover:text-white hover:shadow-md hover:scale-105 ${
                  active === "customers" &&
                  "bg-gradient-to-r from-[#FFD1BA] to-[#E55353] text-white shadow-md scale-105"
                }`}
                onClick={() => setActive("customers")}
              >
                <FaUsers className="text-xl" /> Customers
              </li>
              <li
                className={`flex items-center gap-3 border border-[#FFD1BA] p-4 rounded-xl text-lg font-medium cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-[#FFD1BA] hover:to-[#E55353] hover:text-white hover:shadow-md hover:scale-105 ${
                  active === "bookings" &&
                  "bg-gradient-to-r from-[#FFD1BA] to-[#E55353] text-white shadow-md scale-105"
                }`}
                onClick={() => setActive("bookings")}
              >
                <FaCalendarCheck className="text-xl" /> Bookings
              </li>
              <li
                className={`flex items-center gap-3 border border-[#FFD1BA] p-4 rounded-xl text-lg font-medium cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-[#FFD1BA] hover:to-[#E55353] hover:text-white hover:shadow-md hover:scale-105 ${
                  active === "cusQueries" &&
                  "bg-gradient-to-r from-[#FFD1BA] to-[#E55353] text-white shadow-md scale-105"
                }`}
                onClick={() => setActive("cusQueries")}
              >
                <FaQuestionCircle className="text-xl" /> Customer Queries
              </li>
              <li
                className={`flex items-center gap-3 border border-[#FFD1BA] p-4 rounded-xl text-lg font-medium cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-[#FFD1BA] hover:to-[#E55353] hover:text-white hover:shadow-md hover:scale-105 ${
                  active === "cusFeedback" &&
                  "bg-gradient-to-r from-[#FFD1BA] to-[#E55353] text-white shadow-md scale-105"
                }`}
                onClick={() => setActive("cusFeedback")}
              >
                <FaCommentDots className="text-xl" /> Customer Feedback
              </li>
            </ul>
          </div>
        </div>
        <div>
          <button
            className="text-lg text-[#C23B22] font-semibold w-full border-2 border-[#FFD1BA] p-4 rounded-xl flex gap-3 items-center justify-center hover:bg-gradient-to-r hover:from-[#FFD1BA] hover:to-[#E55353] hover:text-white hover:border-[#E55353] transition-all duration-300 hover:shadow-lg bg-[#FFF5F0]"
            onClick={handleLogout}
          >
            Logout
            <FaSignOutAlt className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
