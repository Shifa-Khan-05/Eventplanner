import express from "express";
import { RegisterUser } from "../controllers/authController.js";
import { LoginUser } from "../controllers/authController.js";
import { LogoutUser } from "../controllers/authController.js";
 

const router=express.Router();
router.post("/register",RegisterUser);
router.post("/login",LoginUser);
router.get("/logout",LogoutUser);

export default router;