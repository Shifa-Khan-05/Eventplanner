import User from "../models/userModel.js";
import bcrypt from 'bcrypt';


export const RegisterUser= async(req,res,next)=>
{
   try{
     const {fname,email,password,phn}=req.body;
    if(!fname || !email || !password || !phn)
    {
        const error=new Error("all Feilds Required");
        error.statusCode=400;
        return next(error);
    }
    const exitUser=await User.findOne({email})
    if(exitUser)
    {
         const error=new Error("Email Already Exist");
        error.statusCode=409;
        return next(error);
    }

    const hashedpassword = await bcrypt.hash(password,10);

    const newuser= await User.create({
        fname,
        email,
        password:hashedpassword,
        phn,
    });
    res.status(201).json({message:"Registration successfull"})
   }catch(error){
    next(error);
   }
};



export const LoginUser= async (req,res,next)=>
{
    try {
        const{emaill,password}=req.body;
        if(!emaill || !password){
        const error=new Error("All fields are required");
        error.statusCode=400;
        return next(error);   
        }
     const user=await User.findOne({emaill});
     if(!user)
     {
        const error=new Error("user Not registered");
        error.statusCode=409;
        return next(error); 
     }

     const isverified=await bcrypt.compare(password,user.password);
     if(!isverified)
     {
         const error=new Error("Invalid username ");
        error.statusCode= 401;
        return next(error); 
     }
     res.status(200).json({message:`Welcome Back ${user.name}`,data:user})

    } catch (error) {
        next(error);
    }
};



export const LogoutUser=(req,res)=>
{
    
};
export const UpdateUser=(req,res)=>
{
    
};