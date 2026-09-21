const getGitHubAuthorizationUrl = (state) => {
    const params = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID,
        redirect_uri: process.env.GITHUB_CALLBACK_URL,
        scope: "read:user user:email",
        state,
    })

    return `https://github.com/login/oauth/authorize?${params.toString()}`
}

const exchangeCodeForToken = async (code) => {
    const response = await fetch(
        "https://github.com/login/oauth/access_token",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret:
                    process.env.GITHUB_CLIENT_SECRET,
                code,
                redirect_uri:
                    process.env.GITHUB_CALLBACK_URL,
            }),
        }
    )

    if (!response.ok) {
        throw new Error(
            "Unable to exchange GitHub authorization code."
        )
    }

    const data = await response.json()

    if (data.error || !data.access_token) {
        throw new Error(
            data.error_description ||
                "GitHub authorization failed."
        )
    }

    return data
}

const getGitHubUser = async (accessToken) => {
    const response = await fetch(
        "https://api.github.com/user",
        {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${accessToken}`,
                "X-GitHub-Api-Version": "2026-03-10",
            },
        }
    )

    if (!response.ok) {
        throw new Error(
            "Unable to fetch GitHub user."
        )
    }

    return response.json()
}

module.exports = {
    getGitHubAuthorizationUrl,
    exchangeCodeForToken,
    getGitHubUser,
}
