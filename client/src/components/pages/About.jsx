import React from "react";
import { motion } from "framer-motion";

import image from "../pages/image/pic12.webp";
import logo from "../pages/image/sklogo.png";
import logo2 from "../pages/image/team.png";
import image2 from "../pages/image/person1.png";
import image3 from "../pages/image/person2.png";
import image4 from "../pages/image/person3.png";
import img5 from "../pages/image/pic6.avif";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const About = () => {
  return (
    <>
      {/* HERO */}
      <div>
        <motion.img
          src={image}
          className="w-full h-160 -mt-40 absolute"
          alt=""
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />

        <motion.div
          className="absolute text-6xl font-bold font-serif text-gray-900 italic ml-150 mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          About Us-
        </motion.div>
      </div>

      {/* ABOUT CARD */}
      <motion.div
        className="w-300 ml-40 h-130 mt-50 opacity-90 absolute shadow-2xl shadow-black bg-black"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="w-24 bg-amber-50 rounded-full mt-10 ml-140"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <img src={logo} alt="" />
        </motion.div>

        <motion.div
          className="text-white font-bold font-serif text-6xl ml-99 mt-10"
          variants={fadeUp}
        >
          Ceremony and <br />
          <span className="-ml-10"> Event Specialists</span>
        </motion.div>

        <motion.p
          className="text-amber-50 ml-40 mt-10"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          inventore consectetur dolorum sint, optio illum ullam, incidunt <br />
          reiciendis, nihil explicabo deleniti.
        </motion.p>
      </motion.div>

      {/* TEAM */}
      <div className="bg-red-100 w-full h-280 mt-110">
        <motion.img
          src={logo2}
          className="w-60 mt-70 ml-159 absolute"
          alt=""
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />

        <motion.div
          className="text-6xl mt-115 ml-130 absolute text-pink-900 font-bold font-serif"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Meet Our Team
        </motion.div>

        <motion.div
          className="text-2xl mt-134 ml-124 absolute text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Purus velit at volutpat sapien ullamcorper rhoncus.
        </motion.div>

        <div className="w-full h-100 flex absolute mt-150">
          {[image2, image3, image4].map((img, i) => (
            <motion.div
              key={i}
              className="w-100 h-40 mt-20 ml-40"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <img src={img} className="w-40 rounded-full" alt="" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section className="bg-pink-100 py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div
            className="md:w-1/2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-amber-950 italic mb-8">
              What Our Clients Are Saying
            </h2>

            <div className="h-1 w-24 bg-amber-600 mb-8"></div>

            <div className="relative bg-white/50 p-8 rounded-2xl shadow-lg border border-white/40">
              <p className="text-xl text-stone-700 italic font-light leading-relaxed">
                "Choose a life partner not because you can merely live with them,
                but because you cannot imagine living without them. SK Events
                made our special day absolutely magical."
              </p>
              <p className="text-right mt-6 font-bold text-amber-900 text-lg">
                — Juliet & Romeo
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.div
        className="bg-black w-full h-120"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <img src={logo2} className="w-50 ml-165" alt="" />

        <div className="text-white ml-115 -mt-5 font-bold font-serif text-4xl">
          Start Planning Your Events Today
        </div>

        <a href="/Register">
          <button className="bg-pink-500 text-white text-2xl p-3 ml-175 mt-10 hover:bg-pink-800">
            Start Now
          </button>
        </a>
      </motion.div>
    </>
  );
};

export default About;
