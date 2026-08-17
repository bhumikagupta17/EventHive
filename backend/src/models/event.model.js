import mongoose from "mongoose";

const eventSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    location:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    dateDisplay:{
        type:String,
        required:true
    },
    bannerUrl:{
        type:String,
        default:""
    },
    category: { 
        type: String, 
        default: "General" 
    },
    imageUrl: { 
        type: String, 
        default: "" 
    },
    organizer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    price: { type: String, default: "Free" },
    isFree: { type: Boolean, default: true },
    organizerName: { type: String, required: true },
    organizerEmail: { type: String, default: "" },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
},{
    timestamps:true
})
// compound text index
eventSchema.index({title:"text",club:"text",category:"text"})
const eventModel=mongoose.model("Event",eventSchema)
export default eventModel