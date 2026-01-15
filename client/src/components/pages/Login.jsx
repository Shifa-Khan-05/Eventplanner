import React, { useState } from "react";
import image from "../pages/image/pic6.jpg";
import api from "../../config/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsLogin, setIsAdmin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitKro = async (e) => {
    e.preventDefault();

    const logindata = {
      email,
      password,
    };

    try {
      const res = await api.post("/auth/login", logindata);

      toast.success(res.data.message);

      setUser(res.data.data);
      sessionStorage.setItem(
        "EventUser",
        JSON.stringify(res.data.data)
      );

      setIsLogin(true);

      if (res.data.data.role === "Admin") {
        setIsAdmin(true);
        navigate("/AdminPanel");
      } else {
        navigate("/CustomerDashboard");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(
        `Error: ${error.response?.status || error.message} | ${
          error.response?.data?.message || ""
        }`
      );
      console.log(error);
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

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 animate-fade-in-up">
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">
            Welcome Back
          </h2>
          <p className="text-gray-200 text-sm">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={formSubmitKro} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-1 pl-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-white/20 border border-white/10 text-white placeholder-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent p-2.5 outline-none transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg text-sm px-5 py-3 shadow-lg transform transition hover:scale-[1.02] active:scale-95 focus:ring-4 focus:ring-amber-300"
          >
            Login
          </button>

          {/* Register */}
          <div className="text-gray-200 text-sm text-center mt-6">
            <span>Don't have an account? </span>
            <a
              href="/Register"
              className="font-semibold text-amber-400 hover:text-amber-300 underline transition"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
