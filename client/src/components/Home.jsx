import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden ">
        {/* Background Image */}
        <motion.img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
          alt="Luxury Event"
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            className="text-5xl md:text-8xl font-serif font-bold text-amber-500 mb-6 animate-fade-in-up"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            SK Events
          </motion.h1>

          <motion.p
            className="text-white text-lg md:text-2xl tracking-[0.3em] uppercase mb-10 animate-fade-in-up delay-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Crafting Timeless Celebrations
          </motion.p>

          <motion.div
            className="flex gap-6 animate-fade-in-up delay-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <button
              onClick={() => navigate("/plan-event")}
              className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-full
              hover:bg-amber-600 transition transform hover:scale-105 shadow-lg"
            >
              Plan Your Event
            </button>

            <button
              onClick={() => navigate("/Gallery")}
              className="px-8 py-3 border border-white text-white font-semibold rounded-full
              hover:bg-white hover:text-black transition transform hover:scale-105"
            >
              View Gallery
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/70 text-sm tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          SCROLL
        </motion.div>
      </section>

      {/* ABOUT STRIP */}
      <section className="bg-stone-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-6 animate-fade-in-up"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Creating Moments That Matter
          </motion.h2>

          <motion.p
            className="text-stone-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            From luxurious weddings to elite corporate gatherings, SK Events
            curates unforgettable experiences with elegance, precision, and
            creativity. Every detail is crafted to perfection.
          </motion.p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-16 border-t">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { label: "Events Executed", value: "500+" },
            { label: "Happy Clients", value: "300+" },
            { label: "Years of Excellence", value: "10+" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="animate-fade-in-up"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl font-serif font-bold text-amber-600">
                {item.value}
              </p>
              <p className="text-stone-500 uppercase tracking-widest text-sm mt-2">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
