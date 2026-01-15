import React, { useState } from "react";
import image from "../pages/image/pic8.jpg";
import logo from "../pages/image/sklogo.png";
import image2 from "../pages/image/pic9.jpg";
import logo2 from "../pages/image/loc.png";
import logo3 from "../pages/image/eml.png";
import logo4 from "../pages/image/phn.png";
import api from "../../config/api";
import toast from "react-hot-toast";

function Contact() {
  const [submitdata, setSubmitdata] = useState({
    name: "",
    email: "",
    subject: "",
    msg: "",
    phn: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmitdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!submitdata.name || !submitdata.email || !submitdata.msg) {
      toast.error("Please fill in Name, Email, and Message.");
      return;
    }

    console.log("Submitted Data:", submitdata);
    try {
      const res = await api.post("/public/ContactUs", submitdata);
      toast.success(res.data.message || "Message sent successfully!");
      setSubmitdata({
        name: "",
        email: "",
        subject: "",
        msg: "",
        phn: "",
      });
    } catch (error) {
      toast.error(
        `Error: ${error.response?.status || error.message} | ${
          error.response?.data?.message || "Something went wrong"
        }`
      );
    }
  };

  return (
    <>
      <div className="relative">
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
        <div className="w-30 ml-140">
          <img src={logo} alt="Logo"/>
        </div>
        <div className="flex gap-20 justify-center items-center text-red-950 italic font-serif">
          <div className="text-4xl -mt-10">
            <div className="flex items-start gap-2">
              <img src={logo2} className="w-8" alt="Location" />
              <div>
                <div className="font-semibold">Physical Address</div>
                <div className="text-white text-xl">
                  Ayodhya Bypass Road Chhattisgarh
                  <div>Colony</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-4xl -mt-17">
            <div className="flex items-start gap-2">
              <img src={logo3} className="w-8" alt="Email" />
              <div>
                <div className="font-semibold">Email Address</div>
                <div className="text-white text-xl">
                  sheikhshifa748@gmail.com
                </div>
              </div>
            </div>
          </div>

          <div className="-mt-17 text-4xl">
            <div className="flex items-start gap-2">
              <img src={logo4} className="w-8" alt="Phone" />
              <div>
                <div className="font-semibold">Phone Number</div>
                <div className="text-white text-xl">6265672254</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex bg-red-100 w-300 mt-190 ml-40 absolute h-screen">
        <div className="w-150 bg-amber-200 relative">
          <img
            src={image2}
            className="absolute w-150 h-screen object-cover"
            alt="Side visual"
          />
        </div>

        <div className="p-6">
          <div className="text-red-950 text-4xl font-bold font-serif mt-15 ml-0">
            Let's chat
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={submitdata.name}
                onChange={handleChange}
                className="bg-white mt-1 w-120 p-4 rounded-2xl block"
                placeholder="Enter your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={submitdata.email}
                onChange={handleChange}
                className="bg-white mt-1 w-120 p-4 rounded-2xl block"
                placeholder="Enter your Email"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={submitdata.subject}
                onChange={handleChange}
                className="bg-white mt-1 w-120 p-4 rounded-2xl block"
                placeholder="Subject"
              />
            </div>

            <div>
              <label htmlFor="phn" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phn"
                name="phn"
                value={submitdata.phn}
                onChange={handleChange}
                className="bg-white mt-1 w-120 p-4 rounded-2xl block"
                placeholder="Phone number"
              />
            </div>

            <div>
              <label htmlFor="msg" className="block text-sm font-medium text-gray-700">
                Message *
              </label>
              <textarea
                id="msg"
                name="msg"
                value={submitdata.msg}
                onChange={handleChange}
                className="bg-white mt-1 text-gray-600 w-120 p-4 rounded-2xl block"
                placeholder="Message"
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-32 h-13 text-gray-600 rounded-2xl bg-white hover:bg-red-300 hover:text-white mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="w-full h-5 bg-white mt-390"></div>
    </>
  );
}

export default Contact;
