const express = require("express")
const requireAuth = require("../middleware/auth.middleware")
const {
    getStudentProfile,
} = require("../services/studentProfile.service")

const router = express.Router()

router.get(
    "/:username",
    requireAuth,
    async (req, res) => {
        try {
            const data =
                await getStudentProfile(
                    req.params.username
                )

            res.status(200).json(data)
        } catch (error) {
            console.error(
                "Student profile error:",
                error
            )

            res.status(
                error.statusCode || 500
            ).json({
                message:
                    error.message ||
                    "Failed to load student profile.",
                })
        }
    }
)

module.exports = router