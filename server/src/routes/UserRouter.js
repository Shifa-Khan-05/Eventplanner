import express from "express";
import { Getprofile } from "../controllers/userController.js";
import { Protect } from "../middlewares/authMiddleware.js";


const router=express.Router();

router.get("/profile",Protect, Getprofile);


export default router;