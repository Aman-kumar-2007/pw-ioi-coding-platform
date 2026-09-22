const supabase = require("../config/supabase")

const saveDailyActivity = async (userId, platform, activities) => {
    const rows = activities.map((day) => ({
        user_id: userId,
        platform,
        activity_date: day.date,
        problem_count: day.problemCount || 0,
        submission_count: day.submissionCount || 0,
        contest_count: day.contestCount || 0,
        contribution_count: day.contributionCount || 0,
        updated_at: new Date().toISOString(),
    }))

    if (rows.length === 0) {
        return {
            inserted: 0,
            totalActivity: 0,
        }
    }

    const { data, error } = await supabase
        .from("daily_activity")
        .upsert(rows, {
            onConflict: "user_id,platform,activity_date",
        })
        .select()

    if (error) {
        throw new Error(
            `Failed to save ${platform} daily activity: ${error.message}`
        )
    }

    return {
        inserted: data.length,
        totalActivity: rows.reduce(
            (total, day) =>
                total +
                day.problem_count +
                day.submission_count +
                day.contribution_count,
            0
        ),
    }
}

const getCombinedDailyActivity = async (userId) => {
    const { data, error } = await supabase
        .from("daily_activity")
        .select(
            "platform, activity_date, problem_count, submission_count, contribution_count"
        )
        .eq("user_id", userId)
        .order("activity_date", {
            ascending: true,
        })

    if (error) {
        throw new Error(
            `Failed to fetch daily activity: ${error.message}`
        )
    }

    const activityMap = new Map()

    for (const row of data || []) {
        const date = row.activity_date

        if (!activityMap.has(date)) {
            activityMap.set(date, {
                date,
                LEETCODE: 0,
                CODEFORCES: 0,
                GFG: 0,
                GITHUB: 0,
                total: 0,
            })
        }

        const day = activityMap.get(date)

        let count = 0

        if (row.platform === "GITHUB") {
            count = row.contribution_count || 0
        } else {
            count =
                row.submission_count ||
                row.problem_count ||
                0
        }

        day[row.platform] += count

        if (row.platform !== "GITHUB") {
            day.total += count
        }
    }

    return Array.from(activityMap.values())
}

const getIndiaDate = (timestamp) => {
    const date = new Date(
        Number(timestamp) * 1000
    )

    const parts = new Intl.DateTimeFormat(
        "en-CA",
        {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }
    ).formatToParts(date)

    const values = {}

    parts.forEach((part) => {
        if (part.type !== "literal") {
            values[part.type] = part.value
        }
    })

    return `${values.year}-${values.month}-${values.day}`
}

module.exports = {
    saveDailyActivity,
    getCombinedDailyActivity,
    getIndiaDate,
}
