const supabase = require("../config/supabase")

// =========================================================
// ACTIVITY AGGREGATION
// =========================================================

const aggregateActivity = (rows = []) => {
    const weekly = {}
    const monthly = {}
    const yearly = {}

    // Current date in India
    const todayKey = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
    }).format(new Date())

    const today = new Date(`${todayKey}T00:00:00Z`)

    // Sunday = 0, Monday = 1, ...
    const dayOfWeek = today.getUTCDay()

    // Find Monday of current week
    const daysFromMonday = (dayOfWeek + 6) % 7

    const monday = new Date(today)
    monday.setUTCDate(today.getUTCDate() - daysFromMonday)

    const weekOrder = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
    ]

    // =====================================================
    // CURRENT WEEK
    // =====================================================

    for (let i = 0; i < 7; i++) {
        const date = new Date(monday)

        date.setUTCDate(monday.getUTCDate() + i)

        const dateKey = date.toISOString().split("T")[0]

        weekly[dateKey] = {
            label: weekOrder[i],
            submissions: 0,
        }
    }

    // =====================================================
    // MONTHLY + YEARLY
    // =====================================================

    for (const row of rows) {
        const dateKey = row.activity_date
        const submissions = row.submission_count || 0

        // -----------------------------
        // Weekly
        // -----------------------------

        if (weekly[dateKey]) {
            weekly[dateKey].submissions += submissions
        }

        // -----------------------------
        // Yearly
        // -----------------------------

        const year = dateKey.slice(0, 4)

        yearly[year] =
            (yearly[year] || 0) + submissions

        // -----------------------------
        // Monthly
        // Current year only
        // -----------------------------

        if (year === todayKey.slice(0, 4)) {
            const month = Number(
                dateKey.slice(5, 7)
            )

            monthly[month] =
                (monthly[month] || 0) + submissions
        }
    }

    // =====================================================
    // MONTHLY DATA
    // =====================================================

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

    const monthlyData = monthOrder.map(
        (label, index) => ({
            label,
            submissions:
                monthly[index + 1] || 0,
        })
    )

    // =====================================================
    // YEARLY DATA
    // =====================================================

    const yearlyData = Object.keys(yearly)
        .sort()
        .map((label) => ({
            label,
            submissions: yearly[label],
        }))

    // =====================================================
    // FINAL RESULT
    // =====================================================

    return {
        weekly: weekOrder.map(
            (label, index) => {
                const date = new Date(monday)

                date.setUTCDate(
                    monday.getUTCDate() + index
                )

                const dateKey =
                    date.toISOString().split("T")[0]

                return {
                    label,
                    submissions:
                        weekly[dateKey]
                            ?.submissions || 0,
                }
            }
        ),

        monthly: monthlyData,

        yearly: yearlyData,
    }
}


// =========================================================
// ANALYTICS SUMMARY
// =========================================================

const getAnalyticsSummary = async (userId) => {

    // =====================================================
    // VERIFIED PLATFORM ACCOUNTS
    // =====================================================

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


    // =====================================================
    // PLATFORM STATS
    // =====================================================

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
            .in(
                "platform_account_id",
                accountIds
            )

        if (statsError) {
            throw new Error(
                `Failed to load platform stats: ${statsError.message}`
            )
        }

        platformStats = data || []
    }


    const statsByAccountId =
        new Map(
            platformStats.map((stats) => [
                stats.platform_account_id,
                stats,
            ])
        )


    // =====================================================
    // SUMMARY VALUES
    // =====================================================

    let totalProblemsSolved = 0
    let totalContests = 0
    let currentRating = null

    let basicSolved = 0
    let easySolved = 0
    let mediumSolved = 0
    let hardSolved = 0

    const platforms = []


    // =====================================================
    // PLATFORM DATA
    // =====================================================

    for (const account of accounts || []) {

        const stats =
            statsByAccountId.get(account.id)

        if (!stats) continue


        // GitHub is not a problem-solving platform
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


        // Current rating
        if (
            account.platform === "CODEFORCES" ||
            account.platform === "LEETCODE"
        ) {

            if (
                stats.current_rating != null
            ) {
                currentRating =
                    stats.current_rating
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


    // =====================================================
    // DAILY ACTIVITY
    // =====================================================

    const {
        data: activity,
        error: activityError,
    } = await supabase
        .from("daily_activity")
        .select(
            `
            activity_date,
            platform,
            problem_count,
            submission_count,
            contribution_count
            `
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


    // =====================================================
    // STREAK
    // =====================================================

    const activeDates = new Set(
        (activity || [])
            .filter(
                (day) =>
                    (day.problem_count || 0) > 0 ||
                    (day.submission_count || 0) > 0 ||
                    (day.contribution_count || 0) > 0
            )
            .map(
                (day) => day.activity_date
            )
    )


    let streak = 0

    const currentDate = new Date()

    while (true) {

        const dateKey =
            currentDate.toLocaleDateString(
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


    // =====================================================
    // SUBMISSION ACTIVITY
    // =====================================================

    const aggregatedActivity =
        aggregateActivity(activity || [])


    // =====================================================
    // FINAL RESPONSE
    // =====================================================

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

        activity:
            aggregatedActivity,
    }
}


module.exports = {
    getAnalyticsSummary,
}