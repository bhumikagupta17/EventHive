import express from "express"
import {registerForEvent} from "../controllers/registrations.controller.js"
import { requireAuth,requireRole } from "../middleware/auth.middleware"
const router=express.Router()

router.post("/",requireAuth,requireRole("student"),registerForEvent)


export default router