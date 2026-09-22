const supabase = require("../config/supabase")

const getLeaderboard = async (currentUserId) => {
    // Get all verified platform accounts
    const {
        data: accounts,
        error: accountsError,
    } = await supabase
        .from("platform_accounts")
        .select("id, user_id, platform")
        .eq("verification_status", "VERIFIED")

    if (accountsError) {
        throw new Error(
            `Failed to load platform accounts: ${accountsError.message}`
        )
    }

    if (!accounts || accounts.length === 0) {
        return []
    }

    // Get unique users
    const userIds = [
        ...new Set(accounts.map((account) => account.user_id)),
    ]

    // Get student profiles
    const {
        data: profiles,
        error: profilesError,
    } = await supabase
        .from("student_profiles")
        .select("user_id, full_name")
        .in("user_id", userIds)

    if (profilesError) {
        throw new Error(
            `Failed to load student profiles: ${profilesError.message}`
        )
    }

    // Get platform stats
    const accountIds = accounts.map((account) => account.id)

    const {
        data: platformStats,
        error: statsError,
    } = await supabase
        .from("platform_stats")
        .select("platform_account_id, problems_solved")
        .in("platform_account_id", accountIds)

    if (statsError) {
        throw new Error(
            `Failed to load platform stats: ${statsError.message}`
        )
    }

    // account ID -> user ID
    const accountUserMap = new Map(
        accounts.map((account) => [
            account.id,
            account.user_id,
        ])
    )

    // Calculate total solved per user
    const solvedByUser = new Map()

    for (const stat of platformStats || []) {
        const userId = accountUserMap.get(stat.platform_account_id)

        if (!userId) continue

        const currentSolved = solvedByUser.get(userId) || 0

        solvedByUser.set(
            userId,
            currentSolved + (stat.problems_solved || 0)
        )
    }

    // Profile map
    const profileMap = new Map(
        (profiles || []).map((profile) => [
            profile.user_id,
            profile,
        ])
    )

    // Build leaderboard
    const leaderboard = userIds.map((userId) => {
        const profile = profileMap.get(userId)

        return {
            userId,
            name: profile?.full_name || "Student",
            solved: solvedByUser.get(userId) || 0,
        }
    })

    // Highest solved count first
    leaderboard.sort((a, b) => {
        if (b.solved !== a.solved) {
            return b.solved - a.solved
        }

        return a.name.localeCompare(b.name)
    })

    const rankedLeaderboard = leaderboard.map((student, index) => ({
        rank: index + 1,
        ...student,
    }))

    const currentUser = rankedLeaderboard.find(
        (student) => student.userId === currentUserId
    )

    return {
        leaderboard: rankedLeaderboard,
        currentUserRank: currentUser?.rank || null,
    }
}

module.exports = {
    getLeaderboard,
}