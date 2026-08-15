import express from "express"
import {registerForEvent,deleteRegisteration,markCheckedIn,getHistory} from "../controllers/registrations.controller.js"
import { requireAuth,requireRole } from "../middleware/auth.middleware"
const router=express.Router()

router.post("/",requireAuth,requireRole("student"),registerForEvent)

router.get("/me",requireAuth,requireRole("student"),getHistory)

router.delete("/:id",requireAuth,requireRole("student"),deleteRegisteration)

router.patch("/:id/checkin",requireAuth,requireRole("organizer"),markCheckedIn)

export default router