import registrationModel from "../models/registration.model.js"
import eventModel from "../models/event.model.js"

export async function getAllEvents(req,res) {
    try{
        const {search,category,club,from,to,page=1,limit=12}=req.query
        const query={}

        if(search) query.$text={$search:search}
        if(category) query.category=category
        if(club) query.club=club
        if(from || to){
            query.date={}
            if(from) query.date.$gte=new Date(from)
            if(to) query.date.$lte=new Date(to)
        }
        
        const skip=(Number(page)-1)*Number(limit)
        const [events,total]=await Promise.all([
            eventModel.find(query).sort({date:1}).skip(skip).limit(Number(limit)).populate("organizer", "name club"),
            eventModel.countDocuments(query)
        ])
        res.json({events,total,page:Number(page),pages: Math.ceil(total / Number(limit))})
    }catch(err){
        res.status(500).json({message:"Failed to fetch events"})
    }
}

export async function getEventById(req,res) {
    try{
        const event= await eventModel.findById(req.params.id).populate("organizer","name club")
        if(!event) return res.status(404).json({message:"Event not Found"})
        const isRegistrationOpen=new Date()<new Date(event.date)
    res.json({
        ...event.toObject(),
        isRegistrationOpen
    })
    }catch(err){
        res.status(500).json({message:"Failed to fetch"})
    }
}

export async function postEvent(req,res) {
    try{
        const {title,club,description,venue,date,imageUrl,category}=req.body
    if(!title || !venue || !date) {
        return res.status(400).json({message:"title,venue,date are required"})
    }   
    const event=await eventModel.create({
        title,description,club,venue,date,category,imageUrl,
        organizer:req.user.id
    })
    res.status(200).json(event)
    }catch(err){
        res.status(500).json({message:"Failed to create event"})
    }
    
}

export async function updateEvent(req,res) {
    try{const event=eventModel.findById(req.params.id)

    if(!event){
        return res.status(404).json({message:"Event not found"})
    }
    if(event.organizer.toString()!== req.user.id){
        return res.status(403).json({message:"You dont own this event"})
    }
    Object.assign(event,req.body)
    await event.save()
    res.json(event)
    }catch(err){
        res.status(500).json({message:"Failed to update event"})
    }

}

export async function deleteEvent(req,res) {
    try{
        const event=await eventModel.findById(req.params.id)
        if(!event) return res.status(404).json({message:"Event not found"})
        if(event.organizer.toString()!==req.user.id){
            return res.status(403).json({message:"You dont own this event"})
        }
        await event.deleteOne()
        await registrationModel.deleteMany({event:event._id})
        res.json({message:"Event deleted"})

    }catch(err){
        return res.status(500).json({message:"failed to delete event"})
    }
}

export async function getRegistrations(req,res) {
    try{
        const event=await eventModel.findById(req.params.id)
        if(!event) return res.status(404).json({message:"event not found"})
        if(event.organizer.toString()!==req.user.id){
            return res.status(403).json({message:"you dont own this event"})
        }

        const regs=await registrationModel.find({event:event.__id}).populate("student","name email")
        res.json(regs)
    }catch(err){
        return res.status(500).json({message:"failed to fech registrations"})
    }
}