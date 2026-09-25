const supabase = require("../config/supabase")


/* ============================================================= */
/* GET USER PREFERENCES                                          */
/* ============================================================= */

const getUserPreferences = async (userId) => {
    if (!userId) {
        throw new Error(
            "User ID is required."
        )
    }


    const {
        data,
        error,
    } = await supabase
        .from("user_preferences")
        .select(`
            contest_notifications,
            leaderboard_notifications,
            platform_notifications
        `)
        .eq("user_id", userId)
        .maybeSingle()


    if (error) {
        throw new Error(
            `Failed to load preferences: ${error.message}`
        )
    }


    // No preference row yet.
    // Database defaults will be used.
    if (!data) {
        return {
            contests: true,
            leaderboard: true,
            platform: true,
        }
    }


    return {
        contests:
            data.contest_notifications,

        leaderboard:
            data.leaderboard_notifications,

        platform:
            data.platform_notifications,
    }
}


/* ============================================================= */
/* UPDATE USER PREFERENCES                                       */
/* ============================================================= */

const updateUserPreferences = async (
    userId,
    preferences
) => {
    if (!userId) {
        throw new Error(
            "User ID is required."
        )
    }


    const updateData = {}


    if (
        typeof preferences.contests ===
        "boolean"
    ) {
        updateData.contest_notifications =
            preferences.contests
    }


    if (
        typeof preferences.leaderboard ===
        "boolean"
    ) {
        updateData.leaderboard_notifications =
            preferences.leaderboard
    }


    if (
        typeof preferences.platform ===
        "boolean"
    ) {
        updateData.platform_notifications =
            preferences.platform
    }


    if (
        Object.keys(updateData).length === 0
    ) {
        throw new Error(
            "No valid preference values provided."
        )
    }


    const {
        data,
        error,
    } = await supabase
        .from("user_preferences")
        .upsert(
            {
                user_id: userId,
                ...updateData,
            },
            {
                onConflict: "user_id",
            }
        )
        .select(`
            contest_notifications,
            leaderboard_notifications,
            platform_notifications
        `)
        .single()


    if (error) {
        throw new Error(
            `Failed to update preferences: ${error.message}`
        )
    }


    return {
        contests:
            data.contest_notifications,

        leaderboard:
            data.leaderboard_notifications,

        platform:
            data.platform_notifications,
    }
}


module.exports = {
    getUserPreferences,
    updateUserPreferences,
}