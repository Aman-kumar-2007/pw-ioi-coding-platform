const { saveDailyActivity } = require("../dailyActivity.service")

const getLeetCodeUser = async (username) => {
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
                    query getUserProfile($username: String!) {
                        matchedUser(username: $username) {
                            username

                            profile {
                                realName
                                ranking
                            }

                            submitStats {
                                acSubmissionNum {
                                    difficulty
                                    count
                                }
                            }
                        }
                    }
                `,
                variables: {
                    username,
                },
            }),
        }
    )

    const data = await response.json()

    if (!response.ok) {
        console.error(
            "LeetCode API response:",
            data
        )

        throw new Error(
            `LeetCode API HTTP error: ${response.status}`
        )
    }

    if (data.errors?.length) {
        throw new Error(
            data.errors[0].message ||
            "LeetCode API request failed."
        )
    }

    if (!data.data?.matchedUser) {
        throw new Error(
            "LeetCode user not found."
        )
    }

    return data.data.matchedUser
}
const getLeetCodeStats = async (username) => {
    const user = await getLeetCodeUser(username)

    const submissions =
        user.submitStats?.acSubmissionNum || []

    const getCount = (difficulty) => {
        const item = submissions.find(
            (entry) =>
                entry.difficulty === difficulty
        )

        return item?.count || 0
    }

    return {
        username: user.username,

        realName:
            user.profile?.realName || null,

        ranking:
            user.profile?.ranking || null,

        problemsSolved: getCount("All"),

        easySolved: getCount("Easy"),

        mediumSolved: getCount("Medium"),

        hardSolved: getCount("Hard"),

        profileCalendar:
            user.profileCalendar || null,
    }
}

const getLeetCodeContestStats = async (username) => {
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
                    query userContestRankingInfo(
                        $username: String!
                    ) {
                        userContestRanking(
                            username: $username
                        ) {
                            attendedContestsCount
                            rating
                            globalRanking
                            totalParticipants
                            topPercentage
                        }

                        userContestRankingHistory(
                            username: $username
                        ) {
                            attended
                            rating
                            ranking
                            contest {
                                title
                                startTime
                            }
                        }
                    }
                `,
                variables: {
                    username,
                },
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

    return {
        ranking: data.data?.userContestRanking || null,

        history:
            data.data?.userContestRankingHistory || [],
    }
}

const getLeetCodeCalendar = async (username) => {
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
                    query userProfileCalendar(
                        $username: String!
                        $year: Int
                    ) {
                        matchedUser(username: $username) {
                            userCalendar(year: $year) {
                                activeYears
                                streak
                                totalActiveDays
                                submissionCalendar
                            }
                        }
                    }
                `,
                variables: {
                    username,
                    year: new Date().getFullYear(),
                },
            }),
        }
    )

    const data = await response.json()

    if (!response.ok) {
        console.error(
            "LeetCode calendar API response:",
            data
        )

        throw new Error(
            `LeetCode calendar API HTTP error: ${response.status}`
        )
    }

    if (data.errors?.length) {
        throw new Error(
            data.errors[0].message ||
            "LeetCode calendar API request failed."
        )
    }

    const calendar =
        data.data?.matchedUser?.userCalendar

    if (!calendar) {
        throw new Error(
            "LeetCode calendar data not found."
        )
    }

    const submissionCalendar =
        calendar.submissionCalendar
            ? JSON.parse(calendar.submissionCalendar)
            : {}

    const activities = Object.entries(
        submissionCalendar
    ).map(([timestamp, count]) => ({
        date: new Date(
            Number(timestamp) * 1000
        ).toISOString().split("T")[0],

        submissionCount: Number(count),

        problemCount: 0,
    }))

    return {
        activeYears:
            calendar.activeYears || [],

        streak:
            calendar.streak || 0,

        totalActiveDays:
            calendar.totalActiveDays || 0,

        submissionCalendar,

        activities,
    }
}

module.exports = {
    getLeetCodeUser,
    getLeetCodeStats,
    getLeetCodeContestStats,
    getLeetCodeCalendar,
}