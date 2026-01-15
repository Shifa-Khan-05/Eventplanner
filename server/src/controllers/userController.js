import cloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";


export const Getprofile = async (req, res, next) => {
  try {
    const currentuser = req.user;
    if (!currentuser) {
      const error = new Error("User not Found !! Login again");
      error.statusCode = 401;
      return next(error);
    }

   res.status(200).json({message:`Welcome Back ${currentuser.fname}`, data:currentuser,})

  } catch (error) {
    next(error);
  }
};

export const UpdateProfile = async (req, res, next) => {
  try {
    const currentuser = req.user;
    const {
      fname,
      phn,
      gender,
      occupation,
      address,
      city,
      state,
      district,
      representing,
    } = req.body;

    if (!currentuser) {
      const error = new Error("User Not Found !! Login Again");
      error.statusCode = 401;
      return next(error);
    }

    const photo = req.file;
    let picture;

    if (photo) {
      const b64 = Buffer.from(photo.buffer).toString("base64");
      const dataURI = `data:${photo.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "eventPlannerPictures",
        width: 500,
        height: 500,
        crop: "fill",
      });
      picture = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      currentuser._id,
      {
        fname,
        phn,
        gender,
        occupation,
        address,
        city,
        state,
        district,
        representing,
        photo: picture || currentuser.photo,
      },
      { new: true }
    );

    res.status(200).json({ message: "Profile Updated", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const GetAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "All Users Fetched", data: users });
  } catch (error) {
    next(error);
  }
};
