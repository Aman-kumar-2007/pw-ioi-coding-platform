const GITHUB_API =
    "https://api.github.com"

const githubRequest = async (
    endpoint,
    accessToken
) => {
    const response = await fetch(
        `${GITHUB_API}${endpoint}`,
        {
            headers: {
                ...(accessToken
                    ? {
                        Authorization:
                            `Bearer ${accessToken}`,
                    }
                    : {}),

                Accept:
                    "application/vnd.github+json",

                "X-GitHub-Api-Version":
                    "2022-11-28",

                "User-Agent":
                    "CodeSync",
            },
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.message ||
            `GitHub API error: ${response.status}`
        )
    }

    return data
}

const getGithubUser = async (
    accessToken
) => {
    return await githubRequest(
        "/user",
        accessToken
    )
}

const getGithubRepositories = async (
    accessToken
) => {
    const repositories = []

    let page = 1

    while (true) {
        const data =
            await githubRequest(
                `/user/repos?per_page=100&page=${page}&type=all`,
                accessToken
            )

        repositories.push(...data)

        if (data.length < 100) {
            break
        }

        page++
    }

    return repositories
}

const getGithubPullRequests = async (
    username,
    accessToken
) => {
    const query =
        encodeURIComponent(
            `is:pr author:${username}`
        )

    const data =
        await githubRequest(
            `/search/issues?q=${query}&per_page=1`,
            accessToken
        )

    return data.total_count || 0
}

const getGithubStats = async (username) => {
    const user = await githubRequest(
        `/users/${encodeURIComponent(username)}`,
        null
    )

    const repositories = await githubRequest(
        `/users/${encodeURIComponent(username)}/repos?per_page=100&type=all`,
        null
    )

    const query = encodeURIComponent(
        `is:pr author:${username}`
    )

    const pullRequestData = await githubRequest(
        `/search/issues?q=${query}&per_page=1`,
        null
    )

    return {
        username: user.login,

        profileUrl:
            user.html_url,

        name:
            user.name || null,

        publicRepositories:
            user.public_repos || 0,

        repositories:
            repositories.length,

        pullRequests:
            pullRequestData.total_count || 0,

        followers:
            user.followers || 0,

        following:
            user.following || 0,
    }
}

const getGithubContributions = async (username) => {
    const response = await fetch(
        `https://github.com/users/${encodeURIComponent(
            username
        )}/contributions`,
        {
            headers: {
                "User-Agent": "CodeSync/1.0",
                Accept: "text/html",
            },
        }
    )

    if (!response.ok) {
        throw new Error(
            `GitHub contributions HTTP error: ${response.status}`
        )
    }

    const html = await response.text()

    // GitHub contribution calendar contains
    // aria-label values such as:
    // "23 contributions on September 11th"

    const matches = [
        ...html.matchAll(
            /(\d+)\s+contribution[s]?\s+on\s+([^"]+)/gi
        ),
    ]

    const contributions = matches.map(
        (match) => ({
            count: Number(match[1]),
            label: match[2],
        })
    )

    return {
        contributions,
        totalContributions:
            contributions.reduce(
                (total, day) =>
                    total + day.count,
                0
            ),
    }
}

module.exports = {
    getGithubUser,
    getGithubRepositories,
    getGithubPullRequests,
    getGithubStats,
    getGithubContributions,
}