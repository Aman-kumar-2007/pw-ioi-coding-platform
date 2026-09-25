const { saveDailyActivity } = require("../dailyActivity.service")

const crypto = require("crypto")

const GFG_STATS_API =
    "https://gfg-stats.tashif.codes"

const GFG_PROFILE_URL =
    "https://www.geeksforgeeks.org/profile"

const generateVerificationCode = () => {
    return `CS-${crypto
        .randomBytes(4)
        .toString("hex")
        .toUpperCase()}`
}

const hashVerificationCode = (code) => {
    return crypto
        .createHash("sha256")
        .update(code)
        .digest("hex")
}

const getGfgUser = async (username) => {
    const response = await fetch(
        `${GFG_STATS_API}/${encodeURIComponent(username)}`
    )

    const data = await response.json()

    if (!response.ok || data.status !== "success") {
        throw new Error(
            data.message ||
            "GFG user not found."
        )
    }

    return {
        username: data.username,
        profileUrl:
            `${GFG_PROFILE_URL}/${encodeURIComponent(username)}`,
        data: data.data,
    }
}

const getGfgStats = async (username) => {
    const response = await fetch(
        `${GFG_STATS_API}/${encodeURIComponent(username)}/stats`
    )

    const data = await response.json()

    if (!response.ok || data.status !== "success") {
        throw new Error(
            data.message ||
            "Unable to fetch GFG stats."
        )
    }

    const stats = data.data || {}
    const difficulty = stats.byDifficulty || {}

    return {
        username,

        profileUrl:
            `${GFG_PROFILE_URL}/${encodeURIComponent(username)}`,

        problemsSolved:
            stats.totalSolved || 0,

        basicSolved:
            difficulty.basic || 0,

        easySolved:
            difficulty.easy || 0,

        mediumSolved:
            difficulty.medium || 0,

        hardSolved:
            difficulty.hard || 0,

        totalQuestions:
            stats.totalQuestions || 0,

        acceptanceRate:
            stats.acceptanceRate || 0,
    }
}

const getGfgTopicStats = async (username) => {
    try {
        const response = await fetch(
            `${GFG_STATS_API}/${encodeURIComponent(username)}/topics`
        )

        const contentType =
            response.headers.get("content-type") || ""

        if (!contentType.includes("application/json")) {
            console.warn(
                `GFG topic stats returned non-JSON response for ${username}.`
            )

            return []
        }

        const data = await response.json()

        if (
            !response.ok ||
            data.status !== "success"
        ) {
            console.warn(
                data.message ||
                `Unable to fetch GFG topic stats for ${username}.`
            )

            return []
        }

        return data.data?.topicAnalysis || []
    } catch (error) {
        console.warn(
            `GFG topic stats unavailable for ${username}:`,
            error.message
        )

        return []
    }
}

const containsVerificationCode = (
    html,
    verificationCodeHash
) => {
    if (!html || !verificationCodeHash) {
        return false
    }

    const matches =
        html.match(/CS-[A-F0-9]{8}/gi)

    if (!matches) {
        return false
    }

    return matches.some(
        (code) =>
            hashVerificationCode(
                code.toUpperCase()
            ) === verificationCodeHash
    )
}

const getGfgDailyActivity = async (username) => {
    const response = await fetch(
        `${GFG_STATS_API}/${encodeURIComponent(username)}/heatmap`
    )

    const data = await response.json()

    if (!response.ok || data.status !== "success") {
        throw new Error(
            data.message ||
            `GFG heatmap API error: ${response.status}`
        )
    }

    return data.data
}

const saveGfgDailyActivity = async (userId, username) => {
    const data = await getGfgDailyActivity(username)

    const activities = (data.dailyContributions || []).map(
        (day) => ({
            date: day.date,
            problemCount: 0,
            submissionCount: day.count || 0,
        })
    )

    return await saveDailyActivity(
        userId,
        "GFG",
        activities
    )
}

module.exports = {
    getGfgUser,
    getGfgStats,
    getGfgDailyActivity,
    saveGfgDailyActivity,
    generateVerificationCode,
    hashVerificationCode,
    containsVerificationCode,
    getGfgTopicStats,
}