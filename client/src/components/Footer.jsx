import React from "react";
import img from "../assets/images/bg2.jpg";
import logo from "../assets/images/sklogo.png";
import { CiFacebook } from "react-icons/ci";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <>
      <div className=" w-full h-130 mt-20 bg-black">
        <img src={img} className="w-full h-130" alt="" />
      </div>
      <div className=" w-full h-130   bg-black opacity-80 -mt-130 grid grid-cols-3">
        <div className=" font-serif">
          <div className=" text-white text-3xl  absolute ml-20 mt-20">
            Head Office
            <div className=" text-gray-400 text-xl mt-10 absolute">
              {" "}
              9016 Goldfield StreetSouth Richmond Hill, New York 11419
            </div>
            <div className=" text-gray-400 text-xl mt-50 absolute hover:text-pink-600">
              <a href=""> sheikhshifa123@gmail.com</a>
            </div>
            <div className=" text-gray-400 text-xl mt-57 absolute hover:text-pink-600">
              <a href="">+91-6265672264</a>
            </div>
          </div>
        </div>

        <div className=" font-serif ml-44 mt-10">
          <img src={logo} className=" w-40" alt="" />
          <div className=" text-white text-xl -mt-5 ml-4 font-bold absolute  ">
            Event Planner
          </div>
          <div className=" text-gray-500 text-2xl mt-3 -ml-45 absolute  ">
            Purus velit at volutpat sapien ullamcorper rhoncus.
          </div>
          <div className=" text-gray-400 mt-15 -ml-28 ">
            Egestas purus viverra accumsan in nis in metus dictum at tempor nisl
            rhoncus mattis rhoncus urna neque viverra.
          </div>

          <div className=" absolute text-4xl text-gray-400 mt-5 flex">
            <a href=""> <CiFacebook className=" ml-2  hover:text-pink-500" /></a>
            <a href="">
              {" "}
              <TiSocialTwitterCircular className=" ml-2 text-4xl hover:text-pink-500" />
            </a>
            <a href=""><FaInstagram className=" ml-2  hover:text-pink-500" /></a>
            <a href=""><CiLinkedin className=" ml-2  hover:text-pink-500" /></a>
          </div>
        </div>

        <div className=" font-serif ml-30">
          <div className=" text-white text-3xl  absolute ml-40 mt-19">
            Quick Links
          </div>
          <div className=" text-gray-500 text-xl ml-60 mt-33  hover:text-pink-500 ">
            <a href="/Services">Services</a>
          </div>
          <div className=" text-gray-500 text-xl ml-55 hover:text-pink-500  mt-2 ">
            <a href="/Contact">Contact Us</a>
          </div>
          <div className=" text-gray-500 text-xl ml-59 hover:text-pink-500 mt-2 ">
            <a href="/About"> About Us</a>
          </div>

          <div className=" text-gray-500 text-xl ml-64 hover:text-pink-500 mt-2 ">
            <a href="/Stories">Stories</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
