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

module.exports = {
    getGfgUser,
    getGfgStats,
    generateVerificationCode,
    hashVerificationCode,
    containsVerificationCode,
}