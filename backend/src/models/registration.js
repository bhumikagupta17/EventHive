import mongoose from "mongoose";
 const registrationSchema=new mongoose.Schema({
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:true
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    checkedIn:{
        type:Boolean,
        default:false
    },
    checkedInAt:{
        type:Date,
        default:null
    }
 },
{timestamps:true})

registrationSchema.index({ event: 1, student: 1 }, { unique: true })
const registrationModel=mongoose.model("Registration",registrationSchema)
export default registrationModel