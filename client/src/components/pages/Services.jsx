import React from "react";

const Services = () => {
  const services = [
    {
      title: "Wedding Planning",
      description:
        "From venue selection to decor and guest management, we make your wedding seamless and magical.",
      image:
        "https://images.unsplash.com/photo-1529634898780-f7c4cf8cfbff?q=80&w=1080&auto=format&fit=crop",
    },
    {
      title: "Corporate Events",
      description:
        "Professional planning for corporate meetings, product launches, and annual gatherings.",
      image:
        "https://images.unsplash.com/photo-1588269843818-e416e5e04f2e?q=80&w=1080&auto=format&fit=crop",
    },
    {
      title: "Birthday Parties",
      description:
        "Create unforgettable birthday celebrations with custom themes, decor, and entertainment.",
      image:
        "https://images.unsplash.com/photo-1561553873-e8491a4e54b3?q=80&w=1080&auto=format&fit=crop",
    },
    {
      title: "Engagement Ceremonies",
      description:
        "Celebrate love with romantic setups, exquisite floral designs, and premium service.",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1080&auto=format&fit=crop",
    },
    {
      title: "Baby Showers",
      description:
        "Adorable decor and thoughtful planning to make the celebration truly special.",
      image:
        "https://images.unsplash.com/photo-1592096438075-9cbdedc8d053?q=80&w=1080&auto=format&fit=crop",
    },
    {
      title: "Theme Parties",
      description:
        "Unique themes brought to life with detailed design and artistic elements.",
      image:
        "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?q=80&w=1080&auto=format&fit=crop",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-80">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1080&auto=format&fit=crop"
          alt="Services Banner"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 flex items-center justify-center">
          <h1 className="text-6xl font-serif font-bold text-white italic drop-shadow-lg">
            Our Services
          </h1>
        </div>
      </div>

      {/* Intro Section */}
      <div className="bg-gradient-to-br from-red-50 via-white to-red-100 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold text-red-950 italic">
            Crafting Moments, Creating Memories
          </h2>
          <p className="text-gray-700 mt-4 text-lg">
            At SK Events, we provide exceptional event planning services tailored to your
            dreams and desires. Let us handle the details while you cherish the
            celebrations.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-gradient-to-br from-red-50 via-white to-red-100 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300 group"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-6">
                <h3 className="text-2xl font-serif font-semibold text-red-950 italic mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white text-lg font-serif">Learn More</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gradient-to-r from-red-100 via-white to-red-100 py-16">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl font-serif font-bold text-red-950 italic">
            Why Choose SK Events?
          </h2>
          <p className="text-gray-700 mt-4 text-lg">
            With years of experience, a passion for perfection, and a commitment to
            excellence, SK Events ensures that every celebration is as unique as you are.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-red-950">Expert Team</h3>
              <p className="text-gray-600 mt-2">
                Our team brings creativity and precision to every event we plan.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-red-950">Custom Designs</h3>
              <p className="text-gray-600 mt-2">
                Every event is tailored to reflect your style and vision perfectly.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-red-950">Premium Quality</h3>
              <p className="text-gray-600 mt-2">
                We source the finest materials and services for an unforgettable
                experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-gradient-to-r from-red-200 via-red-100 to-red-200 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-serif font-bold text-red-950 italic">
            Let's Make Your Dream Event Happen
          </h2>
          <p className="text-gray-700 mt-4 text-lg">
            From intimate gatherings to grand celebrations, we bring your vision to life
            with our expertise and passion.
          </p>
          <button
            className="mt-8 bg-red-950 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-red-800 transition-all duration-300"
            onClick={() => window.location.href = "/plan-event"}
          >
            Start Planning Now
          </button>
        </div>
      </div>

      {/* Footer Accent Strip */}
      <div className="w-full h-6 bg-gradient-to-r from-red-300 via-red-100 to-red-300"></div>
    </>
  );
};

export default Services;
