const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["student","organizer"],
        default:"student"
    },
    club:{
        type:String,
        default:null
    }
},
{
    timestamps:true
})
const userModel=mongoose.model("User",userSchema)
export default userModel