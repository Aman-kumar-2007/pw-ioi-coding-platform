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

const getCodeforcesUser = async (handle) => {
    const response = await fetch(
        `https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`
    )

    if (!response.ok) {
        throw new Error("Unable to reach Codeforces.")
    }

    const data = await response.json()

    if (data.status !== "OK" || !data.result?.length) {
        return null
    }

    return data.result[0]
}

const containsVerificationCode = (
    organization,
    verificationCodeHash
) => {
    if (!organization || !verificationCodeHash) {
        return false
    }

    const matches = organization.match(
        /CS-[A-F0-9]{8}/gi
    )

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
    getCodeforcesUser,
    containsVerificationCode,
}