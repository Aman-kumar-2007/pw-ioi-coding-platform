const supabase = require("../config/supabase")


// =====================================================
// CODEFORCES UPCOMING CONTESTS
// =====================================================

const getCodeforcesUpcomingContests = async () => {
    const response = await fetch(
        "https://codeforces.com/api/contest.list?gym=false"
    )

    if (!response.ok) {
        throw new Error(
            `Codeforces contest API HTTP error: ${response.status}`
        )
    }

    const data = await response.json()

    if (data.status !== "OK") {
        throw new Error(
            data.comment ||
                "Codeforces contest API request failed."
        )
    }

    return (data.result || [])
        .filter(
            (contest) =>
                contest.phase === "BEFORE" &&
                contest.startTimeSeconds
        )
        .map((contest) => ({
            platform: "CODEFORCES",

            externalContestId:
                String(contest.id),

            name: contest.name,

            startTime: new Date(
                contest.startTimeSeconds * 1000
            ).toISOString(),

            duration:
                contest.durationSeconds || 0,

            contestType:
                contest.type || "CF",

            isRated: true,

            participantCount: null,

            url:
                contest.websiteUrl ||
                `https://codeforces.com/contest/${contest.id}`,
        }))
}


// =====================================================
// LEETCODE UPCOMING CONTESTS
// =====================================================

const getLeetCodeUpcomingContests = async () => {
    const response = await fetch(
        "https://leetcode.com/graphql/",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0",
                "Referer": "https://leetcode.com/",
            },

            body: JSON.stringify({
                query: `
                    query topTwoContests {
                        topTwoContests {
                            title
                            titleSlug
                            startTime
                            duration
                        }
                    }
                `,

                operationName: "topTwoContests",
            }),
        }
    )

    const data = await response.json()

    if (!response.ok) {
        console.error(
            "LeetCode contest API response:",
            data
        )

        throw new Error(
            `LeetCode contest API HTTP error: ${response.status}`
        )
    }

    if (data.errors?.length) {
        console.error(
            "LeetCode contest GraphQL errors:",
            data.errors
        )

        throw new Error(
            data.errors[0].message ||
                "LeetCode contest API request failed."
        )
    }

    const contests =
        data.data?.topTwoContests || []

    return contests
        .filter(
            (contest) =>
                contest.title &&
                contest.startTime
        )
        .map((contest) => ({
            platform: "LEETCODE",

            externalContestId:
                contest.titleSlug ||
                String(contest.startTime),

            name: contest.title,

            startTime: new Date(
                contest.startTime * 1000
            ).toISOString(),

            duration:
                contest.duration || 0,

            contestType: "LEETCODE",

            isRated: true,

            participantCount: null,

            url:
                `https://leetcode.com/contest/${contest.titleSlug}/`,
        }))
}

// =====================================================
// UPCOMING CONTESTS
// =====================================================

const getUpcomingContests = async () => {
    const [
        codeforces,
        leetcode,
    ] = await Promise.all([
        getCodeforcesUpcomingContests(),
        getLeetCodeUpcomingContests(),
    ])

    return [
        ...codeforces,
        ...leetcode,
    ].sort(
        (a, b) =>
            new Date(a.startTime) -
            new Date(b.startTime)
    )
}


// =====================================================
// PAST CONTESTS
// =====================================================

const getPastContests = async (userId) => {
    const { data, error } = await supabase
        .from("rating_history")
        .select(`
            id,
            platform,
            contest_id,
            rating_before,
            rating_after,
            rating_change,
            recorded_at,
            contests (
                id,
                external_contest_id,
                name,
                start_time,
                duration,
                contest_type,
                is_rated,
                participant_count,
                url
            )
        `)
        .eq("user_id", userId)
        .order("recorded_at", {
            ascending: false,
        })

    if (error) {
        throw new Error(
            `Failed to fetch contest history: ${error.message}`
        )
    }

    return (data || [])
        .filter(
            (item) => item.contests
        )
        .map((item) => ({
            id: item.contests.id,

            platform:
                item.platform,

            externalContestId:
                item.contests
                    .external_contest_id,

            name:
                item.contests.name,

            startTime:
                item.contests.start_time,

            duration:
                item.contests.duration,

            contestType:
                item.contests.contest_type,

            isRated:
                item.contests.is_rated,

            participantCount:
                item.contests
                    .participant_count,

            url:
                item.contests.url,

            ratingBefore:
                item.rating_before,

            ratingAfter:
                item.rating_after,

            ratingChange:
                item.rating_change,

            participatedAt:
                item.recorded_at,
        }))
}


// =====================================================
// EXPORTS
// =====================================================

module.exports = {
    getUpcomingContests,
    getPastContests,
}