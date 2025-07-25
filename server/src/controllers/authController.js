import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import genToken from "../utils/auth.js";
import Deactivation from "../models/deactivationModel.js";
import cloudinary from "../config/cloudinary.js";

export const RegisterUser = async (req, res, next) => {
  try {
    const { fname, email, password, phn } = req.body;
    if (!fname || !email || !password || !phn) {
      const error = new Error("all Feilds Required");
      error.statusCode = 400;
      return next(error);
    }
    const exitUser = await User.findOne({ email });
    if (exitUser) {
      const error = new Error("Email Already Exist");
      error.statusCode = 409;
      return next(error);
    }


   const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.status === "Active") {
      const error = new Error("Email Already Registerd");
      error.statusCode = 409;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePic = `https://placehold.co/600x400?text=${fname
      .charAt(0)
      .toUpperCase()}`;

    if (existingUser && existingUser.status === "Inactive") {
      existingUser.fname = fname;
      existingUser.password = hashedPassword;
      existingUser.status = "Active";
      existingUser.picture = profilePic;
      existingUser.role = "User"
      await existingUser.save();
    } else {
      const newUser = await User.create({
        fname,
        email,
        phn,
        password: hashedPassword,
        picture: profilePic,
      });
    }

    res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    next(error);
  }
};


export const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User Not registered");
      error.statusCode = 409;
      return next(error);
    }

    const isverified = await bcrypt.compare(password, user.password);
    if (!isverified) {
      const error = new Error("Invalid username or Password");
      error.statusCode = 401;
      return next(error);
    }

    genToken(user._id, res);
    res.status(200).json({ message: `Welcome Back ${user.fname}`, data: user });
  } catch (error) {
    next(error);
  }
};

export const LogoutUser = (req, res,next) => {
   try {
    res.cookie("IDCard", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    next(error);
  }

};
export const UpdateUser = async(req, res, next) => {
 try {
    const currentUser = req.user;
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

    if (!currentUser) {
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
      currentUser._id,
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
        photo: picture || currentUser.picture,
      },
      { new: true }
    );

    res.status(200).json({ message: "Profile Updated", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { reason, feedback, confirmPassword } = req.body;

    console.log(currentUser);

    console.log(reason, feedback, confirmPassword , currentUser.password);
    
    if (!currentUser) {
      const error = new Error("User Not Found !! Login Again");
      error.statusCode = 401;
      return next(error);
    }

     const isVerified = await bcrypt.compare(confirmPassword, currentUser.password);

    if (!isVerified) {
      const error = new Error("Invalid Username or Password");
      error.statusCode = 401;
      return next(error);
    }

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      {
        gender: "N/A",
        occupation: "N/A",
        address: "N/A",
        city: "N/A",
        state: "N/A",
        district: "N/A",
        representing: "N/A",
        picture: "N/A",
        role: "N/A",
        password:"N/A",
        status: "Inactive",
      },
      { new: true }
    );

    await Deactivation.create({ userId: currentUser._id, reason, feedback });

    res.status(200).json({ message: "Sorry to see you go . . ." });
  } catch (error) {
    next(error);
  }
};


