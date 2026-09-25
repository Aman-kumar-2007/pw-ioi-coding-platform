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
    const [profileLoading, setProfileLoading] = useState(true)
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
            setProfileLoading(true)
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
            } finally {
                setProfileLoading(false)
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
    function DashboardLoading() {
        return (
            <div className="min-h-screen bg-background animate-pulse">
                
                <div className="space-y-8 p-8">

                    {/* Profile Header */}
                    <div className="h-[185px] rounded-2xl border border-border bg-card p-8">

                        <div className="h-8 w-72 rounded bg-muted" />

                        <div className="mt-3 h-5 w-48 rounded bg-muted" />

                        <div className="mt-10 flex gap-4">
                            <div className="h-4 w-16 rounded bg-muted" />
                            <div className="h-4 w-24 rounded bg-muted" />
                            <div className="h-4 w-20 rounded bg-muted" />
                        </div>

                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-3">

                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-[44px] w-[220px] rounded-full border border-border bg-card"
                            />
                        ))}

                    </div>

                    {/* Platform Cards */}
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-[230px] rounded-2xl border border-border bg-card p-6"
                            >
                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-3">
                                        <div className="h-11 w-11 rounded-xl bg-muted" />

                                        <div className="h-5 w-28 rounded bg-muted" />
                                    </div>

                                    <div className="h-4 w-24 rounded bg-muted" />

                                </div>

                                <div className="mt-8 flex justify-between">

                                    <div>
                                        <div className="h-10 w-20 rounded bg-muted" />
                                        <div className="mt-3 h-3 w-28 rounded bg-muted" />
                                    </div>

                                    <div className="w-[140px] space-y-3">
                                        <div className="h-2 rounded bg-muted" />
                                        <div className="h-2 rounded bg-muted" />
                                        <div className="h-2 rounded bg-muted" />
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Rating Progress */}
                    <div>

                        <div className="h-6 w-48 rounded bg-muted" />

                        <div className="mt-3 h-4 w-72 rounded bg-muted" />

                        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">

                            {[1, 2].map((item) => (
                                <div
                                    key={item}
                                    className="h-[330px] rounded-2xl border border-border bg-card p-6"
                                >
                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-3">
                                            <div className="h-11 w-11 rounded-xl bg-muted" />

                                            <div>
                                                <div className="h-5 w-24 rounded bg-muted" />
                                                <div className="mt-2 h-3 w-20 rounded bg-muted" />
                                            </div>
                                        </div>

                                        <div className="h-8 w-20 rounded bg-muted" />

                                    </div>

                                    <div className="mt-8 h-[210px] rounded-xl bg-muted/40" />
                                </div>
                            ))}

                        </div>

                    </div>

                </div>
            </div>
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
                                    {profileLoading ? (
                                        <DashboardLoading />
                                    ) : (
                                        <>
                                            <DashboardHeader />
                                            <QuickStats profile={profile} />

                                            <PlatformCards
                                                profile={profile}
                                            />

                                            <RatingProgress />

                                            <CodingHeatmap />
                                        </>
                                    )}
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