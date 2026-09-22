const supabase = require("../config/supabase")

const {
    getCodeforcesStats,
    saveCodeforcesDailyActivity,
} = require("./platforms/codeforces.service")

const {
    getLeetCodeStats,
    getLeetCodeContestStats,
    getLeetCodeCalendar,
} = require("./platforms/leetcode.service")

const {
    getGfgStats,
} = require("./platforms/gfg.service")

const {
    getGithubStats,
    saveGithubDailyActivity,
} = require("./platforms/github.service")

const { saveDailyActivity } = require("./dailyActivity.service")

const saveCodeforcesStats = async (userId) => {
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

    await saveCodeforcesDailyActivity(
        userId,
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

    const calendar = await getLeetCodeCalendar(
        platformAccount.username
    )

    await saveDailyActivity(
        userId,
        "LEETCODE",
        calendar.activities
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

const saveGfgStats = async (userId) => {
    const {
        data: platformAccount,
        error: accountError,
    } = await supabase
        .from("platform_accounts")
        .select("id, username")
        .eq("user_id", userId)
        .eq("platform", "GFG")
        .eq("verification_status", "VERIFIED")
        .single()

    if (accountError || !platformAccount) {
        throw new Error(
            "Verified GFG account not found."
        )
    }

    const stats = await getGfgStats(
        platformAccount.username
    )

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

                basic_solved:
                    stats.basicSolved,

                easy_solved:
                    stats.easySolved,

                medium_solved:
                    stats.mediumSolved,

                hard_solved:
                    stats.hardSolved,

                contest_count: 0,

                contributions: 0,

                repository_count: 0,

                current_rating: null,

                max_rating: null,

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
            `Failed to save GFG stats: ${statsError.message}`
        )
    }

    return data
}


const saveGithubStats = async (userId) => {
    const {
        data: platformAccount,
        error: accountError,
    } = await supabase
        .from("platform_accounts")
        .select("id, username")
        .eq("user_id", userId)
        .eq("platform", "GITHUB")
        .eq("verification_status", "VERIFIED")
        .single()

    if (accountError) {
        console.error(
            "GitHub platform account query error:",
            accountError
        )

        throw new Error(
            `GitHub account query failed: ${accountError.message}`
        )
    }

    const stats = await getGithubStats(
        platformAccount.username
    )

    const {
        data,
        error: statsError,
    } = await supabase
        .from("platform_stats")
        .upsert(
            {
                platform_account_id:
                    platformAccount.id,

                problems_solved: 0,

                basic_solved: 0,

                easy_solved: 0,

                medium_solved: 0,

                hard_solved: 0,

                contest_count: 0,

                contributions: 0,

                repository_count:
                    stats.repositories,

                current_rating: null,

                max_rating: null,

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
            `Failed to save GitHub stats: ${statsError.message}`
        )
    }

    const dailyActivity = await saveGithubDailyActivity(
        userId,
        platformAccount.username
    )

    const { error: contributionUpdateError } = await supabase
        .from("platform_stats")
        .update({
            contributions: dailyActivity.totalContributions,
            updated_at: new Date().toISOString(),
        })
        .eq("platform_account_id", platformAccount.id)

    if (contributionUpdateError) {
        throw new Error(
            `Failed to update GitHub contributions: ${contributionUpdateError.message}`
        )
    }


    return {
        ...data,

        pullRequests:
            stats.pullRequests,

        followers:
            stats.followers,

        following:
            stats.following,
    }
}

module.exports = {
    saveCodeforcesStats,
    saveLeetCodeStats,
    saveGfgStats,
    saveGithubStats,
}