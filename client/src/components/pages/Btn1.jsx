import React, { useState } from "react";
import image from "../pages/image/pic6.jpg";
import api from "../../config/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Btn1 = () => {
  const navigate = useNavigate();
  const { user, setUser, isLogin, setisLogin, isAdmin, setIsAdmin } = useAuth();

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
      setPassword("");
      setEmail("");
      setUser(res.data.data);
      sessionStorage.setItem("EventUser", JSON.stringify(res.data.data));
      setisLogin(true); 
      if (res.data.data.role === "Admin") {
        setIsAdmin(true);
        navigate("/adminpanel");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        `Error: ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
      console.log(error);
    }
  };

  return (
    
    <>

    <div className="w-full h-screen bg-amber-300 relative">
      <img
        className="w-full h-96 object-cover blur-sm"
        src={image}
        alt="Background"
      />
      <div className="w-[400px] bg-red-300 p-6 rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form onSubmit={formSubmitKro}>
          <h2 className="text-4xl text-white mb-5 text-center underline">Login</h2>

          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-amber-50 w-full p-3 rounded-sm mb-4"
            placeholder="Enter Your Email"
            required
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-amber-50 w-full p-3 rounded-sm mb-4"
            placeholder="Enter Your Password"
            required
          />

          <button
            className="bg-amber-50 w-full py-3 rounded-sm text-gray-700 hover:bg-amber-200 hover:text-black transition"
            type="submit"
          >
            Login
          </button>

          <div className="text-white text-md mt-4 text-center">
            <span>Don't have an account? </span>
            <a className="hover:text-blue-700 underline" href="/Register">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Btn1;
