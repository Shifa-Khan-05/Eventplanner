import Decoration from "../models/DecorationModel.js";
import cloudinary from "../config/cloudinary.js";

// Create Decoration Service
export const createDecoration = async (req, res, next) => {
  try {
    const { name, description, price, type, contactPhone } = req.body;
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const b64 = Buffer.from(file.buffer).toString("base64");
          const dataURI = `data:${file.mimetype};base64,${b64}`;
          const result = await cloudinary.uploader.upload(dataURI, {
            folder: "eventplanner/decoration",
          });
          imageUrls.push(result.secure_url);
        }
    }

    const decoration = await Decoration.create({
      name,
      description,
      price,
      type,
      contactPhone,
      images: imageUrls
    });

    res.status(201).json({ message: "Decoration Service Created", data: decoration });
  } catch (error) {
    next(error);
  }
};

// Get All
export const getAllDecorations = async (req, res, next) => {
  try {
    const decorations = await Decoration.find();
    res.status(200).json({ data: decorations });
  } catch (error) {
    next(error);
  }
};

// Update
export const updateDecoration = async (req, res, next) => {
  try {
    const updates = req.body;
    
     if (req.files && req.files.length > 0) {
        let imageUrls = [];
        for (const file of req.files) {
          const b64 = Buffer.from(file.buffer).toString("base64");
          const dataURI = `data:${file.mimetype};base64,${b64}`;
          const result = await cloudinary.uploader.upload(dataURI, {
            folder: "eventplanner/decoration",
          });
          imageUrls.push(result.secure_url);
        }
        
         const decoration = await Decoration.findById(req.params.id);
          if(decoration) {
              updates.images = [...decoration.images, ...imageUrls];
          }
      }

    const decoration = await Decoration.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json({ message: "Updated Successfully", data: decoration });
  } catch (error) {
    next(error);
  }
};

// Delete
export const deleteDecoration = async (req, res, next) => {
  try {
    await Decoration.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
