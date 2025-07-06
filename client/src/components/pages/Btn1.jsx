import React, { useState } from "react";
import image from "../pages/image/pic6.jpg";
import api from "../../config/api";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Btn1 = () => {
   const navigate =useNavigate()
  const [email, setemaill] = useState();
    const [password, setpassword] = useState();

   

    const [Logindata, setLogindata]=useState({
      
      email:"",
      password:""
    })
    
    const handelchange=(e)=>{
      const{name,value}=e.target;
      setLogindata((previousdata)=>({...previousdata,[name]:value}))
      
      
    }
   
    const handleSubmit= async (e)=>
    {
      e.preventDefault();
      console.log(Logindata);

      try {
        const res= await api.post("/auth/login",Logindata);
        toast.success(res.data.message);
         email:"";
      password:"";
      navigate("/UserDashboard");

      } catch (error) {
        toast.error()
      } 

  `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`


      setLogindata({
    
      email:"",
      password:""
      })
    }

   return (
    <>
      <div className="w-full h-screen -mt-30 bg-amber-300 relative">
        <div>
          <img className="w-700 h-194 blur" src={image} alt="" />
          <div className="w-100 h-110 bg-red-300 -mt-140 ml-140  rounded-2xl absolute">
            <form action="" onSubmit={handleSubmit} >
              <div className=" text-4xl text-amber-50 mt-5 ml-38">
                {" "}
                <u>Login </u>
              </div>
                   
               
                   

              <input
                type="email"
                name="email"
                value={Logindata.email}
                onChange={handelchange}
                className="bg-amber-50 w-80 p-3 rounded-sm ml-10 mt-5"
                id="id2"
                placeholder="Enter Your email"
                required
              />
              <input
                type="text"
                name="password"
                value={Logindata.password}
                onChange={handelchange}
                className="bg-amber-50 w-80 p-3 rounded-sm ml-10 mt-5"
                id="id3"
                placeholder="Enter Your password"
                required
              />
              <button className=" bg-amber-50 w-34 h-14 rounded-sm ml-34 text-gray-500 mt-10 hover:bg-amber-200 hover:text-black" type="submit">
                Login
              </button>
              <div className=" text-amber-50 text-md mt-3 ml-22">
                 <span>Don't have an account? </span>
                 <a className=" hover:text-blue-700" href="/Register">Register </a>
                 
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Btn1;
