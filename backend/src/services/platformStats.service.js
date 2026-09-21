const supabase = require("../config/supabase")

const {
    getCodeforcesStats,
} = require("./platforms/codeforces.service")


const saveCodeforcesStats = async (userId) => {
    // Get verified Codeforces account
    const {
        data: platformAccount,
        error: accountError,
    } = await supabase
        .from("platform_accounts")
        .select("id, username")
        .eq("user_id", userId)
        .eq("platform", "CODEFORCES")
        .eq("verification_status", "VERIFIED")
        .single()

    if (accountError || !platformAccount) {
        throw new Error(
            "Verified Codeforces account not found."
        )
    }

    // Fetch latest Codeforces data
    const stats = await getCodeforcesStats(
        platformAccount.username
    )

    // Save latest snapshot
    const {
        data,
        error: statsError,
    } = await supabase
        .from("platform_stats")
        .upsert(
            {
                platform_account_id:
                    platformAccount.id,

                problems_solved:
                    stats.problemsSolved,

                contest_count:
                    stats.contestsParticipated,

                current_rating:
                    stats.currentRating,

                max_rating:
                    stats.maxRating,

                contributions: 0,
                repository_count: 0,

                recorded_at:
                    new Date().toISOString(),

                updated_at:
                    new Date().toISOString(),
            },
            {
                onConflict:
                    "platform_account_id",
            }
        )
        .select()
        .single()

    if (statsError) {
        throw new Error(
            `Failed to save Codeforces stats: ${statsError.message}`
        )
    }

    return data
}


module.exports = {
    saveCodeforcesStats,
}