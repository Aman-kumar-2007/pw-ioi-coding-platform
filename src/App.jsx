import { useEffect, useState } from "react"
import { Routes, Route } from "react-router"

import AuthPage from "./components/AuthPage"
import ProfileSetup from "./components/ProfileSetup"
import Layout from "./components/Layout"

import DashboardHeader from "./components/DashboardHeader"
import QuickStats from "./components/QuickStats"
import PlatformCards from "./components/PlatformCards"
import RatingProgress from "./components/RatingSection"
import CodingHeatmap from "./components/CodingHeatmap"

import Leaderboard from "./components/Leaderboard"
import StudentProfile from "./components/StudentProfile"
import Contests from "./components/Contests"
import Analytics from "./components/Analytics"
import Settings from "./components/Settings"
import Notifications from "./components/Notifications"
import PublicStudentProfile from "./components/PublicStudentProfile"

import { supabase } from "./lib/supabase"

const API_BASE_URL = "http://localhost:5001"

function App() {
    const [currentPage, setCurrentPage] = useState("login")
    const [activePage, setActivePage] = useState("Dashboard")

    const [profile, setProfile] = useState(null)

    const handleAuthenticatedUser = async (session) => {
        if (!session?.user) {
            setCurrentPage("login")
            return
        }

        const { data, error } = await supabase
            .from("users")
            .select("profile_setup_completed")
            .eq("id", session.user.id)
            .single()

        if (error) {
            console.error("Profile status error:", error)
            return
        }

        if (data.profile_setup_completed) {
            setCurrentPage("app")
        } else {
            setCurrentPage("setup")
        }
    }

    /* ========================================================= */
    /* FETCH DASHBOARD PROFILE                                   */
    /* ========================================================= */

    useEffect(() => {
        if (currentPage !== "app") {
            return
        }

        const fetchProfile = async () => {
            try {
                const {
                    data: {
                        session,
                    },
                } = await supabase.auth.getSession()

                if (!session?.access_token) {
                    return
                }

                const response = await fetch(
                    `${API_BASE_URL}/api/profile/me`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${session.access_token}`,
                        },
                    }
                )

                const result =
                    await response.json()

                if (
                    !response.ok ||
                    !result.success
                ) {
                    throw new Error(
                        result.message ||
                        "Failed to load dashboard profile."
                    )
                }

                const data =
                    result.data || {}

                const ranking =
                    data.ranking || {}

                const streak =
                    data.streak || {}

                const normalizedProfile = {
                    ...(data.profile || {}),

                    rank:
                        ranking.rank ?? null,

                    score:
                        ranking.score ?? 0,

                    solved:
                        ranking.solved ?? 0,

                    currentStreak:
                        streak.current ?? 0,

                    maxStreak:
                        streak.max ?? 0,

                    platforms:
                        data.platforms || {},

                    topics:
                        data.topics || [],

                    contests:
                        data.contests || 0,

                    activity:
                        data.activity || [],
                }

                setProfile(
                    normalizedProfile
                )
            } catch (error) {
                console.error(
                    "Dashboard profile error:",
                    error
                )
            }
        }

        fetchProfile()
    }, [currentPage])

    /* ========================================================= */
    /* AUTH INITIALIZATION                                       */
    /* ========================================================= */

    useEffect(() => {
        const initializeAuth = async () => {
            const {
                data: {
                    session,
                },
            } = await supabase.auth.getSession()

            if (session) {
                await handleAuthenticatedUser(
                    session
                )
            }
        }

        initializeAuth()

        const {
            data: {
                subscription,
            },
        } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (session) {
                    setTimeout(() => {
                        handleAuthenticatedUser(
                            session
                        )
                    }, 0)
                } else if (
                    event === "SIGNED_OUT"
                ) {
                    setCurrentPage("login")
                    setActivePage("Dashboard")
                    setProfile(null)
                }
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    /* ========================================================= */
    /* LOGIN                                                      */
    /* ========================================================= */

    const handleLogin = async () => {
        const {
            data: {
                session,
            },
        } = await supabase.auth.getSession()

        await handleAuthenticatedUser(
            session
        )
    }

    /* ========================================================= */
    /* PROFILE SETUP                                              */
    /* ========================================================= */

    const handleSetupComplete = () => {
        setCurrentPage("app")
    }

    /* ========================================================= */
    /* AUTH PAGES                                                 */
    /* ========================================================= */

    if (currentPage === "login") {
        return (
            <AuthPage
                onLogin={handleLogin}
            />
        )
    }

    if (currentPage === "setup") {
        return (
            <ProfileSetup
                onComplete={
                    handleSetupComplete
                }
            />
        )
    }

    /* ========================================================= */
    /* APP                                                        */
    /* ========================================================= */

    return (
        <Routes>

            {/* ================================================= */}
            {/* PUBLIC STUDENT PROFILE                           */}
            {/* ================================================= */}

            <Route
                path="/student/:username"
                element={
                    <PublicStudentProfile />
                }
            />

            {/* ================================================= */}
            {/* MAIN CODESYNC APP                                */}
            {/* ================================================= */}

            <Route
                path="*"
                element={
                    <Layout
                        activePage={activePage}
                        setActivePage={
                            setActivePage
                        }
                        onLogout={async () => {
                            await supabase.auth.signOut()

                            setCurrentPage(
                                "login"
                            )

                            setActivePage(
                                "Dashboard"
                            )

                            setProfile(null)
                        }}
                    >

                        {activePage ===
                            "Dashboard" && (
                                <>
                                    <DashboardHeader />

                                    <QuickStats
                                        profile={
                                            profile
                                        }
                                    />
                                    <PlatformCards profile={profile} />

                                    <RatingProgress />

                                    <CodingHeatmap />
                                </>
                            )}

                        {activePage ===
                            "Leaderboard" && (
                                <Leaderboard />
                            )}

                        {activePage ===
                            "Student Profile" && (
                                <StudentProfile />
                            )}

                        {activePage ===
                            "Contests" && (
                                <Contests />
                            )}

                        {activePage ===
                            "Analytics" && (
                                <Analytics />
                            )}

                        {activePage ===
                            "Settings" && (
                                <Settings
                                    onViewProfile={() =>
                                        setActivePage(
                                            "Student Profile"
                                        )
                                    }
                                    onLogout={async () => {
                                        await supabase.auth.signOut()

                                        setCurrentPage(
                                            "login"
                                        )

                                        setActivePage(
                                            "Dashboard"
                                        )

                                        setProfile(
                                            null
                                        )
                                    }}
                                />
                            )}

                        {activePage ===
                            "Notifications" && (
                                <Notifications />
                            )}

                    </Layout>
                }
            />

        </Routes>
    )
}

export default App