const supabase = require("../config/supabase")

const resolveUsername = async (username) => {
    const cleanUsername = username?.trim()

    if (!cleanUsername) {
        const error = new Error("Username is required.")
        error.statusCode = 400
        throw error
    }

    const {
        data: user,
        error,
    } = await supabase
        .from("users")
        .select("email, username")
        .ilike("username", cleanUsername)
        .maybeSingle()

    if (error) {
        throw new Error(
            `Failed to resolve username: ${error.message}`
        )
    }

    if (!user) {
        const error = new Error(
            "No account found with this username."
        )

        error.statusCode = 404
        throw error
    }

    return {
        email: user.email,
        username: user.username,
    }
}

module.exports = {
    resolveUsername,
}