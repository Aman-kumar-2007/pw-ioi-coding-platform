const express = require("express")

const {
    resolveUsername,
} = require("../services/auth.service")

const router = express.Router()

router.post("/resolve-username", async (req, res) => {
    try {
        const data = await resolveUsername(
            req.body?.username
        )

        return res.json({
            success: true,
            data,
        })
    } catch (error) {
        console.error(
            "Resolve username error:",
            error
        )

        return res.status(
            error.statusCode || 500
        ).json({
            success: false,
            message:
                error.message ||
                "Failed to resolve username.",
        })
    }
})

module.exports = router