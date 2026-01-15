import express from "express";
import { ContactUs } from "../controllers/publicController.js";


const router = express.Router();

router.post("/ContactUs", ContactUs);


export default router;