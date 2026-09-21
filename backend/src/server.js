const express = require("express")
const cors = require("cors")
require("dotenv").config()

const supabase = require("./config/supabase")
const verificationRoutes = require("./routes/verification.routes")

const app = express()

app.use(cors())
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
    console.log(`CodeSync Backend running on port ${PORT}`)
})

