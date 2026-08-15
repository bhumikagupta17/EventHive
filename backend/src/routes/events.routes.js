import express from "express"
import { requireAuth,requireRole } from "../middleware/auth.middleware.js"
import {getAllEvents,getEventById,postEvent,updateEvent
    ,deleteEvent,getRegistrations
} from "../controllers/event.controller.js"
const router=express.Router()

router.get("/",getAllEvents)

router.get("/:id",getEventById)

router.post("/",requireAuth,requireRole("organizer"),postEvent)

router.put("/:id",requireAuth,requireRole("organizer"),updateEvent)

router.delete("/:id",requireAuth,requireRole("organizer"),deleteEvent)

router.get("/:id",requireAuth,requireRole("organizer"),getRegistrations)

export default router