import registrationModel from "../models/registration.model.js"
import eventModel from "../models/event.model.js"

export async function getAllEvents(req,res) {
    try{
        const {search,category}=req.query
        const query={}

        if(search) query.$text={$search:search}
        if(category && category !== "All categories") query.category=category
        
        const events=await eventModel.find(query).sort({date:1}).populate("organizer","name email")
        const shaped=await Promise.all(
            events.map(async (ev)=>{
                const isOwner=req.user && ev.organizer._id.toString()===req.user.id
                if(!isOwner) return ev.toObject();
                const attendeesCount=await registrationModel.countDocuments({event:ev._id})
                return{...ev.toObject(),attendeesCount}
            })
        )
        res.json(shaped)
    }catch(err){
        res.status(500).json({message:"Failed to fetch events"})
    }
}

export async function getEventById(req,res) {
    try{
        const event= await eventModel.findById(req.params.id).populate("organizer","name club")
        if(!event) return res.status(404).json({message:"Event not Found"})
        const isRegistrationOpen=new Date()<new Date(event.date)
        const isOwner=req.user && event.organizer._id.toString()===req.user._id
        if(!isOwner) {
            return res.status({...event.toObject(),isRegistrationOpen})
        }
        const attendeesCount=await registrationModel.countDocuments({event:event._id})

    res.json({
        ...event.toObject(),
        attendeesCount,
        isRegistrationOpen
    })
    }catch(err){
        res.status(500).json({message:"Failed to fetch"})
    }
}

export async function postEvent(req,res) {
    try{
        const {title, description, category, location, date, dateDisplay,
      bannerUrl, maxCapacity, price, isFree, organizerName, organizerEmail,}=req.body
    if(!title || !location || !date) {
        return res.status(400).json({message:"title,location,date are required"})
    }   
    const event=await eventModel.create({
       title, description, category, location, date, dateDisplay,
      bannerUrl, maxCapacity, price, isFree,
      organizerName: organizerName || req.user.name,
      organizerEmail: organizerEmail || "",
      organizer: req.user.id,
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
        const attendeesCount=regs.map((r)=>({
            id: r._id,
            name: r.student.name,
            email: r.student.email,
            ticketType: r.ticketType,
            status: r.status,
            registeredAt: r.createdAt,
        }))
        res.json(attendeesCount)
    }catch(err){
        return res.status(500).json({message:"failed to fech registrations"})
    }
}

export async function organizerEvent(req,res) {
    try{
        const events=(await eventModel.find({organizer:req.user.is})).toSorted({date:1})
        const withCounts=await Promise.all(
            events.map(async(ev)=>{
                const attendeesCount=await registrationModel.countDocuments({event:ev._id})
                return{...ev.toObject(),attendeesCount}
            })
        )
        res.json(withCounts)
    }catch(err){
        res.status(500).json({message:"Failed to fetch your events"})
    }
}