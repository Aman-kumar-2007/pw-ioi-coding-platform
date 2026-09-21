const supabase = require("../config/supabase")

const {
    saveCodeforcesStats,
} = require("./platformStats.service")


const syncUserPlatforms = async (userId) => {
    // Get all verified platform accounts
    const {
        data: accounts,
        error: accountsError,
    } = await supabase
        .from("platform_accounts")
        .select("id, platform, username")
        .eq("user_id", userId)
        .eq("verification_status", "VERIFIED")

    if (accountsError) {
        throw new Error(
            `Failed to load platform accounts: ${accountsError.message}`
        )
    }

    if (!accounts || accounts.length === 0) {
        return {
            synced: [],
            failed: [],
        }
    }

    const synced = []
    const failed = []

    for (const account of accounts) {
        try {
            if (account.platform === "CODEFORCES") {
                await saveCodeforcesStats(userId)

                synced.push({
                    platform: account.platform,
                    username: account.username,
                })
            }

            // LeetCode, GFG and GitHub
            // will be added here after their
            // respective stats services are ready.
        } catch (error) {
            console.error(
                `${account.platform} sync error:`,
                error
            )

            failed.push({
                platform: account.platform,
                username: account.username,
                error: error.message,
            })
        }
    }

    return {
        synced,
        failed,
    }
}


module.exports = {
    syncUserPlatforms,
}