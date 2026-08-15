import express from "express"
import { requireAuth,requireRole } from "../middleware/auth.middleware.js"
import {getAllEvents,getEventById,postEvent,updateEvent} from "../controllers/event.controller.js"
const router=express.Router()

router.get("/",getAllEvents)

router.get("/:id",getEventById)

router.post("/",requireAuth,requireRole("organizer"),postEvent)

router.put("/:id",requireAuth,requireRole("organizer"),updateEvent)

export default router