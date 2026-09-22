const {
    saveDailyActivity,
    getIndiaDate,
} = require("../dailyActivity.service")

const getCodeforcesUser = async (username) => {
    const response = await fetch(
        `https://codeforces.com/api/user.info?handles=${encodeURIComponent(
            username
        )}`
    )

    if (!response.ok) {
        throw new Error(
            `Codeforces API HTTP error: ${response.status}`
        )
    }

    const data = await response.json()

    if (data.status !== "OK") {
        throw new Error(
            data.comment || "Codeforces API request failed."
        )
    }

    if (!data.result?.length) {
        throw new Error("Codeforces user not found.")
    }

    return data.result[0]
}


const getCodeforcesRatingHistory = async (username) => {
    const response = await fetch(
        `https://codeforces.com/api/user.rating?handle=${encodeURIComponent(
            username
        )}`
    )

    if (!response.ok) {
        throw new Error(
            `Codeforces rating API HTTP error: ${response.status}`
        )
    }

    const data = await response.json()

    if (data.status !== "OK") {
        throw new Error(
            data.comment ||
            "Codeforces rating API request failed."
        )
    }

    return data.result || []
}


const getCodeforcesSubmissions = async (username) => {
    const response = await fetch(
        `https://codeforces.com/api/user.status?handle=${encodeURIComponent(
            username
        )}`
    )

    if (!response.ok) {
        throw new Error(
            `Codeforces status API HTTP error: ${response.status}`
        )
    }

    const data = await response.json()

    if (data.status !== "OK") {
        throw new Error(
            data.comment ||
            "Codeforces submissions API request failed."
        )
    }

    return data.result || []
}


const getCodeforcesStats = async (username) => {
    const [user, ratingHistory, submissions] =
        await Promise.all([
            getCodeforcesUser(username),
            getCodeforcesRatingHistory(username),
            getCodeforcesSubmissions(username),
        ])

    const solvedProblems = new Set()

    for (const submission of submissions) {
        if (
            submission.verdict === "OK" &&
            submission.problem
        ) {
            solvedProblems.add(
                `${submission.problem.contestId || "gym"}-${submission.problem.index}`
            )
        }
    }

    const maxRating = user.maxRating || user.rating || 0
    const currentRating = user.rating || 0

    return {
        username: user.handle,

        currentRating,
        maxRating,

        rank: user.rank || null,
        maxRank: user.maxRank || null,

        contestsParticipated: ratingHistory.length,

        problemsSolved: solvedProblems.size,

        ratingHistory: ratingHistory.map((contest) => ({
            contestId: contest.contestId,
            contestName: contest.contestName,
            rank: contest.rank,
            oldRating: contest.oldRating,
            newRating: contest.newRating,
            ratingUpdateTimeSeconds:
                contest.ratingUpdateTimeSeconds,
        })),

        submissions,
    }
}

const saveCodeforcesDailyActivity = async (userId, username) => {
    const submissions = await getCodeforcesSubmissions(username)

    const dailyMap = new Map()

    for (const submission of submissions) {
        if (submission.verdict !== "OK") {
            continue
        }

        const date = getIndiaDate(
            submission.creationTimeSeconds
        )

        if (!dailyMap.has(date)) {
            dailyMap.set(date, {
                date,
                problemCount: 0,
                submissionCount: 0,
            })
        }

        const day = dailyMap.get(date)

        day.submissionCount += 1
    }

    const activities = Array.from(
        dailyMap.values()
    )

    return await saveDailyActivity(
        userId,
        "CODEFORCES",
        activities
    )
}


module.exports = {
    getCodeforcesUser,
    getCodeforcesRatingHistory,
    getCodeforcesSubmissions,
    getCodeforcesStats,
    saveCodeforcesDailyActivity,
}