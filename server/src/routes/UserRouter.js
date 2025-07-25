import express from "express";
import { Getprofile, UpdateProfile } from "../controllers/userController.js";
import { Protect } from "../middlewares/authMiddleware.js";
import multer  from "multer";
import { deleteUser } from "../controllers/authController.js";
import { UpdateUser } from "../controllers/authController.js";


const upload=multer();
const router=express.Router();

router.get("/profile",Protect, Getprofile);
router.put("/update", Protect,upload.single("picture"),UpdateUser);
router.put("/deactivate",Protect, deleteUser);


export default router;