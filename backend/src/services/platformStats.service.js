const supabase = require("../config/supabase")

const {
    getCodeforcesStats,
} = require("./platforms/codeforces.service")

const {
    getLeetCodeStats,
    getLeetCodeContestStats,
} = require("./platforms/leetcode.service")

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


const saveLeetCodeStats = async (userId) => {
    const {
        data: platformAccount,
        error: accountError,
    } = await supabase
        .from("platform_accounts")
        .select("id, username")
        .eq("user_id", userId)
        .eq("platform", "LEETCODE")
        .eq("verification_status", "VERIFIED")
        .single()

    if (accountError || !platformAccount) {
        throw new Error(
            "Verified LeetCode account not found."
        )
    }

    const stats = await getLeetCodeStats(
        platformAccount.username
    )

    const contestStats =
        await getLeetCodeContestStats(
            platformAccount.username
        )

    const rating =
        contestStats.ranking?.rating != null
            ? Math.round(contestStats.ranking.rating)
            : null

    const contestCount =
        contestStats.ranking?.attendedContestsCount || 0

    const ratings = contestStats.history
        .filter(
            (contest) =>
                contest.attended &&
                typeof contest.rating === "number"
        )
        .map((contest) => contest.rating)

    const maxRating =
        ratings.length > 0
            ? Math.round(Math.max(...ratings))
            : rating

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

                basic_solved: 0,

                easy_solved:
                    stats.easySolved,

                medium_solved:
                    stats.mediumSolved,

                hard_solved:
                    stats.hardSolved,

                contest_count:
                    contestCount,

                contributions: 0,

                repository_count: 0,

                current_rating:
                    rating,

                max_rating:
                    maxRating,

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
            `Failed to save LeetCode stats: ${statsError.message}`
        )
    }

    return data
}


module.exports = {
    saveCodeforcesStats,
    saveLeetCodeStats,
}