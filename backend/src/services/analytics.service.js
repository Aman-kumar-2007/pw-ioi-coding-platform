const supabase = require("../config/supabase")

const {
    getLeetCodeTopicStats,
} = require("./platforms/leetcode.service")

const {
    getGfgTopicStats,
} = require("./platforms/gfg.service")

const {
    getCodeforcesSolvedProblems,
} = require("./platforms/codeforces.service")

const {
    getTopicProgress,
} = require("./topicProgress.service")

// =========================================================
// ACTIVITY AGGREGATION
// =========================================================

const aggregateActivity = (rows = []) => {
    const weekly = {}
    const monthly = {}
    const yearly = {}

    const todayKey = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
    }).format(new Date())

    const today = new Date(`${todayKey}T00:00:00Z`)

    const dayOfWeek = today.getUTCDay()

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
// RATING CHART AGGREGATION
// =========================================================

const aggregateRatingHistory = (rows = []) => {
    const sortedRows = [...rows].sort(
        (a, b) =>
            new Date(a.recorded_at) -
            new Date(b.recorded_at)
    )

    const codeforcesRows = sortedRows.filter(
        (row) =>
            row.platform === "CODEFORCES"
    )

    const leetcodeRows = sortedRows.filter(
        (row) =>
            row.platform === "LEETCODE"
    )

    const now = new Date()

    // =====================================================
    // WEEKLY — CURRENT WEEK ONLY, UP TO TODAY
    // =====================================================

    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59
    )

    const dayOfWeek = today.getDay()

    const daysFromMonday =
        (dayOfWeek + 6) % 7

    const monday = new Date(today)

    monday.setDate(
        today.getDate() - daysFromMonday
    )

    const weekNames = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
    ]

    const weekly = []

    for (
        let i = 0;
        i <= daysFromMonday;
        i++
    ) {
        const endDate = new Date(monday)

        endDate.setDate(
            monday.getDate() + i
        )

        endDate.setHours(
            23,
            59,
            59,
            999
        )

        weekly.push({
            label: weekNames[i],

            codeforces:
                getRatingAtOrBefore(
                    codeforcesRows,
                    endDate
                ),

            leetcode:
                getRatingAtOrBefore(
                    leetcodeRows,
                    endDate
                ),
        })
    }

    // =====================================================
    // MONTHLY — CURRENT YEAR, UP TO CURRENT MONTH
    // =====================================================

    const currentYear =
        now.getFullYear()

    const currentMonth =
        now.getMonth()

    const monthNames = [
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

    const monthly = []

    for (
        let month = 0;
        month <= currentMonth;
        month++
    ) {
        const endDate = new Date(
            currentYear,
            month + 1,
            0,
            23,
            59,
            59
        )

        monthly.push({
            label: monthNames[month],

            codeforces:
                getRatingAtOrBefore(
                    codeforcesRows,
                    endDate
                ),

            leetcode:
                getRatingAtOrBefore(
                    leetcodeRows,
                    endDate
                ),
        })
    }

    // =====================================================
    // YEARLY — ONLY YEARS WITH ACTUAL DATA
    // =====================================================

    const years = new Set()

    for (const row of sortedRows) {
        years.add(
            new Date(
                row.recorded_at
            ).getFullYear()
        )
    }

    const yearly = Array.from(years)
        .sort((a, b) => a - b)
        .map((year) => {
            const endDate = new Date(
                year,
                11,
                31,
                23,
                59,
                59
            )

            return {
                label: String(year),

                codeforces:
                    getRatingAtOrBefore(
                        codeforcesRows,
                        endDate
                    ),

                leetcode:
                    getRatingAtOrBefore(
                        leetcodeRows,
                        endDate
                    ),
            }
        })

    return {
        weekly,
        monthly,
        yearly,
    }
}

const getMonthRange = (offset = 0) => {
    const now = new Date()

    const start = new Date(
        now.getFullYear(),
        now.getMonth() + offset,
        1
    )

    const end = new Date(
        now.getFullYear(),
        now.getMonth() + offset + 1,
        0,
        23,
        59,
        59,
        999
    )

    return { start, end }
}

const isBetween = (date, start, end) => {
    const value = new Date(date)
    return value >= start && value <= end
}

const calculateGrowth = (current, previous) => {
    if (previous === 0) {
        return current > 0 ? 100 : 0
    }

    return ((current - previous) / previous) * 100
}

// =========================================================
// GET RATING AT OR BEFORE A DATE
// =========================================================

