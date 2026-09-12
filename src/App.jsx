import { useState } from "react"

import AuthPage from "./components/AuthPage"
import ProfileSetup from "./components/ProfileSetup"
import Layout from "./components/Layout"

import DashboardHeader from "./components/DashboardHeader"
import QuickStats from "./components/QuickStats"
import PlatformCards from "./components/PlatformCards"
import RatingProgress from "./components/RatingSection"
import CodingHeatmap from "./components/CodingHeatmap"

import Leaderboard from "./components/Leaderboard"
import Contests from "./components/Contests"
import Analytics from "./components/Analytics"
import StudentProfile from "./components/StudentProfile"
import Settings from "./components/Settings"


function App() {
    const [currentPage, setCurrentPage] =
        useState("login")

    const [activePage, setActivePage] =
        useState("Dashboard")


    const handleLogin = () => {
        const isFirstTimeUser = true

        if (isFirstTimeUser) {
            setCurrentPage("setup")
        } else {
            setCurrentPage("app")
        }
    }


    const handleSetupComplete = () => {
        setCurrentPage("app")
    }


    /* ========================================= */
    /* AUTH                                      */
    /* ========================================= */

    if (currentPage === "login") {
        return (
            <AuthPage
                onLogin={handleLogin}
            />
        )
    }


    /* ========================================= */
    /* PROFILE SETUP                             */
    /* ========================================= */

    if (currentPage === "setup") {
        return (
            <ProfileSetup
                onComplete={
                    handleSetupComplete
                }
            />
        )
    }


    /* ========================================= */
    /* MAIN APP                                  */
    /* ========================================= */

    return (
        <Layout
            activePage={activePage}
            setActivePage={setActivePage}
        >

            {/* DASHBOARD */}
            {activePage === "Dashboard" && (
                <>
                    <DashboardHeader />
                    <QuickStats />
                    <PlatformCards />
                    <RatingProgress />
                    <CodingHeatmap />
                </>
            )}


            {/* LEADERBOARD */}
            {activePage === "Leaderboard" && (
                <Leaderboard />
            )}


            {/* CONTESTS */}
            {activePage === "Contests" && (
                <Contests />
            )}


            {/* ANALYTICS */}
            {activePage === "Analytics" && (
                <Analytics />
            )}


            {/* STUDENT PROFILE */}
            {activePage === "Student Profile" && (
                <StudentProfile />
            )}


            {/* SETTINGS */}
            {activePage === "Settings" && (
                <Settings
                    onViewProfile={() =>
                        setActivePage(
                            "Student Profile"
                        )
                    }
                    onLogout={() => {
                        setCurrentPage(
                            "login"
                        )

                        setActivePage(
                            "Dashboard"
                        )
                    }}
                />
            )}

        </Layout>
    )
}


export default App