const supabase = require("../config/supabase")

const {
    getLeaderboard,
} = require("./leaderboard.service")

const {
    getAnalyticsSummary,
} = require("./analytics.service")

const {
    getCombinedDailyActivity,
} = require("./dailyActivity.service")


const getStudentProfile = async (username) => {

    if (!username?.trim()) {
        const error = new Error(
            "Username is required."
        )

        error.statusCode = 400

        throw error
    }


    // =====================================================
    // USER
    // =====================================================

    const {
        data: user,
        error: userError,
    } = await supabase
        .from("users")
        .select("id, username")
        .ilike(
            "username",
            username.trim()
        )
        .maybeSingle()

    if (userError) {
        throw new Error(
            `Failed to load user: ${userError.message}`
        )
    }

    if (!user) {
        const error = new Error(
            "Student not found."
        )

        error.statusCode = 404

        throw error
    }

    const userId = user.id


    // =====================================================
    // STUDENT PROFILE
    // =====================================================

    const {
        data: profile,
        error: profileError,
    } = await supabase
        .from("student_profiles")
        .select(
            `
            user_id,
            full_name,
            profile_image,
            branch,
            batch
            `
        )
        .eq(
            "user_id",
            userId
        )
        .maybeSingle()

    if (profileError) {
        throw new Error(
            `Failed to load student profile: ${profileError.message}`
        )
    }


    // =====================================================
    // VERIFIED PLATFORM ACCOUNTS
    // =====================================================

    const {
        data: accounts,
        error: accountsError,
    } = await supabase
        .from("platform_accounts")
        .select(
            `
            id,
            platform,
            username,
            profile_url,
            verification_status
            `
        )
        .eq(
            "user_id",
            userId
        )
        .eq(
            "verification_status",
            "VERIFIED"
        )

    if (accountsError) {
        throw new Error(
            `Failed to load platform accounts: ${accountsError.message}`
        )
    }


    // =====================================================
    // PLATFORM STATS
    // =====================================================

    const accountIds =
        (accounts || []).map(
            (account) =>
                account.id
        )

    let platformStats = []


    if (accountIds.length > 0) {

        const {
            data,
            error: statsError,
        } = await supabase
            .from("platform_stats")
            .select(
                `
                platform_account_id,
                problems_solved,
                current_rating,
                max_rating,
                contest_count,
                contributions,
                repository_count
                `
            )
            .in(
                "platform_account_id",
                accountIds
            )

        if (statsError) {
            throw new Error(
                `Failed to load platform stats: ${statsError.message}`
            )
        }

        platformStats =
            data || []
    }


    const statsMap =
        new Map(
            platformStats.map(
                (stats) => [
                    stats.platform_account_id,
                    stats,
                ]
            )
        )


    // =====================================================
    // PLATFORM DATA
    // =====================================================

    const platforms = {}


    for (const account of accounts || []) {

        const stats =
            statsMap.get(
                account.id
            ) || {}

        platforms[
            account.platform
        ] = {

            username:
                account.username,

            profileUrl:
                account.profile_url,

            solved:
                stats.problems_solved ||
                0,

            rating:
                stats.current_rating ??
                null,

            maxRating:
                stats.max_rating ??
                null,

            contests:
                stats.contest_count ||
                0,

            contributions:
                stats.contributions ||
                0,

            repositories:
                stats.repository_count ||
                0,
        }
    }


    // =====================================================
    // SOCIAL ACCOUNTS
    // =====================================================

    let social = {}

    const {
        data: socialAccounts,
        error: socialError,
    } = await supabase
        .from("social_accounts")
        .select(
            `
            platform,
            username,
            profile_url
            `
        )
        .eq(
            "user_id",
            userId
        )

    /*
        Social media is optional.

        If the table is empty:
        → social = {}

        If SELECT permission is missing:
        → also keep social empty

        Profile should never fail just because
        social media is not connected.
    */

    if (!socialError) {

        for (
            const account
            of socialAccounts || []
        ) {

            social[
                account.platform
            ] = {

                username:
                    account.username,

                profileUrl:
                    account.profile_url,
            }
        }
    }


    // =====================================================
    // LEADERBOARD
    // =====================================================

    const leaderboardData =
        await getLeaderboard(
            userId
        )


    const leaderboardStudent =
        leaderboardData.leaderboard.find(
            (student) =>
                student.userId ===
                userId
        )


    // =====================================================
    // ANALYTICS
    // =====================================================

    const analytics =
        await getAnalyticsSummary(
            userId
        )


    // =====================================================
    // EXISTING CODING HEATMAP DATA
    // =====================================================

    /*
        IMPORTANT:

        We are NOT creating another heatmap system.

        This is the exact same service already used by
        /api/verification/activity.

        Only difference:
        instead of req.userId,
        we pass the username's userId.
    */

    const activity =
        await getCombinedDailyActivity(
            userId
        )


    // =====================================================
    // FINAL RESPONSE
    // =====================================================

    return {

        profile: {

            userId,

            username:
                user.username,

            name:
                profile?.full_name ||
                "Student",

            avatar:
                profile?.profile_image ||
                null,

            college:
                "PW IOI",

            branch:
                profile?.branch ||
                null,

            batch:
                profile?.batch ||
                null,
        },


        ranking: {

            rank:
                leaderboardStudent?.rank ||
                null,

            score:
                leaderboardStudent?.score ||
                0,

            solved:
                leaderboardStudent?.solved ||
                0,
        },


        streak: {

            current:
                analytics?.summary?.streak ||
                0,

            max:
                0,
        },


        platforms,

        social,

        activity,
    }
}


module.exports = {
    getStudentProfile,
}