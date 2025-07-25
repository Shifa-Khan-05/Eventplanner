import React, { useState } from "react";
import image from "../pages/image/pic8.jpg";
import logo from "../pages/image/sklogo.png";
import image2 from "../pages/image/pic9.jpg";
import logo2 from "../pages/image/loc.png";
import logo3 from "../pages/image/eml.png";
import logo4 from "../pages/image/phn.png";
import api from "../../config/api";
import toast from "react-hot-toast";

function Contact (){
  const [submitdata, setsubmitdata] = useState({
    name: "",
    email: "",
    msg: "",
    budget: "",
  });

  const handelchange = (e) => {
    const { name, value } = e.target;
    setsubmitdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", submitdata);

    try {
      const res = await api.post("/public/ContactUs", submitdata);
      toast.success(res.data.message || "Message sent successfully!");
      setsubmitdata({
        name: "",
        email: "",
        msg: "",
        budget: "",
      });
    } catch (error) {
      toast.error(
        `Error: ${error.response?.status || error.message} | ${
          error.response?.data.message || "Something went wrong"
        }`
      );
    }
  };

  return (
    <>
      <div className="">
        <img
          src={image}
          className="w-full h-180 opacity-80 -mt-40 absolute"
          alt=""
        />
        <div className="absolute text-6xl font-bold font-serif text-red-950 italic ml-150 mt-20">
          Contact Us-
        </div>
      </div>

      <div className="w-300 ml-40 h-100 mt-60 absolute bg-red-300">
        <br />
        <div className="w-30 -mt-4 ml-140">
          <img src={logo} alt="" />
        </div>
        <div className="flex gap-20 justify-center items-center text-red-950 italic font-serif">
          <div className="text-4xl -mt-10">
            <img src={logo2} className="w-34 ml-20" alt="" />
            Physical Address
            <div className="text-white text-xl -ml-7">
              Ayodhya Bypass Road Chhattisgarh <br />
              <div className="ml-30">colony</div>
            </div>
          </div>

          <div className="text-4xl -mt-17">
            <img src={logo3} className="w-34 ml-13" alt="" />
            Email Address
            <div className="text-white text-xl -ml-2">
              sheikhshifa748@gmail.com
            </div>
          </div>

          <div className="-mt-17 text-4xl">
            <img src={logo4} className="w-34 ml-13" alt="" />
            Phone Number
            <div className="text-white text-xl ml-15">6265672254</div>
          </div>
        </div>
      </div>

      <div className="flex bg-red-100 w-300 mt-190 ml-40 absolute h-screen">
        <div className="w-150 bg-amber-200">
          <img src={image2} className="absolute w-150 h-screen" alt="" />
        </div>

        <div>
          <div className="text-red-950 text-4xl font-bold font-serif mt-15 ml-10">
            Let's chat
          </div>

          <div>
            <input
              type="text"
              name="name"
              value={submitdata.name}
              onChange={handelchange}
              className="bg-white ml-10 mt-10 w-120 p-4 rounded-2xl"
              placeholder="Enter your Name"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={submitdata.email}
              onChange={handelchange}
              className="bg-white ml-10 mt-10 w-120 p-4 rounded-2xl"
              placeholder="Enter your Email"
            />
          </div>

          <div className="text-gray-500 bg-white ml-10 mt-10 w-120 p-4 rounded-2xl">
            <select
              className="w-110"
              name="budget"
              value={submitdata.budget}
              onChange={handelchange}
            >
              <option value="">Budget</option>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="Tertiary">Tertiary</option>
            </select>
          </div>

          <div>
            <textarea
              className="bg-white ml-10 text-gray-600 mt-10 w-120 p-4 rounded-2xl"
              placeholder="Message"
              name="msg"
              value={submitdata.msg}
              onChange={handelchange}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-30 h-13 text-gray-600 rounded-2xl mt-10 ml-55 bg-white hover:bg-red-300 hover:text-white"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="w-full h-5 bg-white mt-390"></div>
    </>
  );
};

export default Contact;
