import express from "express"
import { requireAuth,requireRole } from "../middleware/auth.js"
import {getAllEvents,getEventById,postEvent} from "../controllers/eventController.js"
const router=express.Router()

router.get("/",getAllEvents)

router.get("/:id",getEventById)

router.post("/",requireAuth,requireRole("organizer"),postEvent)

export default router