const crypto = require("crypto")

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

const getLeetCodeUser = async (username) => {
    const response = await fetch("https://leetcode.com/graphql/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "CodeSync/1.0",
        },
        body: JSON.stringify({
            query: `
                query getUserProfile($username: String!) {
                    matchedUser(username: $username) {
                        username
                        profile {
                            realName
                            aboutMe
                        }
                    }
                }
            `,
            variables: {
                username,
            },
        }),
    })

    if (!response.ok) {
        throw new Error("Unable to reach LeetCode.")
    }

    const data = await response.json()

    if (data.errors) {
        throw new Error(
            data.errors[0]?.message || "LeetCode API error."
        )
    }

    return data.data?.matchedUser || null
}

const containsVerificationCode = (
    aboutMe,
    verificationCodeHash
) => {
    if (!aboutMe || !verificationCodeHash) {
        return false
    }

    const matches = aboutMe.match(/CS-[A-F0-9]{8}/gi)

    if (!matches) {
        return false
    }

    return matches.some(
        (code) =>
            hashVerificationCode(code.toUpperCase()) ===
            verificationCodeHash
    )
}

module.exports = {
    generateVerificationCode,
    hashVerificationCode,
    getLeetCodeUser,
    containsVerificationCode,
}