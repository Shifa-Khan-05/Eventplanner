import React, { useState } from "react";
import image from "../pages/image/pic6.jpg";
import api from "../../config/api";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    fname: "",
    email: "",
    password: "",
    phn: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { fname, email, password, phn } = registerData;

    if (!fname || !email || !password || !phn) {
      toast.error("Please fill in all fields");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (phn.length < 10) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await api.post("/auth/register", registerData);

      toast.success(res.data.message || "Registration successful!");

      setRegisterData({
        fname: "",
        email: "",
        password: "",
        phn: "",
      });

      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden flex items-center justify-center">
      
      {/* Background Image */}
      <img
        src={image}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 animate-fade-in-up">
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">
            Register
          </h2>
          <p className="text-gray-200 text-sm">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-1 pl-1">
              Full Name
            </label>
            <input
              type="text"
              name="fname"
              value={registerData.fname}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full bg-white/20 border border-white/10 text-white placeholder-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent p-2.5 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-1 pl-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              required
              className="w-full bg-white/20 border border-white/10 text-white placeholder-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent p-2.5 outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-1 pl-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full bg-white/20 border border-white/10 text-white placeholder-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent p-2.5 outline-none transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-1 pl-1">
              Phone
            </label>
            <input
              type="tel"
              name="phn"
              value={registerData.phn}
              onChange={handleChange}
              placeholder="+91 1234567890"
              required
              className="w-full bg-white/20 border border-white/10 text-white placeholder-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent p-2.5 outline-none transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg text-sm px-5 py-3 shadow-lg transform transition hover:scale-[1.02] active:scale-95 focus:ring-4 focus:ring-amber-300"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <div className="text-gray-200 text-sm text-center mt-6">
          <span>Already have an account? </span>
          <Link
            to="/login"
            className="font-semibold text-amber-400 hover:text-amber-300 underline transition"
          >
            Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;
