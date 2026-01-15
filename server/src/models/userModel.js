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
     photo:{
        type:String,
       required:true,
        default:"",
    },
    gender:{
        type:String,
        default:"N/A",
        enum:["male","female","both","N/A"],
        required:true,
    },
     representing: {
      type: String,
      default: "N/A",
      enum: ["Bride", "Groom", "both", "N/A"],
      required: true,
    },
    occupation: {
      type: String,
      default: "N/A",
      required: true,
    },
    address: {
      type: String,
      default: "N/A",
      required: true,
    },
    city: {
      type: String,
      default: "N/A",
      required: true,
    },
    district: {
      type: String,
      default: "N/A",
      required: true,
    },
    state: {
      type: String,
      default: "N/A",
      required: true,
    },
    status:{
      type:String,
      enum:["Active","Inactive"],
      default: "Active",
      required: true,
    },
    role:{
      type:String,
      enum:["Admin","User","N/A"],
      default: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const user=mongoose.model("User", userSchema);

export default user;