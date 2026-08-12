import registrationModel from "../models/registration"
import eventModel from "../models/event"

export default async function getAllEvents(req,res) {
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
            Event.find(query).sort({date:1}).skip(skip).limit(Number(limit)).populate("organizer", "name club"),
            Event.countDocuments(query)
        ])
        res.json({events,total,page:Number(page),pages: Math.ceil(total / Number(limit))})
    }catch(err){
        res.status(500).json({message:"Failed to fetch events"})
    }
}

export default async function getEventById(req,res) {
    try{
        const event= await Event.findById(req.params.id).populate("organizer","name club")
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

