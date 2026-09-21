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

const getGfgUser = async (username) => {
    const response = await fetch(
        `https://www.geeksforgeeks.org/profile/${encodeURIComponent(
            username
        )}`,
        {
            headers: {
                "User-Agent": "CodeSync/1.0",
            },
        }
    )

    if (!response.ok) {
        return null
    }

    const html = await response.text()

    if (
        html.includes("This user does not exist") ||
        html.includes("Page Not Found")
    ) {
        return null
    }

    return {
        username,
        profileUrl: `https://www.geeksforgeeks.org/profile/${encodeURIComponent(
            username
        )}`,
        html,
    }
}

const containsVerificationCode = (
    html,
    verificationCodeHash
) => {
    if (!html || !verificationCodeHash) {
        return false
    }

    const matches = html.match(/CS-[A-F0-9]{8}/gi)

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
    getGfgUser,
    containsVerificationCode,
}