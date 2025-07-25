import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../config/api";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProfileEditModal from "./ProfileEditModal";
import AccountDeactivateModal from "./AccountDeactivateModal";




const Profile = () => {
 const [userdata, setUserData] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);


  const fetchUserData = async () => {
    try {
      const res = await api.get("/user/profile");
      setUserData(res.data.data);
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
  }, [isEditModalOpen]);

  //console.log(userdata);
  
  return (
    <>
     <div className="flex justify-between bg-gradient-to-r from-orange-200 to-red-200 p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-white">User Profile</h1>
        <button
          className="border border-white hover:scale-105 text-white p-2 rounded-lg font-bold flex gap-2 justify-center items-center hover:bg-orange-300 text-lg"
          onClick={() => setIsEditModalOpen(true)}
        >
          <FaUserEdit className="text-xl" />
          Edit
        </button>
      </div>

      <div className="p-6 flex gap-6 bg-orange-50">
        <div className="flex flex-col gap-6 border border-red-200 w-2/7 rounded-xl bg-white shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="border-4 border-orange-200 w-48 h-48 rounded-full overflow-hidden m-auto shadow-md">
            <img
              src={userdata.photo }
              alt="profilePic"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="text-gray-700">
            <b className="text-orange-600">Name:</b>{" "}
            <span className="text-gray-800 ml-2">{userdata.fname}</span>
          </div>
          <div className="text-gray-700">
            <b className="text-orange-600">Email:</b>{" "}
            <span className="text-gray-800 ml-2">{userdata.email}</span>
          </div>
          <div className="text-gray-700">
            <b className="text-orange-600">Phone:</b>{" "}
            <span className="text-gray-800 ml-2">{userdata.phn}</span>
          </div>
        </div>

        <div className="border border-red-200 p-6 w-5/7 grid gap-4 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-orange-600 mb-4 border-b border-orange-200 pb-2">
            Additional Information
          </h2>
          <div className="text-gray-700">
            <b className="text-red-500">Gender:</b>{" "}
            <span className="text-gray-800 ml-2">{userdata.gender}</span>
          </div>
          <div className="text-gray-700">
            <b className="text-red-500">Occupation:</b>{" "}
            <span className="text-gray-800 ml-2">{userdata.occupation}</span>
          </div>
          <div className="text-gray-700">
            <b className="text-red-500">Address:</b>{" "}
            <span className="text-gray-800 ml-2">{userdata.address}</span>
          </div>
          <div className="text-gray-700">
            <b className="text-red-500">City:</b>{" "}
            <span className="text-gray-800 ml-2">{userdata.city}</span>
          </div>
          <div className="text-gray-700">
            <b className="text-red-500">District:</b>{" "}
            <span className="text-gray-800 ml-2">{userdata.district}</span>
          </div>
          <div className="text-gray-700">
            <b className="text-red-500">State:</b>{" "}
            <span className="text-gray-800 ml-2">{userdata.state}</span>
          </div>
          <div className="text-gray-700">
            <b className="text-red-500">Representing:</b>{" "}
            <span className="text-gray-800 ml-2">{userdata.representing}</span>
          </div>
        </div>
      </div>


       <button
        className="border border-red-500 hover:scale-105 mx-5 float-end text-red-500 p-2 rounded-lg font-bold flex gap-2 justify-center items-center hover:bg-red-500 hover:text-white cursor-pointer text-lg"
        onClick={() => {
          setIsDeactivateModalOpen(true);
        }}
      >
        Deactivate My acoount
      </button>

      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
        oldData={userdata}
      />


      <AccountDeactivateModal
        isOpen={isDeactivateModalOpen}
        onClose={() => {
          setIsDeactivateModalOpen(false);
        }}
      />
    </>
  );
};

export default Profile;