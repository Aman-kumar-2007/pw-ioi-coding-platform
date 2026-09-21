const express = require("express")

const supabase = require("../config/supabase")

const {
    generateVerificationCode,
    hashVerificationCode,
    getCodeforcesUser,
    containsVerificationCode,
} = require("../services/verification/codeforces")

const {
    generateVerificationCode: generateLeetCodeVerificationCode,
    hashVerificationCode: hashLeetCodeVerificationCode,
    getLeetCodeUser,
    containsVerificationCode: containsLeetCodeVerificationCode,
} = require("../services/verification/leetcode")

const router = express.Router()


// ==========================================
// START CODEFORCES VERIFICATION
// ==========================================

router.post("/codeforces/start", async (req, res) => {
    try {
        const { userId, username } = req.body

        if (!userId || !username?.trim()) {
            return res.status(400).json({
                error: "User ID and Codeforces handle are required.",
            })
        }

        const handle = username.trim()

        // Check whether Codeforces account exists
        const codeforcesUser =
            await getCodeforcesUser(handle)

        if (!codeforcesUser) {
            return res.status(404).json({
                error: "Codeforces account not found.",
            })
        }

        // Generate verification code
        const verificationCode =
            generateVerificationCode()

        const verificationCodeHash =
            hashVerificationCode(
                verificationCode
            )

        const expiresAt = new Date(
            Date.now() + 15 * 60 * 1000
        ).toISOString()

        // Save pending verification
        const { error } = await supabase
            .from("platform_accounts")
            .upsert(
                {
                    user_id: userId,
                    platform: "CODEFORCES",
                    username: codeforcesUser.handle,
                    profile_url:
                        `https://codeforces.com/profile/${encodeURIComponent(
                            codeforcesUser.handle
                        )}`,
                    verification_status: "PENDING",
                    verification_code_hash:
                        verificationCodeHash,
                    verification_expires_at:
                        expiresAt,
                },
                {
                    onConflict: "user_id,platform",
                }
            )

        if (error) {
            console.error(
                "Codeforces verification save error:",
                error
            )

            return res.status(500).json({
                error: "Unable to start verification.",
            })
        }

        return res.json({
            success: true,
            username: codeforcesUser.handle,
            verificationCode,
            expiresInMinutes: 15,
            instructions:
                "Add this code to your Codeforces Organization field, then click Verify Account.",
        })
    } catch (error) {
        console.error(
            "Codeforces start error:",
            error
        )

        return res.status(500).json({
            error: "Something went wrong.",
        })
    }
})


// ==========================================
// VERIFY CODEFORCES ACCOUNT
// ==========================================

router.post("/codeforces/verify", async (req, res) => {
    try {
        const { userId } = req.body

        if (!userId) {
            return res.status(400).json({
                error: "User ID is required.",
            })
        }

        // Get pending account
        const {
            data: account,
            error: accountError,
        } = await supabase
            .from("platform_accounts")
            .select("*")
            .eq("user_id", userId)
            .eq("platform", "CODEFORCES")
            .single()

        if (accountError || !account) {
            return res.status(404).json({
                error:
                    "Codeforces verification request not found.",
            })
        }

        // Already verified
        if (
            account.verification_status ===
            "VERIFIED"
        ) {
            return res.json({
                success: true,
                status: "VERIFIED",
                username: account.username,
                message:
                    "Codeforces account is already verified.",
            })
        }

        // Check expiry
        if (
            account.verification_expires_at &&
            new Date(
                account.verification_expires_at
            ) < new Date()
        ) {
            await supabase
                .from("platform_accounts")
                .update({
                    verification_status: "FAILED",
                })
                .eq("id", account.id)

            return res.status(400).json({
                error:
                    "Verification code has expired. Please generate a new code.",
            })
        }

        // Fetch current Codeforces profile
        const codeforcesUser =
            await getCodeforcesUser(
                account.username
            )

        if (!codeforcesUser) {
            return res.status(404).json({
                error:
                    "Codeforces account could not be found.",
            })
        }

        // Check organization for verification code
        const verified =
            containsVerificationCode(
                codeforcesUser.organization,
                account.verification_code_hash
            )

        if (!verified) {
            return res.status(400).json({
                success: false,
                status: "PENDING",
                error:
                    "Verification code was not found in the Codeforces Organization field.",
            })
        }

        // Mark account as verified
        const {
            data: updatedAccount,
            error: updateError,
        } = await supabase
            .from("platform_accounts")
            .update({
                verification_status: "VERIFIED",
                verified_at:
                    new Date().toISOString(),
                verification_code_hash: null,
                verification_expires_at: null,
            })
            .eq("id", account.id)
            .select()
            .single()

        if (updateError) {
            console.error(
                "Codeforces verification update error:",
                updateError
            )

            return res.status(500).json({
                error:
                    "Account was verified but could not be saved.",
            })
        }

        return res.json({
            success: true,
            status: "VERIFIED",
            username:
                updatedAccount.username,
            profileUrl:
                updatedAccount.profile_url,
            message:
                "Codeforces account verified successfully.",
        })
    } catch (error) {
        console.error(
            "Codeforces verify error:",
            error
        )

        return res.status(500).json({
            error: "Something went wrong.",
        })
    }
})


