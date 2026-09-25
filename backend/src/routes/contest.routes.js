const express = require("express")

const requireAuth = require("../middleware/auth.middleware")

const {
    getUpcomingContests,
    getPastContests,
} = require("../services/contest.service")

const router = express.Router()


// =====================================================
// UPCOMING CONTESTS
// =====================================================

router.get(
    "/upcoming",
    requireAuth,
    async (req, res) => {
        try {
            const data =
                await getUpcomingContests()

            return res.json({
                success: true,
                data,
            })
        } catch (error) {
            console.error(
                "Upcoming contests error:",
                error
            )

            return res.status(500).json({
                success: false,
                message:
                    error.message ||
                    "Failed to load upcoming contests.",
            })
        }
    }
)


// =====================================================
// PAST CONTESTS
// =====================================================

router.get(
    "/past",
    requireAuth,
    async (req, res) => {
        try {
            const data =
                await getPastContests(
                    req.userId
                )

            return res.json({
                success: true,
                data,
            })
        } catch (error) {
            console.error(
                "Past contests error:",
                error
            )

            return res.status(500).json({
                success: false,
                message:
                    error.message ||
                    "Failed to load past contests.",
            })
        }
    }
)


module.exports = router