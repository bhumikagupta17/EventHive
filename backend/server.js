import dotenv from "dotenv"
dotenv.config()
import connectDB from "./src/db/db.js"
import app from "./src/app.js"
import authRoutes from "./src/routes/auth.routes.js"
import eventRoutes from "./src/routes/events.routes.js"
connectDB()

app.get("/api/health",(req,res)=> res.json({status:"ok"}))
app.use("/api/auth",authRoutes)
app.use("/api/events",eventRoutes)

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server connected on port ${process.env.PORT || 5000}`)
})