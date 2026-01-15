import React, { useState } from "react";

function Gallery() {
  // Enhanced Gallery image links with categories
  const allImages = [
    { url: "https://images.unsplash.com/photo-1546195643-4dc97a1cb2f5?q=80&w=2070&auto=format&fit=crop", category: "Weddings" }, // Wedding setup
    { url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop", category: "Weddings" }, // Ballroom
    { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop", category: "Weddings" }, // Ceremony
    
    { url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2064&auto=format&fit=crop", category: "Corporate" }, // Meeting room
    { url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop", category: "Corporate" }, // Office party context
    { url: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1973&auto=format&fit=crop", category: "Corporate" }, // Conference
    
    { url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop", category: "Fashion" }, // Fashion
    { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop", category: "Fashion" }, // Runway/Model
    
    { url: "https://images.unsplash.com/photo-1470229722913-7ea549c45560?q=80&w=2070&auto=format&fit=crop", category: "Concerts" }, // Concert
    { url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop", category: "Concerts" }, // Party
    
    { url: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2070&auto=format&fit=crop", category: "Weddings" }, // Decor
    { url: "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?q=80&w=2070&auto=format&fit=crop", category: "Corporate" }, // Handshake/Event
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(allImages.map((img) => img.category))];

  const filteredImages = filter === "All" 
    ? allImages 
    : allImages.filter((img) => img.category === filter);

  return (
    <>
      {/* Hero Section */}
      {/* Added -mt-[80px] to pull image behind the fixed/sticky navbar if it has height. 
          Assuming Navbar is approx 80px. If transparent, this creates the immersive effect. */}
      <div className="relative w-full h-[60vh] overflow-hidden -mt-[115px]">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
          alt="Luxury Event Hall"
          className="absolute w-full h-full object-cover transform hover:scale-105 transition-transform duration-[30s]"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-stone-50 flex flex-col items-center justify-center pt-20">
          <div className="text-center px-4 animate-fade-in-up">
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-amber-500 mb-6 drop-shadow-2xl">
              Our Masterpieces
            </h1>
            <p className="text-xl md:text-2xl text-white font-light tracking-[0.2em] uppercase border-y border-amber-500/50 py-2 inline-block">
              Curating Memories, Crafting Dreams
            </p>
          </div>
        </div>
      </div>

      {/* Stats / details strip */}
      <div className="bg-stone-50 py-8 border-b border-stone-200">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-12 text-center">
            {[{ label: "Events Planned", val: "500+" }, { label: "Happy Couples", val: "200+" }, { label: "Corporate Galas", val: "150+" }].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-amber-600 font-serif">{stat.val}</span>
                    <span className="text-stone-500 text-sm uppercase tracking-wider">{stat.label}</span>
                </div>
            ))}
        </div>
      </div>


      {/* Main Content Area */}
      <div className="bg-stone-50 py-16 px-4 md:px-8 relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-stone-50 to-transparent pointer-events-none" />

        {/* Section Title */}
        <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
            The Gallery
          </h2>
          <div className="w-full flex justify-center items-center gap-4">
               <div className="h-[1px] w-12 bg-amber-500"></div>
               <span className="text-stone-400 italic">Moments frozen in time</span>
               <div className="h-[1px] w-12 bg-amber-500"></div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 relative z-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-2 rounded-full text-base font-semibold tracking-wide transition-all duration-300 transform hover:-translate-y-1 ${
                filter === cat
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-500/30"
                  : "bg-white text-stone-500 hover:text-amber-600 border border-stone-200 hover:border-amber-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[300px] gap-6 p-4">
          {filteredImages.map((item, index) => (
            <div
              key={index}
              className={`group relative rounded-lg overflow-hidden shadow-md cursor-pointer bg-gray-200 animate-fade-in-up hover:shadow-2xl transition-all duration-500 ${
                  index % 3 === 0 ? 'lg:col-span-2' : ''
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedImage(item.url)}
            >
              <img
                src={item.url}
                alt={`Gallery ${item.category} ${index}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ease-in-out"
                loading="lazy"
              />
              
              {/* Elegant Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-center">
                    <p className="text-amber-400 font-serif italic text-lg mb-2">{item.category}</p>
                    <div className="h-[1px] w-8 bg-white/50 mx-auto mb-4"></div>
                    <button className="text-white border border-white/30 px-6 py-2 rounded-sm hover:bg-white hover:text-black transition-colors uppercase text-xs tracking-widest">
                        View Details
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full h-full p-4 flex items-center justify-center">
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors text-5xl font-light focus:outline-none"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>

            <img
              src={selectedImage}
              alt="Full View"
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain animate-scale-up"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery;
