const supabase = require("../config/supabase")

const saveCodeforcesRatingHistory = async (
    userId,
    ratingHistory
) => {
    if (!ratingHistory || ratingHistory.length === 0) {
        return {
            saved: 0,
        }
    }

    let saved = 0

    for (const contest of ratingHistory) {
        const externalContestId = String(
            contest.contestId
        )

        const startTime = new Date(
            contest.ratingUpdateTimeSeconds * 1000
        ).toISOString()

        // -----------------------------------------
        // Find or create contest
        // -----------------------------------------

        const {
            data: existingContest,
            error: contestFindError,
        } = await supabase
            .from("contests")
            .select("id")
            .eq("platform", "CODEFORCES")
            .eq(
                "external_contest_id",
                externalContestId
            )
            .maybeSingle()

        if (contestFindError) {
            throw new Error(
                `Failed to find Codeforces contest: ${contestFindError.message}`
            )
        }

        let contestId = existingContest?.id

        if (!contestId) {
            const {
                data: createdContest,
                error: contestCreateError,
            } = await supabase
                .from("contests")
                .insert({
                    platform: "CODEFORCES",
                    external_contest_id: externalContestId,
                    name:
                        contest.contestName ||
                        `Codeforces Contest ${externalContestId}`,
                    start_time: startTime,
                    duration: 0,
                    contest_type: "RATED",
                    is_rated: true,
                    url: `https://codeforces.com/contest/${externalContestId}`,
                })
                .select("id")
                .single()

            if (contestCreateError) {
                throw new Error(
                    `Failed to create Codeforces contest: ${contestCreateError.message}`
                )
            }

            contestId = createdContest.id
        }

        // -----------------------------------------
        // Check existing rating history
        // -----------------------------------------

        const {
            data: existingHistory,
            error: historyFindError,
        } = await supabase
            .from("rating_history")
            .select("id")
            .eq("user_id", userId)
            .eq("platform", "CODEFORCES")
            .eq("contest_id", contestId)
            .maybeSingle()

        if (historyFindError) {
            throw new Error(
                `Failed to find rating history: ${historyFindError.message}`
            )
        }

        const payload = {
            user_id: userId,
            platform: "CODEFORCES",
            contest_id: contestId,
            rating_before: contest.oldRating,
            rating_after: contest.newRating,
            rating_change:
                contest.newRating -
                contest.oldRating,
            recorded_at: startTime,
            updated_at: new Date().toISOString(),
        }

        if (existingHistory) {
            const {
                error: updateError,
            } = await supabase
                .from("rating_history")
                .update(payload)
                .eq("id", existingHistory.id)

            if (updateError) {
                throw new Error(
                    `Failed to update rating history: ${updateError.message}`
                )
            }
        } else {
            const {
                error: insertError,
            } = await supabase
                .from("rating_history")
                .insert(payload)

            if (insertError) {
                throw new Error(
                    `Failed to save rating history: ${insertError.message}`
                )
            }
        }

        saved += 1
    }

    return {
        saved,
    }
}


const saveLeetCodeRatingHistory = async (
    userId,
    ratingHistory
) => {
    if (!ratingHistory || ratingHistory.length === 0) {
        return {
            saved: 0,
        }
    }

    let saved = 0

    for (let i = 0; i < ratingHistory.length; i++) {
        const contest = ratingHistory[i]

        if (
            !contest.attended ||
            typeof contest.rating !== "number" ||
            !contest.contest?.startTime
        ) {
            continue
        }

        const externalContestId = String(
            contest.contest.startTime
        )

        const startTime = new Date(
            contest.contest.startTime * 1000
        ).toISOString()

        // Previous contest rating
        const previousContest = ratingHistory
            .slice(0, i)
            .reverse()
            .find(
                (item) =>
                    item.attended &&
                    typeof item.rating === "number"
            )

        const ratingBefore = previousContest
            ? Math.round(previousContest.rating)
            : Math.round(contest.rating)

        const ratingAfter = Math.round(
            contest.rating
        )

        const ratingChange =
            ratingAfter - ratingBefore

        // -----------------------------------------
        // Find or create LeetCode contest
        // -----------------------------------------

        const {
            data: existingContest,
            error: contestFindError,
        } = await supabase
            .from("contests")
            .select("id")
            .eq("platform", "LEETCODE")
            .eq(
                "external_contest_id",
                externalContestId
            )
            .maybeSingle()

        if (contestFindError) {
            throw new Error(
                `Failed to find LeetCode contest: ${contestFindError.message}`
            )
        }

        let contestId = existingContest?.id

        if (!contestId) {
            const {
                data: createdContest,
                error: contestCreateError,
            } = await supabase
                .from("contests")
                .insert({
                    platform: "LEETCODE",
                    external_contest_id:
                        externalContestId,
                    name:
                        contest.contest.title ||
                        `LeetCode Contest ${externalContestId}`,
                    start_time: startTime,
                    duration: 0,
                    contest_type: "RATED",
                    is_rated: true,
                    url: "https://leetcode.com/contest/",
                })
                .select("id")
                .single()

            if (contestCreateError) {
                throw new Error(
                    `Failed to create LeetCode contest: ${contestCreateError.message}`
                )
            }

            contestId = createdContest.id
        }

        // -----------------------------------------
        // Check existing rating history
        // -----------------------------------------

        const {
            data: existingHistory,
            error: historyFindError,
        } = await supabase
            .from("rating_history")
            .select("id")
            .eq("user_id", userId)
            .eq("platform", "LEETCODE")
            .eq("contest_id", contestId)
            .maybeSingle()

        if (historyFindError) {
            throw new Error(
                `Failed to find LeetCode rating history: ${historyFindError.message}`
            )
        }

        const payload = {
            user_id: userId,
            platform: "LEETCODE",
            contest_id: contestId,
            rating_before: ratingBefore,
            rating_after: ratingAfter,
            rating_change: ratingChange,
            recorded_at: startTime,
            updated_at: new Date().toISOString(),
        }

        if (existingHistory) {
            const {
                error: updateError,
            } = await supabase
                .from("rating_history")
                .update(payload)
                .eq("id", existingHistory.id)

            if (updateError) {
                throw new Error(
                    `Failed to update LeetCode rating history: ${updateError.message}`
                )
            }
        } else {
            const {
                error: insertError,
            } = await supabase
                .from("rating_history")
                .insert(payload)

            if (insertError) {
                throw new Error(
                    `Failed to save LeetCode rating history: ${insertError.message}`
                )
            }
        }

        saved += 1
    }

    return {
        saved,
    }
}



module.exports = {
    saveCodeforcesRatingHistory,
    saveLeetCodeRatingHistory,
}