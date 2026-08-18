import express from "express"
import { requireAuth,requireRole,attachUserIfPresent } from "../middleware/auth.middleware.js"
import {getAllEvents,getEventById,postEvent,updateEvent
    ,deleteEvent,getRegistrations,organizerEvent
} from "../controllers/event.controller.js"
const router=express.Router()

router.get("/",attachUserIfPresent,getAllEvents)

router.get("/:id",attachUserIfPresent,getEventById)

router.post("/",requireAuth,requireRole("organizer"),postEvent)

router.put("/:id",requireAuth,requireRole("organizer"),updateEvent)

router.delete("/:id",requireAuth,requireRole("organizer"),deleteEvent)

router.get("/:id",requireAuth,requireRole("organizer"),getRegistrations)

router.get("/mine/list",requireAuth,requireRole("organizer"),organizerEvent)

export default router