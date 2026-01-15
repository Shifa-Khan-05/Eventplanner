import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/sklogo.png";
import { IoHome } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLogin, isAdmin } = useAuth();

  const isGallery = location.pathname === "/Gallery";

  const handleClick = () => {
    isAdmin ? navigate("/AdminPanel") : navigate("/CustomerDashboard");
  };

  return (
    <div className="bg-transparent sticky top-0 z-50">
      <div
        className={`flex items-center justify-center gap-8 px-6 py-2 
        font-serif text-lg font-semibold transition-colors duration-300
        ${isGallery ? "text-[#F5F1E8]" : "text-red-950"}`}
      >
        {/* Home */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:text-amber-600 transition"
        >
          <IoHome /> Home
        </Link>

        {/* About */}
        <Link
          to="/About"
          className="hover:text-amber-600 transition"
        >
          About
        </Link>

        {/* Gallery */}
        <Link
          to="/Gallery"
          className={`transition ${
            isGallery
              ? "text-amber-400"
              : "hover:text-amber-600"
          }`}
        >
          Gallery
        </Link>

        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="SK Events" className="w-24" />
        </Link>

        {/* Services */}
        <div className="relative group">
          <button className="hover:text-amber-600 transition">
            Services
          </button>

          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-48 
            bg-white/50 backdrop-blur-lg shadow-xl rounded-lg 
            opacity-0 invisible group-hover:opacity-100 
            group-hover:visible transition-all duration-300 
            border-t-4 border-amber-500"
          >
            <Link to="/banquets" className="block px-4 py-2 hover:bg-red-200">
              Banquets
            </Link>
            <Link to="/caterings" className="block px-4 py-2 hover:bg-red-200">
              Catering
            </Link>
            <Link to="/decorations" className="block px-4 py-2 hover:bg-red-200">
              Decorations
            </Link>
            <Link
              to="/plan-event"
              className="block px-4 py-2 bg-red-50 font-bold text-amber-600"
            >
              ✨ Plan Event
            </Link>
          </div>
        </div>

        {/* Login / User */}
        {isLogin ? (
          <div
            onClick={handleClick}
            className="flex items-center gap-2 cursor-pointer 
            hover:bg-white/30 px-3 py-1 rounded-full transition"
          >
            <img
              src={user.photo}
              alt="User"
              className="h-8 w-8 rounded-full border border-amber-500 object-cover"
            />
            <span className="text-lg font-semibold">{user.fname}</span>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-amber-500/90 text-white px-4 py-1.5 
            rounded-full text-lg font-semibold 
            hover:bg-amber-600 transition"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
