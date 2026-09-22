const express = require("express")
const cors = require("cors")
require("dotenv").config()

const supabase = require("./config/supabase")
const verificationRoutes = require("./routes/verification.routes")

const {
    startPlatformSyncJob,
} = require("./jobs/platformSync.job")

const app = express()

const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}

app.use(cors(corsOptions))
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "CodeSync Backend Running",
    })
})

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        backend: "connected",
        supabase: "configured",
    })
})

app.use("/api/verification", verificationRoutes)

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(
        `CodeSync Backend running on port ${PORT}`
    )
    startPlatformSyncJob()
})

