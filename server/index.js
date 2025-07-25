import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import connectDB from "./src/config/db.js";
import Authrouter from "./src/routes/authRoue.js"
import UserRouter from "./src/routes/UserRouter.js";
import PublicRouter from "./src/routes/publicRoute.js"
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import cloudinary from "./src/config/cloudinary.js";


const app= express();
app.use(cors({origin:"http://localhost:5173", credentials:true}))
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", Authrouter);
app.use("/user", UserRouter);
app.use("/public", PublicRouter);

app.get("/",(req,res)=>
{
    res.json({message:"server connected"});
})

app.use((err,req,res,next)=>{
    const errorMessage=err.message || "Internal server error"
    const errorCode=err.statusCode || 500
    res.status(errorCode).json({message:errorMessage})
})

const port =process.env.PORT || 5000;

app.listen(port, async()=> {
    console.log("server started at ",port);
    try {
        await connectDB();
        await cloudinary.api.resources({max_results:1});
        console.log("Cloudinary Connected");
        
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
    
});