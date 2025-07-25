import React from 'react'
import { Link} from "react-router-dom"
import logo from "../assets/images/sklogo.png"
import { IoHome } from "react-icons/io5";


const Navbar = () => {
  return (
    <div className=' bg-transparent flex justify-center text-red-950 items-center gap-10 -ml-5 font-bold font-serif text-xl relative top-0 z-99 '>
        <Link to={"/"}> <IoHome className=' text-3xl' /></Link>
        <Link to={"/About"}>About</Link>
        <Link to={"/Contact"}>Contact</Link>
        <Link to={"/Gallery"}>Gallery</Link>
        <a href="/"> <img className='w-30 ' src={logo} alt="" /></a>
        <Link to={"/Services"}>Services</Link>
        <Link to={"/Stories"}>Stories</Link>
         <Link to={"/Elements"}>Elements</Link>
          <Link to={"/Btn1"} >Login</Link>
          



    </div>
  )
}

export default Navbar