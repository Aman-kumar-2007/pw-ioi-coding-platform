const express = require("express")
const requireAuth = require("../middleware/auth.middleware")

const {
    getUserNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearAllNotifications,
} = require("../services/notification.service")

const router = express.Router()


router.get("/", requireAuth, async (req, res) => {
    try {
        const data = await getUserNotifications(
            req.userId
        )

        return res.json({
            success: true,
            data,
        })
    } catch (error) {
        console.error(
            "Get notifications error:",
            error
        )

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to load notifications.",
        })
    }
})


router.put(
    "/:id/read",
    requireAuth,
    async (req, res) => {
        try {
            const data =
                await markNotificationAsRead(
                    req.userId,
                    req.params.id
                )

            return res.json({
                success: true,
                data,
            })
        } catch (error) {
            console.error(
                "Mark notification read error:",
                error
            )

            return res.status(400).json({
                success: false,
                message:
                    error.message ||
                    "Failed to mark notification as read.",
            })
        }
    }
)


router.put(
    "/read-all",
    requireAuth,
    async (req, res) => {
        try {
            const data =
                await markAllNotificationsAsRead(
                    req.userId
                )

            return res.json({
                success: true,
                data,
            })
        } catch (error) {
            console.error(
                "Mark all notifications read error:",
                error
            )

            return res.status(400).json({
                success: false,
                message:
                    error.message ||
                    "Failed to mark notifications as read.",
            })
        }
    }
)


router.delete(
    "/",
    requireAuth,
    async (req, res) => {
        try {
            const data =
                await clearAllNotifications(
                    req.userId
                )

            return res.json({
                success: true,
                data,
            })
        } catch (error) {
            console.error(
                "Clear notifications error:",
                error
            )

            return res.status(400).json({
                success: false,
                message:
                    error.message ||
                    "Failed to clear notifications.",
            })
        }
    }
)


module.exports = router