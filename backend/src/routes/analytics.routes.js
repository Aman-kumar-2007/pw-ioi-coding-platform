const express = require("express")
const requireAuth = require("../middleware/auth.middleware")
const {
    getAnalyticsSummary,
} = require("../services/analytics.service")

const router = express.Router()

router.get("/", requireAuth, async (req, res) => {
    try {
        const data = await getAnalyticsSummary(req.userId)

        return res.json({
            success: true,
            data,
        })
    } catch (error) {
        console.error("Analytics error:", error)

        return res.status(500).json({
            success: false,
            message: "Failed to load analytics data.",
        })
    }
})

module.exports = router
