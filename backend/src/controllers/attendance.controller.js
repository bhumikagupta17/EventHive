import { Parser } from "json2csv";
import eventModel from "../models/event.model";
import registrationModel from "../models/registration.model";

export async function exportAttendance(req,res) {
    try{
        const event=await eventModel.findById(req.params.id)
        if(!event) return res.status(404).json({message:"event not found"})
        
        if(event.organizer.toString()!==req.user.id){
            return res.status(403).json({message:"you dont own this event"})
        }

        const regs=await registrationModel.find({event:event._id}).populate("student","name email")

        const rows=regs.map((r)=>{
            return{
            name:r.student.name,
            email: r.student.email,
            registeredAt: r.createdAt.toISOString(),
            checkedIn: r.checkedIn?"yes":"no",
            checkedInAt: r.checkedInAt? r.checkedInAt.toISOString():""
            }
        })
        const parser=new Parser({fields:["name","email","registeredAt","checkedIn","checkedInAt"]})
        const csv=parser.parse(rows)

        res.header("content-type","text/csv")

        res.attachment(`${event.title.replace(/\s+/g,"_")}_attendance.csv`)
        res.send(csv)
    }catch(err){
        res.status(500).json({message:"Falied to export attendance"})
    }
}