// ==========================================
// START LEETCODE VERIFICATION
// ==========================================

router.post("/leetcode/start", async (req, res) => {
    try {
        const { userId, username } = req.body

        if (!userId || !username?.trim()) {
            return res.status(400).json({
                error: "User ID and LeetCode username are required.",
            })
        }

        const handle = username.trim()

        const leetcodeUser = await getLeetCodeUser(handle)

        if (!leetcodeUser) {
            return res.status(404).json({
                error: "LeetCode account not found.",
            })
        }

        const verificationCode =
            generateLeetCodeVerificationCode()

        const verificationCodeHash =
            hashLeetCodeVerificationCode(verificationCode)

        const expiresAt = new Date(
            Date.now() + 15 * 60 * 1000
        ).toISOString()

        const { error } = await supabase
            .from("platform_accounts")
            .upsert(
                {
                    user_id: userId,
                    platform: "LEETCODE",
                    username: leetcodeUser.username,
                    profile_url: `https://leetcode.com/u/${encodeURIComponent(
                        leetcodeUser.username
                    )}/`,
                    verification_status: "PENDING",
                    verification_code_hash:
                        verificationCodeHash,
                    verification_expires_at: expiresAt,
                },
                {
                    onConflict: "user_id,platform",
                }
            )

        if (error) {
            console.error(
                "LeetCode verification save error:",
                error
            )

            return res.status(500).json({
                error: "Unable to start verification.",
            })
        }

        return res.json({
            success: true,
            username: leetcodeUser.username,
            verificationCode,
            expiresInMinutes: 15,
            instructions:
                "Add this code to your LeetCode Summary/About section, then click Verify Account.",
        })
    } catch (error) {
        console.error(
            "LeetCode start error:",
            error
        )

        return res.status(500).json({
            error: "Something went wrong.",
        })
    }
})


// ==========================================
// VERIFY LEETCODE ACCOUNT
// ==========================================

router.post("/leetcode/verify", async (req, res) => {
    try {
        const { userId } = req.body

        if (!userId) {
            return res.status(400).json({
                error: "User ID is required.",
            })
        }

        const {
            data: account,
            error: accountError,
        } = await supabase
            .from("platform_accounts")
            .select("*")
            .eq("user_id", userId)
            .eq("platform", "LEETCODE")
            .single()

        if (accountError || !account) {
            return res.status(404).json({
                error:
                    "LeetCode verification request not found.",
            })
        }

        if (
            account.verification_status === "VERIFIED"
        ) {
            return res.json({
                success: true,
                status: "VERIFIED",
                username: account.username,
                message:
                    "LeetCode account is already verified.",
            })
        }

        if (
            account.verification_expires_at &&
            new Date(account.verification_expires_at) <
            new Date()
        ) {
            await supabase
                .from("platform_accounts")
                .update({
                    verification_status: "FAILED",
                })
                .eq("id", account.id)

            return res.status(400).json({
                error:
                    "Verification code has expired. Please generate a new code.",
            })
        }

        const leetcodeUser =
            await getLeetCodeUser(account.username)

        if (!leetcodeUser) {
            return res.status(404).json({
                error:
                    "LeetCode account could not be found.",
            })
        }

        const verified = containsLeetCodeVerificationCode(
            leetcodeUser.profile?.aboutMe,
            account.verification_code_hash
        )

        if (!verified) {
            return res.status(400).json({
                success: false,
                status: "PENDING",
                error:
                    "Verification code was not found in the LeetCode Summary/About section.",
            })
        }

        const {
            data: updatedAccount,
            error: updateError,
        } = await supabase
            .from("platform_accounts")
            .update({
                verification_status: "VERIFIED",
                verified_at: new Date().toISOString(),
                verification_code_hash: null,
                verification_expires_at: null,
            })
            .eq("id", account.id)
            .select()
            .single()

        if (updateError) {
            console.error(
                "LeetCode verification update error:",
                updateError
            )

            return res.status(500).json({
                error:
                    "Account was verified but could not be saved.",
            })
        }

        return res.json({
            success: true,
            status: "VERIFIED",
            username: updatedAccount.username,
            profileUrl: updatedAccount.profile_url,
            message:
                "LeetCode account verified successfully.",
        })
    } catch (error) {
        console.error(
            "LeetCode verify error:",
            error
        )

        return res.status(500).json({
            error: "Something went wrong.",
        })
    }
})

module.exports = router