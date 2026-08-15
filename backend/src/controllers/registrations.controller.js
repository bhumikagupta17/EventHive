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

export async function deleteRegisteration(req,res) {
    try{const reg=registrationModel.findById(req.params.id)
    if(!reg) return res.status(401).json({message:"registration not found"})
        
    if(reg.student.toString()!==req.user.id){
        return res.status(403).json({message: "Not your registration"})
    }
    await reg.deleteOne()
    res.json({message:"registration. cancelled"})
    }catch(err){
        res.status(500).json({message:"faled to cancel registration"})
    }
}

export async function getHistory(req,res) {
    try{
        const regs=await registrationModel.find({student:req.user.id})
        .populate("event")
        .sort({createdAt:-1})
        res.json(regs)
    }catch(err){
        res.status(500).json({message:"Failed to fetch history"})
    }
}

export async function markCheckedIn(req,res) {
    try{
        const reg=await registrationModel.findById(req.params.id).populate("event")
        if(!reg) return res.status(401).json({message:"registration not found"})
        
            if(reg.event.organizer.toString()!==req.user.id){
                return res.status(403).json({message:"you dont own this event"})
            }

            reg.checkedIn=true
            reg.checkedInAt=Date.now()

            await reg.save()
    }catch(err){
        res.status(500).json({message:"Check-in failed"})
    }
}