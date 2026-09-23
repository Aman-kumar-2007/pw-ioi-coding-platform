const supabase = require("../config/supabase")

const saveProblemActivity = async (userId, platform, problems) => {
    if (!problems || problems.length === 0) {
        return {
            savedProblems: 0,
        }
    }

    let savedProblems = 0

    for (const problem of problems) {
        const {
            externalProblemId,
            title,
            url,
            solvedAt,
        } = problem

        // 1. Find or create the problem
        const { data: existingProblem, error: findError } = await supabase
            .from("problems")
            .select("id")
            .eq("platform", platform)
            .eq("external_problem_id", externalProblemId)
            .maybeSingle()

        if (findError) {
            throw new Error(
                `Failed to find problem: ${findError.message}`
            )
        }

        let problemId = existingProblem?.id

        if (!problemId) {
            const { data: newProblem, error: insertError } =
                await supabase
                    .from("problems")
                    .insert({
                        platform,
                        external_problem_id: externalProblemId,
                        title: title || null,
                        url: url || null,
                    })
                    .select("id")
                    .single()

            if (insertError) {
                throw new Error(
                    `Failed to create problem: ${insertError.message}`
                )
            }

            problemId = newProblem.id
        }

        // 2. Save user's solved activity
        const { error: activityError } = await supabase
            .from("problem_activity")
            .upsert(
                {
                    user_id: userId,
                    problem_id: problemId,
                    solved_at: solvedAt,
                },
                {
                    onConflict: "user_id,problem_id",
                }
            )

        if (activityError) {
            throw new Error(
                `Failed to save problem activity: ${activityError.message}`
            )
        }

        savedProblems++
    }

    return {
        savedProblems,
    }
}

module.exports = {
    saveProblemActivity,
}