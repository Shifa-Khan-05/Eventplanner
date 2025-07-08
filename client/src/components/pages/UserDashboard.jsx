import React, { useEffect, useState } from 'react'
import api from '../../config/api';
import { toast}  from 'react-hot-toast';

const UserDashboard = () => {
  const [userdata,setuserdata]=useState(""
  //   {
  //   fname:"Shifa khan",
  //   email:"sxnnn@gmail.com",
  //   phone:"123-44656",
  // }
  );
   const   fetchUserData= async()=>{
    try {
       const res= await api.get("/user/profile");
        setuserdata(res.data.data);
        toast.success(res.data.message);

    } catch (error) {
       toast.error(`Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`)
        
    }  
  }

  useEffect(()=>{
     fetchUserData();

  },[]);
  
  return (
   <>
    <div className=' flex flex-col items-center justify-center bg-red-100'>
      <h1 className=' text-6xl'>User Dashboard</h1>
      <h6 className=' text-2xl mt-5'>Welcome to your Dashboard</h6>
    </div>

    <div className=' bg-amber-50 p-6 border rounded-lg mx-auto my-5 w-140 shadow-md grid justify-around gap-5'>
       <h3><b>Name : </b>{userdata.fname}</h3>
        <h3><b>Email : </b>{userdata.email}</h3>
         <h3><b>Phnone : </b>{userdata.phn}</h3>
    </div>
   
   </>
      
    
  )
}

export default UserDashboard