import React, { useState } from "react";
import image from "../pages/image/pic6.jpg";

const Btn1 = () => {

  const [emaill, setemaill] = useState();
    const [password, setpassword] = useState();

   

    const [Regiserdata, setRegisterdata]=useState({
      name:"",
      emaill:"",
      password:""
    })
    
    const handelchange=(e)=>{
      const{name,value}=e.target;
      setRegisterdata((previousdata)=>({...previousdata,[name]:value}))
      
      
    }
   
    const handleSubmit=(e)=>
    {
      e.preventDefault();
      console.log(Regiserdata);

      setRegisterdata({
      name:"",
      emaill:"",
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
                type="text"
                name="name"
                value={Regiserdata.name}
                onChange={handelchange}
                className="bg-amber-50 w-80 p-3 rounded-sm ml-10 mt-10"
                id="id1"
                placeholder="Enter Your Full name"
                required
              />
                   

              <input
                type="email"
                name="emaill"
                value={Regiserdata.email}
                onChange={handelchange}
                className="bg-amber-50 w-80 p-3 rounded-sm ml-10 mt-5"
                id="id2"
                placeholder="Enter Your email"
                required
              />
              <input
                type="text"
                name="password"
                value={Regiserdata.password}
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
