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
