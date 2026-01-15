import Banquet from "../models/BanquetModel.js";
import cloudinary from "../config/cloudinary.js";

// Create a new banquet
export const createBanquet = async (req, res, next) => {
  try {
    const {
      name,
      description,
      address,
      city,
      state,
      capacity,
      pricePerPlate,
      amenities,
      contactPhone,
    } = req.body;

    // Handle Image Uploads
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const b64 = Buffer.from(file.buffer).toString("base64");
        const dataURI = `data:${file.mimetype};base64,${b64}`;
        const result = await cloudinary.uploader.upload(dataURI, {
          folder: "eventplanner/banquets",
        });
        imageUrls.push(result.secure_url);
      }
    }

    const newBanquet = await Banquet.create({
      name,
      description,
      address,
      city,
      state,
      capacity,
      pricePerPlate,
      amenities: amenities ? amenities.split(",") : [], // Assuming comma-separated string if sent via form-data
      contactPhone,
      images: imageUrls,
    });

    res.status(201).json({
      message: "Banquet created successfully",
      data: newBanquet,
    });
  } catch (error) {
    next(error);
  }
};

// Get all banquets (with optional filters)
export const getAllBanquets = async (req, res, next) => {
  try {
    const { city, minPrice, maxPrice, capacity } = req.query;
    let query = {};

    if (city) query.city = { $regex: city, $options: "i" };
    if (minPrice || maxPrice) {
      query.pricePerPlate = {};
      if (minPrice) query.pricePerPlate.$gte = Number(minPrice);
      if (maxPrice) query.pricePerPlate.$lte = Number(maxPrice);
    }
    if (capacity) query.capacity = { $gte: Number(capacity) };

    const banquets = await Banquet.find(query);

    res.status(200).json({
      message: "Banquets fetched successfully",
      count: banquets.length,
      data: banquets,
    });
  } catch (error) {
    next(error);
  }
};

// Get single banquet by ID
export const getBanquetById = async (req, res, next) => {
  try {
    const banquet = await Banquet.findById(req.params.id);
    if (!banquet) {
      const error = new Error("Banquet not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ data: banquet });
  } catch (error) {
    next(error);
  }
};

// Update banquet
export const updateBanquet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Handle new images if any
    if (req.files && req.files.length > 0) {
      let imageUrls = [];
      for (const file of req.files) {
         const b64 = Buffer.from(file.buffer).toString("base64");
        const dataURI = `data:${file.mimetype};base64,${b64}`;
        const result = await cloudinary.uploader.upload(dataURI, {
          folder: "eventplanner/banquets",
        });
        imageUrls.push(result.secure_url);
      }
      // Combine old images with new ones or replace? Let's append for now, or client handles it.
      // For simplicity, let's assume client sends 'existingImages' or we just add new ones.
      // If we want to replace, we check a flag. Let's just push to existing.
      const banquet = await Banquet.findById(id);
      if(banquet) {
          updates.images = [...banquet.images, ...imageUrls];
      }
    }
    
    // Parse amenities if it's a string
    if (updates.amenities && typeof updates.amenities === 'string') {
        updates.amenities = updates.amenities.split(',');
    }

    const updatedBanquet = await Banquet.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBanquet) {
      const error = new Error("Banquet not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Banquet updated successfully",
      data: updatedBanquet,
    });
  } catch (error) {
    next(error);
  }
};

// Delete banquet
export const deleteBanquet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBanquet = await Banquet.findByIdAndDelete(id);

    if (!deletedBanquet) {
      const error = new Error("Banquet not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Banquet deleted successfully" });
  } catch (error) {
    next(error);
  }
};
