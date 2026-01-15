import Catering from "../models/CateringModel.js";
import cloudinary from "../config/cloudinary.js";

// Create Catering Service
export const createCatering = async (req, res, next) => {
  try {
    const { name, description, menuType, pricePerPlate, items, contactPhone } = req.body;
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const b64 = Buffer.from(file.buffer).toString("base64");
          const dataURI = `data:${file.mimetype};base64,${b64}`;
          const result = await cloudinary.uploader.upload(dataURI, {
            folder: "eventplanner/catering",
          });
          imageUrls.push(result.secure_url);
        }
      }

    const catering = await Catering.create({
      name,
      description,
      menuType,
      pricePerPlate,
      items: items ? items.split(",") : [],
      contactPhone,
      images: imageUrls
    });

    res.status(201).json({ message: "Catering Service Created", data: catering });
  } catch (error) {
    next(error);
  }
};

// Get All
export const getAllCatering = async (req, res, next) => {
  try {
    const catering = await Catering.find();
    res.status(200).json({ data: catering });
  } catch (error) {
    next(error);
  }
};

// Update
export const updateCatering = async (req, res, next) => {
  try {
    const updates = req.body;
    
     if (req.files && req.files.length > 0) {
        let imageUrls = [];
        for (const file of req.files) {
          const b64 = Buffer.from(file.buffer).toString("base64");
          const dataURI = `data:${file.mimetype};base64,${b64}`;
          const result = await cloudinary.uploader.upload(dataURI, {
            folder: "eventplanner/catering",
          });
          imageUrls.push(result.secure_url);
        }
        
         const catering = await Catering.findById(req.params.id);
          if(catering) {
              updates.images = [...catering.images, ...imageUrls];
          }
      }

    if (updates.items && typeof updates.items === 'string') {
        updates.items = updates.items.split(',');
    }

    const catering = await Catering.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json({ message: "Updated Successfully", data: catering });
  } catch (error) {
    next(error);
  }
};

// Delete
export const deleteCatering = async (req, res, next) => {
  try {
    await Catering.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
