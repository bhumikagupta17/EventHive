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
    club:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
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
    }
},{
    timestamps:true
})
// compound text index
eventSchema.index({title:"text",club:"text",category:"text"})
const eventModel=mongoose.model("Event",eventSchema)
export default eventModel