import React, { useState } from "react";
import image from "../pages/image/pic6.jpg";
import api from "../../config/api";
import {toast} from "react-hot-toast";
const Register = () => {
  const [fname, setfname] = useState();
  const [email, setlemail] = useState();
  const [city, setcity] = useState();
  const [gender, setgender] = useState();
  const [phn, setphn] = useState();

  const [Regiserdata, setRegisterdata] = useState({
    fname: "",
    email: "",
    password: "",
    phn: "",
  });

  const handelchange = (e) => {
    const { name, value } = e.target;
    setRegisterdata((previousdata) => ({ ...previousdata, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(Regiserdata);
     
    try {
      const res=await api.post("/auth/",Regiserdata);
      toast.success(res.data.message);
      setRegisterdata({
      fname: "",
      password: "",
      city: "",
      phn: "",
    });
      
    } catch (error) {
      toast.error(  `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`)
    }


    
  };
//    const handleGenderChange = (selectedGender) => {
//     setRegisterdata((prevData) => ({...prevData,
//     gender: selectedGender,
//   }));
// };




  return (
    <>
      <div className="w-full h-screen -mt-30 bg-amber-300 relative">
        <div>
          <img className="w-700 h-194 blur" src={image} alt="" />
          <div className="w-100 h-150 bg-red-300 -mt-160 ml-140  rounded-2xl absolute">
            <form action="" onSubmit={handleSubmit}>
              <div className=" text-4xl text-amber-50 mt-5 ml-23">
                {" "}
                <u>Register Now </u>
              </div>

              <label
                className=" text-2xl ml-10 mt-5 absolute text-amber-50"
                htmlFor=""
              >
                First name
              </label>
              <input
                type=" text"
                name="fname"
                className="bg-amber-50 w-80 p-3 rounded-sm ml-10 mt-15"
                id="1"
                placeholder="Enter Your Full name"
                value={Regiserdata.fname}
                onChange={handelchange}
              />
              <label className=" text-2xl ml-10 mt-10 text-amber-50" htmlFor="">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="bg-amber-50 w-80 p-3 rounded-sm ml-10 mt-5"
                id="2"
                placeholder="Enter your email"
                value={Regiserdata.email}
                onChange={handelchange}
              />

              <div className=" ">
                <label
                  className=" text-2xl ml-10 mt-10 text-amber-50"
                  htmlFor=""
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="bg-amber-50 w-80 p-3 rounded-sm ml-10 mt-5"
                  id="3"
                  placeholder="******"
                  value={Regiserdata.password}
                  onChange={handelchange}
                />
              </div>

              
              <div className=" mt-5 ml-10">
                <label className=" text-xl text-amber-50" htmlFor="address">
                  Phone
                </label>
                <br />
                <input
                type="tel"
                  name="phn"
                  value={Regiserdata.phn}
                  onChange={handelchange}
                  className="bg-amber-50 text-gray-600 w-80 p-3 rounded-sm mt-2 "
                  id="4"
                  placeholder="+91-12345678"
                />
              </div>
              {/* <div className=" text-amber-50 text-xl ml-10 mt-5 ">
                <label
                  htmlFor="Gender "
                  name="Gender"
                  value={Regiserdata.gender}
                  onChange={handelchange}
                >
                  Gender :{" "}
                </label>
                <label name="gender" htmlFor="Gender">Male</label>
                <input type="radio" name="gender" value="Male" 
                 onChange={(e) => handleGenderChange(e.target.value)} />
                <label className="ml-8" htmlFor="Gender" name="gender">
                  Female
                </label>
                <input type="radio" name="gender" value="FeMale"  
                 onChange={(e) => handleGenderChange(e.target.value)}/>
              </div> */}


              <button
                className=" bg-amber-50 w-34 h-14 rounded-sm ml-34 text-gray-500 mt-5 hover:bg-amber-200 hover:text-black"
                type="submit"
              >
                Submit
              </button>
              <div className=" text-amber-50 text-md mt-3 ml-22">
                <span>Already have an account? </span>
                <a className=" hover:text-blue-700" href="/Btn1">
                  Login{" "}
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
