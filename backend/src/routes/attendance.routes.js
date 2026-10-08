import express from "express"
const router=express.Router()
import { requireAuth, requireRole } from "../middleware/auth.middleware.js"
import { exportAttendance } from "../controllers/attendance.controller.js"

router.get("/:eventId.csv",requireAuth,requireRole("organizer"),exportAttendance)
export default router