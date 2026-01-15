import React from "react";

const Elements = () => {
  const elements = [
    {
      title: "Floral Decorations",
      description:
        "Elegant flower arrangements and centerpieces to bring life and beauty to your events.",
      image:
        "https://wallpapers.com/images/hd/2560x1440-spring-pretty-white-flowers-uygcewci3vng7ux3.jpg",
    },
    {
      title: "Themed Backdrops",
      description:
        "Custom-designed backdrops that perfectly match your chosen theme and mood.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJkHmQnLhB6armxOD0PvLj5pZax3WJE6he4g&s",
    },
    {
      title: "Lighting Design",
      description:
        "Mood-enhancing lighting setups that add elegance and charm to your special day.",
      image:
        "https://vltglight.com/wp-content/uploads/2021/09/Wedding-Tent-Lighting.png",
    },
    {
      title: "Luxury Table Settings",
      description:
        "Premium table settings with fine cutlery, glassware, and artistic presentations.",
      image:
        "https://img.freepik.com/free-photo/wedding-table-desserts_1303-10520.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      title: "Stage Designs",
      description:
        "Beautifully crafted stages for weddings, receptions, and other celebrations.",
      image:
        "https://img.pikbest.com/photo/20250212/stage-decoration-wedding-bridal-function_11520855.jpg!bw700",
    },
    {
      title: "Custom Centerpieces",
      description:
        "Personalized decor elements to make your tables truly stand out.",
      image:
        "https://villatuscanaevents.com/wp-content/uploads/2020/08/Villa-Tuscana-Wedding-Quinceanera-Centerpieces-Mesa-9.jpeg",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-160 -mt-30">
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20250305/pngtree-elegant-floral-wedding-stage-with-golden-accents-and-luxurious-decorations-image_17062748.jpg"
          alt="Elements Banner"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50 flex items-center justify-center">
          <h1 className="text-6xl font-serif font-bold text-white italic drop-shadow-lg">
            Elements
          </h1>
        </div>
      </div>

      {/* Section Title */}
      <div className="bg-gradient-to-br from-red-50 via-white to-red-100 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold text-red-950 italic">
            Our Event Essentials
          </h2>
          <p className="text-gray-600 mt-4 text-lg font-light">
            Every detail matters — explore our exquisite collection of decor elements
            designed to create unforgettable memories.
          </p>
        </div>
      </div>

      {/* Elements Grid */}
      <div className="bg-gradient-to-br from-red-50 via-white to-red-100 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {elements.map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300 group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-6">
                <h3 className="text-2xl font-serif font-semibold text-red-950 italic mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white text-lg font-serif">View More</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-gradient-to-r from-red-200 via-red-100 to-red-200 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-serif font-bold text-red-950 italic">
            Let Us Design Your Dream Event
          </h2>
          <p className="text-gray-700 mt-4 text-lg">
            Whether it's a wedding, corporate event, or private celebration, our
            curated elements ensure every moment feels magical.
          </p>
          <button
            className="mt-8 bg-red-950 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-red-800 transition-all duration-300"
            onClick={() => alert("Redirect to contact page or booking form")}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="w-full h-6 bg-gradient-to-r from-red-300 via-red-100 to-red-300"></div>
    </>
  );
};

export default Elements;
