import mongoose from "mongoose";


const userSchema =mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
     email:{
        type:String,
        required:true,
        unique:true
    },
     password:{
        type:String,
        required:true,
    },
     phn:{
        type:String,
        required:true,
    },
},
{timestamps:true}
);

const user=mongoose.model("user", userSchema);

export default user;