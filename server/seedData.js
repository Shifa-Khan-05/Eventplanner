import mongoose from "mongoose";
import dotenv from "dotenv";
import Banquet from "./src/models/BanquetModel.js";
import Catering from "./src/models/CateringModel.js";
import Decoration from "./src/models/DecorationModel.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const banquets = [
  {
    name: "Royal Palace Hall",
    description: "A grand hall suitable for royal weddings and large gatherings. Features crystal chandeliers and premium flooring.",
    address: "123 King's Road",
    city: "Mumbai",
    state: "Maharashtra",
    capacity: 500,
    pricePerPlate: 1200,
    rentalPrice: 50000,
    type: "Hall",
    contactPhone: "9876543210",
    amenities: ["AC", "Parking", "Bridal Room", "Stage"],
    images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"], // Demo image
    rating: 4.8
  },
  {
    name: "Green Valley Gardens",
    description: "Lush green open lawns perfect for evening receptions and outdoor parties under the stars.",
    address: "45 Nature Lane",
    city: "Pune",
    state: "Maharashtra",
    capacity: 1000,
    pricePerPlate: 900,
    rentalPrice: 75000,
    type: "Garden",
    contactPhone: "9876543211",
    amenities: ["Open Air", "Valet Parking", "Gazebo"],
    images: ["https://images.unsplash.com/photo-1587271407850-4d4386d3d4c8?auto=format&fit=crop&q=80&w=800"],
    rating: 4.5
  },
  {
    name: "Sapphire Convention Center",
    description: "Modern convention center for corporate events and formal weddings.",
    address: "88 Tech Park",
    city: "Bangalore",
    state: "Karnataka",
    capacity: 300,
    pricePerPlate: 1500,
    rentalPrice: 40000,
    type: "Hall",
    contactPhone: "9876543212",
    amenities: ["AC", "Projector", "Sound System"],
    images: ["https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=800"],
    rating: 4.2
  },
  {
      name: "Moonlight Lawn",
      description: "An affordable garden venue for intimate gatherings.",
      address: "12 Moon St",
      city: "Delhi",
      state: "Delhi",
      capacity: 200,
      pricePerPlate: 600,
      rentalPrice: 15000,
      type: "Garden",
      contactPhone: "9998887776",
      amenities: ["Basic Lighting", "Parking"],
      images: ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800"],
      rating: 3.9
  },
  {
      name: "Grand Ballroom at The Oberoi",
      description: "Luxury personified. The ultimate venue for high-profile weddings.",
      address: "M.G. Road",
      city: "Bangalore",
      state: "Karnataka",
      capacity: 800,
      pricePerPlate: 3500,
      rentalPrice: 200000,
      type: "Hall",
      contactPhone: "0801234567",
      amenities: ["Luxury Interiors", "5-Star Catering", "Suite Included"],
      images: ["https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&q=80&w=800"],
      rating: 5.0
  }
];

const caterings = [
  {
    name: "Spice Symphony",
    description: "Authentic North Indian and Mughlai cuisine specialists.",
    menuType: "Non-Veg",
    pricePerPlate: 800,
    items: ["Butter Chicken", "Biryani", "Naan"],
    contactPhone: "9000000001",
    images: ["https://images.unsplash.com/photo-1631515243349-eed57b41961c?auto=format&fit=crop&q=80&w=800"],
    rating: 4.7
  },
  {
    name: "Pure Veg Delights",
    description: "Offering the finest range of vegetarian delicacies from South India to Gujarat.",
    menuType: "Veg",
    pricePerPlate: 500,
    items: ["Paneer Tikka", "Dosa", "Dhokla"],
    contactPhone: "9000000002",
    images: ["https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800"],
    rating: 4.6
  },
  {
    name: "Global Bites",
    description: "Continental and Asian fusion catering for modern palates.",
    menuType: "Mixed",
    pricePerPlate: 1200,
    items: ["Sushi", "Pasta", "Tacos"],
    contactPhone: "9000000003",
    images: ["https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800"],
    rating: 4.8
  },
  {
     name: "Royal Feast",
     description: "Traditional Rajasthani Thali experience.",
     menuType: "Veg",
     pricePerPlate: 750,
     items: ["Dal Baati Churma", "Gatte ki Sabzi"],
     contactPhone: "9000000004",
     images: ["https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800"],
     rating: 4.9
  }
];

const decorations = [
  {
    name: "Fairy Tale Lights",
    description: "Magical lighting setup with fairy lights, chandeliers, and spotlights.",
    price: 25000,
    type: "Lighting",
    images: ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"],
    rating: 4.8
  },
  {
    name: "Classic Floral Arc",
    description: "Beautiful floral arrangements for entrance and stage using fresh roses and orchids.",
    price: 35000,
    type: "Floral",
    images: ["https://images.unsplash.com/photo-1522673607200-1645062cd95f?auto=format&fit=crop&q=80&w=800"],
    rating: 4.9
  },
  {
    name: "Royal Stage Decor",
    description: "Grand stage setup with velvet drapes, golden pillars, and royal seating.",
    price: 50000,
    type: "Stage",
    images: ["https://images.unsplash.com/photo-1478146896981-b80c463e7e22?auto=format&fit=crop&q=80&w=800"],
    rating: 4.7
  },
  {
    name: "Rustic Boho Theme",
    description: "Trendy bohemian theme with wooden props, pampas grass, and pastel colors.",
    price: 40000,
    type: "Theme",
    images: ["https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?auto=format&fit=crop&q=80&w=800"],
    rating: 4.6
  },
  {
      name: "Complete Wedding Package",
      description: "All-inclusive decoration package including stage, entrance, and table centerpieces.",
      price: 150000,
      type: "Full Package",
      images: ["https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800"],
      rating: 5.0
  }
];

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing data (optional, maybe unsafe for production but good for demo)
    // await Banquet.deleteMany({});
    // await Catering.deleteMany({});
    // await Decoration.deleteMany({});

    await Banquet.insertMany(banquets);
    console.log("Banquets seeded");
    
    await Catering.insertMany(caterings);
    console.log("Caterings seeded");
    
    await Decoration.insertMany(decorations);
    console.log("Decorations seeded");

    console.log("Demo Data Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding failed", error);
    process.exit(1);
  }
};

seedData();
