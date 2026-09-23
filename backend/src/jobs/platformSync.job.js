const cron = require("node-cron")
const supabase = require("../config/supabase")
const { syncUserPlatforms } = require("../services/platformSync.service")

const runPlatformSync = async () => {
    console.log("Starting scheduled platform sync...")

    const {
        data: accounts,
        error,
    } = await supabase
        .from("platform_accounts")
        .select("user_id")
        .eq("verification_status", "VERIFIED")

    if (error) {
        throw new Error(
            `Failed to load verified accounts: ${error.message}`
        )
    }

    const userIds = [
        ...new Set(
            (accounts || []).map(
                (account) => account.user_id
            )
        ),
    ]

    console.log(
        `Found ${userIds.length} users to sync.`
    )

    for (const userId of userIds) {
        try {
            await syncUserPlatforms(userId)

            console.log(
                `Platform sync completed for user: ${userId}`
            )
        } catch (error) {
            console.error(
                `Platform sync failed for user ${userId}:`,
                error.message
            )
        }
    }

    console.log("Scheduled platform sync completed.")
}

const startPlatformSyncJob = () => {
    // Run once immediately when server starts
    runPlatformSync().catch((error) => {
        console.error(
            "Initial platform sync failed:",
            error
        )
    })

    // Then run every 6 hours
    cron.schedule("0 */6 * * *", async () => {
        try {
            await runPlatformSync()
        } catch (error) {
            console.error(
                "Scheduled platform sync failed:",
                error
            )
        }
    })

    console.log(
        "Platform sync scheduler started. Runs every 6 hours."
    )
}

module.exports = {
    startPlatformSyncJob,
}
