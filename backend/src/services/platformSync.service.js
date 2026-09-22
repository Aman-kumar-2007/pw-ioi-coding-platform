const supabase = require("../config/supabase")

const {
    saveCodeforcesStats,
    saveLeetCodeStats,
    saveGfgStats,
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

            if (account.platform === "LEETCODE") {
                await saveLeetCodeStats(userId)

                synced.push({
                    platform: account.platform,
                    username: account.username,
                })
            }

            if (account.platform === "GFG") {
                await saveGfgStats(userId)

                synced.push({
                    platform: account.platform,
                    username: account.username,
                })
            }

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