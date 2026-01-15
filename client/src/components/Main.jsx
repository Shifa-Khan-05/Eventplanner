import React from "react";
import logo from "../assets/images/sklogo.png";
import img1 from "../assets/images/birthday.jpg";
import img2 from "../assets/images/pic1.jpg";
import img3 from "../assets/images/pic3.jpg";
import img4 from "../assets/images/pic4.jpg";
import img5 from "../assets/images/pic5.jpg";
import { motion } from "framer-motion";

const Main = () => {
  return (
    <>
      <div className=" bg-red-100 w-290 h-340 mt-120 ml-45 text-center relative justify-center items-center ">
        <motion.img 
          className="w-50 ml-120 -mt-5 absolute" 
          src={logo} 
          alt="" 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
        <motion.div 
          className=" italic font-serif text-amber-950 text-6x mt-40 text-6xl ml-65 absolute "
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Find Happiness with us
        </motion.div>
        <motion.p 
          className=" text-amber-950 text-xl mt-60 ml-53 absolute"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
          nisi, sunt beatae, <br /> ex voluptatibus incidunt cons equuntur
          obcaecati adipisci sapiente nemo, laudantium <br /> vero odio delectus
          eveniet? Mollitia doloremque dignissimos maxime assumenda.
        </motion.p>
        <motion.img className="w-150 h-240 absolute mt-90 ml-10 transform hover:scale-110 transition duration-300" src={img2} alt="" initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}/>
         <motion.img className="w-110 mt-90 h-75 ml-170 absolute transform hover:rotate-6 transition duration-300" src={img1} alt="" initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}/>
         <motion.img className="w-110 mt-177 h-70 ml-170 absolute transform hover:rotate-6 transition duration-300" src={img3} alt="" initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}/>
         <motion.img className="w-110 mt-260 h-70 ml-170 absolute transform hover:rotate-6 transition duration-300" src={img4} alt="" initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} viewport={{ once: true }}/>
        
        
      </div>

      <div className=" w-full h-screen -mt-20 flex justify-center gap-20 bg-amber-50">
       <motion.div 
         className=" text-amber-950  font-bold italic text-7xl mt-50 w-130 "
         initial={{ opacity: 0, x: -30 }}
         whileInView={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.8 }}
         viewport={{ once: true }}
       >What Our Clients Are Saying
        <p className=" mt-10 text-2xl font-light">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur recusandae aperiam mollitia magnam, inventore ullam, iste quae sapiente impedit in nostrum praesentium. Corporis eum minima incidunt! Atque quis perspiciatis ab.</p>
       </motion.div>

       <div  className="flex justify-center items-center  w-160 ">
        <motion.div className="h-130 w-90 -ml-80 mt-30 absolute" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}><img className="h-130" src={img5} alt="" /></motion.div>
        <motion.div className="h-130 w-80 ml-50 mt-6  bg-red-300  " initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className=" text-white ml-10 mt-10 text-4xl absolute">Choose a life <br /> partner not <br /> because you  <br />can merely  live <br /> with them, but <br /> because you  <br />cannot imagine <br /> living without <br /> them</div>
          <div className=" text-white italic mt-110 text-2xl ml-40 ">Juliet</div>
        </motion.div>
       </div>
      </div>
    </>
  );
};

export default Main;
