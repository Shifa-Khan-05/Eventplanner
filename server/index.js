import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import connectDB from "./src/config/db.js";
import Authrouter from "./src/routes/authRoue.js"
import morgan from "morgan";

const app= express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/auth",Authrouter);

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