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

module.exports = {
    saveDailyActivity,
}