const getRatingAtOrBefore = (
    rows = [],
    endDate
) => {
    let rating = null

    for (const row of rows) {
        const date = new Date(row.recorded_at)

        if (date <= endDate) {
            rating = row.rating_after
        } else {
            break
        }
    }

    return rating
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
            account.platform === "CODEFORCES" &&
            stats.current_rating != null
        ) {
            currentRating = stats.current_rating
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
    // RATING HISTORY
    // =====================================================

    const {
        data: ratingHistory,
        error: ratingHistoryError,
    } = await supabase
        .from("rating_history")
        .select(
            `
            platform,
            rating_before,
            rating_after,
            rating_change,
            recorded_at,
            contest_id
            `
        )
        .eq("user_id", userId)
        .in("platform", ["CODEFORCES", "LEETCODE"])
        .order("recorded_at", {
            ascending: true,
        })

    if (ratingHistoryError) {
        throw new Error(
            `Failed to load rating history: ${ratingHistoryError.message}`
        )
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
    // PROBLEM ACTIVITY
    // =====================================================

    const {
        data: problemActivity,
        error: problemActivityError,
    } = await supabase
        .from("problem_activity")
        .select(`
        solved_at,
        problem_id,
        problems (
            platform
        )
    `)
        .eq("user_id", userId)
        .order("solved_at", {
            ascending: true,
        })

    if (problemActivityError) {
        throw new Error(
            `Failed to load problem activity: ${problemActivityError.message}`
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
            .map((day) =>
                String(day.activity_date).slice(0, 10)
            )
    )

    // Get today's date in India
    const indiaToday = new Intl.DateTimeFormat(
        "en-CA",
        {
            timeZone: "Asia/Kolkata",
        }
    ).format(new Date())

    let streak = 0

    const todayIsActive =
        activeDates.has(indiaToday)

    // If today is not active yet,
    // start counting from yesterday.
    const streakStart = new Date(
        `${indiaToday}T00:00:00+05:30`
    )

    if (!todayIsActive) {
        streakStart.setDate(
            streakStart.getDate() - 1
        )
    }

    while (true) {
        const dateKey =
            new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone: "Asia/Kolkata",
                }
            ).format(streakStart)

        if (!activeDates.has(dateKey)) {
            break
        }

        streak++

        streakStart.setDate(
            streakStart.getDate() - 1
        )
    }
    // =====================================================
    // SUBMISSION ACTIVITY
    // =====================================================

    const aggregatedActivity =
        aggregateActivity(activity || [])

    const aggregatedRating =
        aggregateRatingHistory(
            ratingHistory || []
        )


    // =====================================================
    // REAL GROWTH METRICS
    // =====================================================

    const currentMonth = getMonthRange(0)
    const previousMonth = getMonthRange(-1)


    // =====================================================
    // PROBLEM SOLVING GROWTH
    // =====================================================

    let currentMonthProblems = 0
    let previousMonthProblems = 0

    // LeetCode + GFG daily solved activity
    for (const row of activity || []) {
        if (
            row.platform !== "LEETCODE" &&
            row.platform !== "GFG"
        ) {
            continue
        }

        if (
            isBetween(
                row.activity_date,
                currentMonth.start,
                currentMonth.end
            )
        ) {
            currentMonthProblems +=
                row.problem_count || 0
        }

        if (
            isBetween(
                row.activity_date,
                previousMonth.start,
                previousMonth.end
            )
        ) {
            previousMonthProblems +=
                row.problem_count || 0
        }
    }


    // Codeforces solved problems
    for (const row of problemActivity || []) {
        if (
            row.problems?.platform !== "CODEFORCES" ||
            !row.solved_at
        ) {
            continue
        }

        if (
            isBetween(
                row.solved_at,
                currentMonth.start,
                currentMonth.end
            )
        ) {
            currentMonthProblems++
        }

        if (
            isBetween(
                row.solved_at,
                previousMonth.start,
                previousMonth.end
            )
        ) {
            previousMonthProblems++
        }
    }

    const problemGrowth = calculateGrowth(
        currentMonthProblems,
        previousMonthProblems
    )


    // =====================================================
    // CONTEST GROWTH
    // =====================================================

    const currentMonthContests =
        (ratingHistory || []).filter((row) =>
            isBetween(
                row.recorded_at,
                currentMonth.start,
                currentMonth.end
            )
        ).length

    const previousMonthContests =
        (ratingHistory || []).filter((row) =>
            isBetween(
                row.recorded_at,
                previousMonth.start,
                previousMonth.end
            )
        ).length

    const contestGrowth = calculateGrowth(
        currentMonthContests,
        previousMonthContests
    )


    // =====================================================
    // CODEFORCES RATING GROWTH
    // CURRENT MONTH VS PREVIOUS MONTH
    // =====================================================

    const codeforcesRatingRows =
        (ratingHistory || [])
            .filter(
                (row) =>
                    row.platform === "CODEFORCES"
            )
            .sort(
                (a, b) =>
                    new Date(a.recorded_at) -
                    new Date(b.recorded_at)
            )

    const currentMonthCodeforcesRating =
        getRatingAtOrBefore(
            codeforcesRatingRows,
            currentMonth.end
        )

    const previousMonthCodeforcesRating =
        getRatingAtOrBefore(
            codeforcesRatingRows,
            previousMonth.end
        )

    const ratingChange =
        currentMonthCodeforcesRating != null &&
            previousMonthCodeforcesRating != null
            ? currentMonthCodeforcesRating -
            previousMonthCodeforcesRating
            : null
    // =====================================================
    // TOPIC-WISE PROGRESS
    // =====================================================

    const topicPlatformData = {
        leetcode: [],
        codeforces: [],
        gfg: [],
    }

    for (const account of accounts || []) {

        if (account.platform === "LEETCODE") {
            topicPlatformData.leetcode =
                await getLeetCodeTopicStats(
                    account.username
                )
        }

        if (account.platform === "CODEFORCES") {
            topicPlatformData.codeforces =
                await getCodeforcesSolvedProblems(
                    account.username
                )
        }

        if (account.platform === "GFG") {
            topicPlatformData.gfg =
                await getGfgTopicStats(
                    account.username
                )
        }
    }

    const topicProgress =
        await getTopicProgress(
            userId,
            topicPlatformData
        )

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

        activity: aggregatedActivity,

        rating: aggregatedRating,

        topicProgress,

        growth: {
            problemsSolved: {
                current: currentMonthProblems,
                previous: previousMonthProblems,
                percentage: Number(
                    problemGrowth.toFixed(1)
                ),
            },

            contests: {
                current: currentMonthContests,
                previous: previousMonthContests,
                percentage: Number(
                    contestGrowth.toFixed(1)
                ),
            },

            codeforcesRating: {
                current: currentMonthCodeforcesRating,
                previous: previousMonthCodeforcesRating,
                change: ratingChange,
            },
        },
    }
}

// =========================================================
// EXPORTS
// =========================================================

module.exports = {
    getAnalyticsSummary,
}