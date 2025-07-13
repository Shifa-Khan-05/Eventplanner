import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import connectDB from "./src/config/db.js";
import Authrouter from "./src/routes/authRoue.js"
import UserRouter from "./src/routes/UserRouter.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";


const app= express();
app.use(cors({origin:"http://localhost:5173", credentials:true}))
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth",Authrouter);
app.use("/user",UserRouter)

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

app.listen(port,()=> {
    console.log("server started at ",port);
    connectDB();
    
})