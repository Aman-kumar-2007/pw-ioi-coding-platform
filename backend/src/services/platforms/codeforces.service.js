const {
    saveDailyActivity,
    getIndiaDate,
} = require("../dailyActivity.service")

const {
    saveProblemActivity,
} = require("../problemActivity.service")

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

    const latestRating =
        ratingHistory.length > 0
            ? ratingHistory[ratingHistory.length - 1].newRating
            : user.rating || 0

    const maxRating = Math.max(
        user.maxRating || 0,
        ...ratingHistory.map((contest) => contest.newRating || 0)
    )

    const currentRating = latestRating

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

const getCodeforcesSolvedProblems = async (username) => {
    const submissions = await getCodeforcesSubmissions(username)

    const solvedProblems = new Map()

    for (const submission of submissions) {
        if (
            submission.verdict !== "OK" ||
            !submission.problem?.contestId ||
            !submission.problem?.index
        ) {
            continue
        }

        const contestId = submission.problem.contestId
        const index = submission.problem.index

        const externalProblemId = `${contestId}-${index}`

        const existing = solvedProblems.get(externalProblemId)

        // Keep the first time the problem was solved
        if (
            !existing ||
            submission.creationTimeSeconds < existing.solvedAtTimestamp
        ) {
            solvedProblems.set(externalProblemId, {
                externalProblemId,
                title: submission.problem.name || null,
                url: `https://codeforces.com/problemset/problem/${contestId}/${index}`,
                solvedAtTimestamp: submission.creationTimeSeconds,
            })
        }
    }

    return Array.from(solvedProblems.values()).map((problem) => ({
        externalProblemId: problem.externalProblemId,
        title: problem.title,
        url: problem.url,
        solvedAt: new Date(
            problem.solvedAtTimestamp * 1000
        ).toISOString(),
    }))
}

const saveCodeforcesDailyActivity = async (
    userId,
    username
) => {
    const submissions =
        await getCodeforcesSubmissions(username)

    const dailyMap = new Map()

    for (const submission of submissions) {
        if (!submission.creationTimeSeconds) {
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

        // Count EVERY submission attempt
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

const saveCodeforcesProblemActivity = async (userId, username) => {
    const problems = await getCodeforcesSolvedProblems(username)

    return await saveProblemActivity(
        userId,
        "CODEFORCES",
        problems
    )
}


module.exports = {
    getCodeforcesUser,
    getCodeforcesRatingHistory,
    getCodeforcesSubmissions,
    getCodeforcesStats,
    saveCodeforcesDailyActivity,
    getCodeforcesSolvedProblems,
    saveCodeforcesProblemActivity,
}