import express from "express"
import { requireAuth,requireRole } from "../middleware/auth"
import {getAllEvents,getEventById} from "../controllers/eventController.js"
const router=express.router()

router.get("/",getAllEvents)

router.get("/:id",getEventById)