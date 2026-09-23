const supabase = require("../config/supabase")

const aggregateActivity = (rows = []) => {
    // GitHub ko problem-solving activity se exclude karna hai
    const codingRows = rows.filter(
        (row) => row.platform !== "GITHUB"
    )

    const getCount = (row) =>
        row.problem_count ||
        row.submission_count ||
        0

    const weekly = {}
    const monthly = {}
    const yearly = {}

    for (const row of codingRows) {
        const date = new Date(`${row.activity_date}T00:00:00`)
        const count = getCount(row)

        // Weekly
        const day = date.toLocaleDateString("en-US", {
            weekday: "short",
        })

        if (!weekly[day]) {
            weekly[day] = 0
        }

        weekly[day] += count

        // Monthly
        const month = date.toLocaleDateString("en-US", {
            month: "short",
        })

        if (!monthly[month]) {
            monthly[month] = 0
        }

        monthly[month] += count

        // Yearly
        const year = date.getFullYear().toString()

        if (!yearly[year]) {
            yearly[year] = 0
        }

        yearly[year] += count
    }

    const weekOrder = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
    ]

    const monthOrder = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]

    return {
        weekly: weekOrder.map((label) => ({
            label,
            problems: weekly[label] || 0,
        })),

        monthly: monthOrder.map((label) => ({
            label,
            problems: monthly[label] || 0,
        })),

        yearly: Object.keys(yearly)
            .sort()
            .map((label) => ({
                label,
                problems: yearly[label],
            })),
    }
}

const getAnalyticsSummary = async (userId) => {
    // Get current user's verified platform accounts
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

    const accountIds = (accounts || []).map(
        (account) => account.id
    )

    // Get platform stats
    let platformStats = []

    if (accountIds.length > 0) {
        const {
            data,
            error: statsError,
        } = await supabase
            .from("platform_stats")
            .select(
                `
                platform_account_id,
                problems_solved,
                basic_solved,
                easy_solved,
                medium_solved,
                hard_solved,
                contest_count,
                contributions,
                repository_count,
                current_rating,
                max_rating
                `
            )
            .in("platform_account_id", accountIds)

        if (statsError) {
            throw new Error(
                `Failed to load platform stats: ${statsError.message}`
            )
        }

        platformStats = data || []
    }

    const statsByAccountId = new Map(
        platformStats.map((stats) => [
            stats.platform_account_id,
            stats,
        ])
    )

    let totalProblemsSolved = 0
    let totalContests = 0
    let currentRating = null

    let basicSolved = 0
    let easySolved = 0
    let mediumSolved = 0
    let hardSolved = 0

    const platforms = []

    for (const account of accounts || []) {
        const stats = statsByAccountId.get(account.id)

        if (!stats) continue

        if (account.platform !== "GITHUB") {
            totalProblemsSolved +=
                stats.problems_solved || 0

            totalContests +=
                stats.contest_count || 0

            basicSolved +=
                stats.basic_solved || 0

            easySolved +=
                stats.easy_solved || 0

            mediumSolved +=
                stats.medium_solved || 0

            hardSolved +=
                stats.hard_solved || 0
        }

        if (
            account.platform === "CODEFORCES" ||
            account.platform === "LEETCODE"
        ) {
            if (stats.current_rating != null) {
                currentRating = stats.current_rating
            }
        }

        platforms.push({
            platform: account.platform,
            username: account.username,

            problemsSolved:
                stats.problems_solved || 0,

            basicSolved:
                stats.basic_solved || 0,

            easySolved:
                stats.easy_solved || 0,

            mediumSolved:
                stats.medium_solved || 0,

            hardSolved:
                stats.hard_solved || 0,

            contests:
                stats.contest_count || 0,

            currentRating:
                stats.current_rating,

            maxRating:
                stats.max_rating,

            contributions:
                stats.contributions || 0,

            repositories:
                stats.repository_count || 0,
        })
    }

    // Get user's activity
    const {
        data: activity,
        error: activityError,
    } = await supabase
        .from("daily_activity")
        .select(
            "activity_date, platform, problem_count, submission_count, contribution_count"
        )
        .eq("user_id", userId)
        .order("activity_date", {
            ascending: true,
        })

    if (activityError) {
        throw new Error(
            `Failed to load activity: ${activityError.message}`
        )
    }

    // Calculate current streak
    const activeDates = new Set(
        (activity || [])
            .filter(
                (day) =>
                    (day.problem_count || 0) > 0 ||
                    (day.submission_count || 0) > 0 ||
                    (day.contribution_count || 0) > 0
            )
            .map((day) => day.activity_date)
    )

    let streak = 0

    const currentDate = new Date()

    while (true) {
        const dateKey = currentDate.toLocaleDateString(
            "en-CA",
            {
                timeZone: "Asia/Kolkata",
            }
        )

        if (!activeDates.has(dateKey)) {
            break
        }

        streak++

        currentDate.setDate(
            currentDate.getDate() - 1
        )
    }

    // Aggregate activity for charts
    const aggregatedActivity =
        aggregateActivity(activity || [])

    return {
        summary: {
            totalProblemsSolved,
            totalContests,
            currentRating,
            streak,
        },

        difficulty: {
            basic: basicSolved,
            easy: easySolved,
            medium: mediumSolved,
            hard: hardSolved,
        },

        platforms,

        activity: aggregatedActivity,
    }
}

module.exports = {
    getAnalyticsSummary,
}