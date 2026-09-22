const express = require("express")
const requireAuth = require("../middleware/auth.middleware")
const {
    getLeaderboard,
} = require("../services/leaderboard.service")

const router = express.Router()

router.get("/", requireAuth, async (req, res) => {
    try {
        const data = await getLeaderboard(req.userId)

        return res.json({
            success: true,
            data,
        })
    } catch (error) {
        console.error("Leaderboard error:", error)

        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

module.exports = router