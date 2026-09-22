import { useEffect, useState } from "react"

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

import { supabase } from "./lib/supabase"

function App() {
    const [currentPage, setCurrentPage] = useState("login")
    const [activePage, setActivePage] = useState("Dashboard")

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

    useEffect(() => {
        const initializeAuth = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()

            if (session) {
                await handleAuthenticatedUser(session)
            }
        }

        initializeAuth()

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                setTimeout(() => {
                    handleAuthenticatedUser(session)
                }, 0)
            } else if (event === "SIGNED_OUT") {
                setCurrentPage("login")
                setActivePage("Dashboard")
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const handleLogin = async () => {
        const {
            data: { session },
        } = await supabase.auth.getSession()

        await handleAuthenticatedUser(session)
    }

    const handleSetupComplete = () => {
        setCurrentPage("app")
    }

    if (currentPage === "login") {
        return <AuthPage onLogin={handleLogin} />
    }

    if (currentPage === "setup") {
        return <ProfileSetup onComplete={handleSetupComplete} />
    }

    return (
        <Layout
            activePage={activePage}
            setActivePage={setActivePage}
            onLogout={async () => {
                await supabase.auth.signOut()
                setCurrentPage("login")
                setActivePage("Dashboard")
            }}
        >
            {activePage === "Dashboard" && (
                <>
                    <DashboardHeader />
                    <QuickStats />
                    <PlatformCards />
                    <RatingProgress />
                    <CodingHeatmap />
                </>
            )}

            {activePage === "Leaderboard" && <Leaderboard />}
            {activePage === "Student Profile" && <StudentProfile />}
            {activePage === "Contests" && <Contests />}
            {activePage === "Analytics" && <Analytics />}

            {activePage === "Settings" && (
                <Settings
                    onViewProfile={() =>
                        setActivePage("Student Profile")
                    }
                    onLogout={async () => {
                        await supabase.auth.signOut()
                        setCurrentPage("login")
                        setActivePage("Dashboard")
                    }}
                />
            )}

            {activePage === "Notifications" && <Notifications />}
        </Layout>
    )
}

export default App
