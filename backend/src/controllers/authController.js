import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../models/user.js";

function signToken(user) {
    return jwt.sign(
        {id:user._id,
            role:user.role,
            name:user.name
        },
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    )
}

async function signup(req,res) {
    try{
        const {name,email,password,role,club}=req.body
        if(!name || !email ||!password){
            return res.status(400).json({message:"Name, email, and password are required"})
        }
        const existing=await userModel.findOne({
            email:email.toLowerCase()
        })
        if(existing) return res.status(409).json({message:"Email already registered"})
        const hashed=await bcrypt.hash(password,10)
    const user=await userModel.create({
        name,
        email:email.toLowerCase(),
        password:hashed,
        role:role==="organizer"?"organizer":"student",
        club: role==="organizer"?club||null:null
    })
    const token=signToken(user)
    res.status(201).json({
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role, club: user.club }

    })
    }catch(err){
        res.status(500).json({messgage:"signup failed",error:err.message})
    }
}

async function login(req,res){
    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email:email.toLowerCase()})
        if(!user) return res.status(401).json({message:"Invalid credentials"})
        const match=await bcrypt.compare(password,user.password)
        if(!match) return res.status(401).json({message:"Invalid credentials"})
        const token=signToken(user)
    res.json({
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role, club: user.club },
    })
    }catch(err){
        res.status(500).json({ message: "Login failed", error: err.message });
    }
}

export default {login,signup}