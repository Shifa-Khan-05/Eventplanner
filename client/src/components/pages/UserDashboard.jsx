import React, { useEffect, useState } from "react";
import api from "../../config/api";
import { toast } from "react-hot-toast";
import img from "../pages/image/cpl23.jpg";
import { MdModeEditOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";



const UserDashboard = () => {
  const [userdata, setuserdata] = useState(
    ""
    //   {
    //   fname:"Shifa khan",
    //   email:"sxnnn@gmail.com",
    //   phone:"123-44656",
    // }
  );

  const navigate= useNavigate();
  const fetchUserData = async () => {
    try {
      const res = await api.get("/user/profile");
      setuserdata(res.data.data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div className=" bg-red-100 w-full opacity-40 h-55 -mt-30 "></div>

      <div className=" flex flex-col items-center justify-center font-serif italic">
        <h1 className=" text-6xl absolute -mt-40">User Dashboard</h1>

        <h6 className=" text-2xl -mt-13">"Welcome to your Dashboard"</h6>
      </div>

      <div className=" bg-amber-50 p-6 border rounded-lg mx-auto my-5 w-160 h-140 shadow-md">
        
        <div className=" ">

             <button
          className="absolute ml-132 border -mt-3 p-2 rounded-lg flex gap-2  bg-rose-300 hover:bg-rose-400 text-lg"
          onClick={() => navigate("/UserDashboardEdit")}
        >
          {" "}
          <CiEdit />
          Edit
        </button>
          <div className=" w-60 h-60 ml-45 rounded-full">
            <img
              src={userdata.photo}
              alt=""
              className="  w-60 h-60  rounded-full object-cover"
            />
          </div>
        </div>
        <div className=" grid justify-around gap-5 mt-10">
          <h3>
            <b>Name : </b>
            {userdata.fname}
          </h3>
          <h3>
            <b>Email : </b>
            {userdata.email}
          </h3>
          <h3>
            <b>Phnone : </b>
            {userdata.phn}
          </h3>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
