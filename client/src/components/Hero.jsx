import React from 'react'
import { useNavigate } from 'react-router-dom';
import image from "../assets/images/wedding.webp"
import { motion } from 'framer-motion';

const Hero = () => {
    const navigate = useNavigate();

  return (
   <>

    <div className='-mt-30  ' >
        <motion.img 
          className=' w-1520 absolute -z-1' 
          src={image} 
          alt="" 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
          <motion.span 
            className=' italic text-amber-950 font-sans  text-6xl mt-50  ml-70 absolute ' 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            "TURN YOUR DREAMS INTO REALITY"
          </motion.span>
          <motion.div 
            className=' italic text-amber-950 font-semibold  font-sans text-2xl mt-70  ml-120 absolute'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Creating unforgettable moments with style and ease <br />from weddings to corporate events, we bring your vision to <br /> life with thoughtful planning and flawless execution.
          </motion.div>

          <motion.button 
            className=' bg-red-400 text-white px-6 py-4 text-2xl rounded mt-100 ml-160 hover:bg-red-500' 
            onClick={() => navigate('/login')}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            Login
          </motion.button>
          <motion.button 
            className=' bg-transparent border-red-400 border-2 ml-3 text-red-400 px-6 py-4 text-2xl rounded hover:bg-red-400 hover:text-red-50'
            onClick={() => navigate('/about')}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            Read More
          </motion.button>

        </div>

        
   </>
    
  )
}

export default Hero