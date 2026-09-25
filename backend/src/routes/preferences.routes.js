const express = require("express")

const requireAuth =
    require("../middleware/auth.middleware")

const {
    getUserPreferences,
    updateUserPreferences,
} = require("../services/preferences.service")


const router = express.Router()


/* ============================================================= */
/* GET PREFERENCES                                               */
/* ============================================================= */

router.get(
    "/",
    requireAuth,
    async (req, res) => {
        try {
            const data =
                await getUserPreferences(
                    req.userId
                )


            return res.json({
                success: true,
                data,
            })
        } catch (error) {
            console.error(
                "Get preferences error:",
                error
            )

            return res.status(500).json({
                success: false,
                message:
                    error.message ||
                    "Failed to load preferences.",
            })
        }
    }
)


/* ============================================================= */
/* UPDATE PREFERENCES                                            */
/* ============================================================= */

router.put(
    "/",
    requireAuth,
    async (req, res) => {
        try {
            const data =
                await updateUserPreferences(
                    req.userId,
                    req.body || {}
                )


            return res.json({
                success: true,
                data,
            })
        } catch (error) {
            console.error(
                "Update preferences error:",
                error
            )

            return res.status(400).json({
                success: false,
                message:
                    error.message ||
                    "Failed to update preferences.",
            })
        }
    }
)


module.exports = router