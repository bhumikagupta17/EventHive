import registrationModel from "../models/registration.model";
import eventModel from "../models/event.model";

export async function registerForEvent(req,res) {
    try{const {eventId}=req.body
    const event=await eventModel.findById(eventId)
    if(!event) return res.status(404).json({message:"event not found"})
    
   const existing=await registrationModel.findOne({event:eventId,student:req.user.id})
   if(existing) return res.status(409).json({message:"Already registered"})

    const reg=await registrationModel.create({
        event:eventId,
        student:req.user.id
    })

    res.status(201).json(reg)
    }catch(err){
        if(err.code===11000) return res.status(409).json({message:"already registered"})
        res.status(500).json({message:"Failed to register for event"})
    }
}
