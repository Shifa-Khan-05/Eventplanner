import express from "express";
import { Getprofile, UpdateProfile, GetAllUsers } from "../controllers/userController.js";
import { Protect } from "../middlewares/authMiddleware.js";
import multer  from "multer";
import { deleteUser } from "../controllers/authController.js";


const upload=multer();
const router=express.Router();

router.get("/profile",Protect, Getprofile);
router.get("/all", Protect, GetAllUsers); // Should ideally add isAdmin middleware here too
router.put("/update", Protect,upload.single("picture"),UpdateProfile);
router.put("/deactivate",Protect, deleteUser);


export default router;