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
import StudentProfile from "./components/StudentProfile"
import Contests from "./components/Contests"
import Analytics from "./components/Analytics"
import Settings from "./components/Settings"
import Notifications from "./components/Notifications"


function App() {

    /* ===================================================== */
    /* AUTH STATE                                            */
    /* ===================================================== */

    const [currentPage, setCurrentPage] =
        useState("login")


    /* ===================================================== */
    /* APP NAVIGATION                                        */
    /* ===================================================== */

    const [activePage, setActivePage] =
        useState("Dashboard")


    /* ===================================================== */
    /* LOGIN                                                 */
    /* ===================================================== */

    const handleLogin = () => {

        /*
         * Temporary frontend testing.
         *
         * Backend aane ke baad yahin actual
         * first-time user check hoga.
         */

        const isFirstTimeUser = true


        if (isFirstTimeUser) {
            setCurrentPage("setup")
        } else {
            setCurrentPage("app")
        }
    }


    /* ===================================================== */
    /* PROFILE SETUP COMPLETE                                */
    /* ===================================================== */

    const handleSetupComplete = () => {
        setCurrentPage("app")
    }


    /* ===================================================== */
    /* LOGIN PAGE                                            */
    /* ===================================================== */

    if (currentPage === "login") {
        return (
            <AuthPage
                onLogin={handleLogin}
            />
        )
    }


    /* ===================================================== */
    /* FIRST TIME PROFILE SETUP                              */
    /* ===================================================== */

    if (currentPage === "setup") {
        return (
            <ProfileSetup
                onComplete={
                    handleSetupComplete
                }
            />
        )
    }


    /* ===================================================== */
    /* MAIN APPLICATION                                      */
    /* ===================================================== */

    return (
        <Layout
            activePage={activePage}
            setActivePage={setActivePage}
            onLogout={() => {
                setCurrentPage("login")
                setActivePage("Dashboard")
            }}
        >

            {/* ================================================= */}
            {/* DASHBOARD                                         */}
            {/* ================================================= */}

            {activePage === "Dashboard" && (
                <>
                    <DashboardHeader />

                    <QuickStats />

                    <PlatformCards />

                    <RatingProgress />

                    <CodingHeatmap />
                </>
            )}


            {/* ================================================= */}
            {/* LEADERBOARD                                       */}
            {/* ================================================= */}

            {activePage === "Leaderboard" && (
                <Leaderboard />
            )}


            {/* ================================================= */}
            {/* STUDENT PROFILE                                   */}
            {/* ================================================= */}

            {activePage === "Student Profile" && (
                <StudentProfile />
            )}


            {/* ================================================= */}
            {/* CONTESTS                                          */}
            {/* ================================================= */}

            {activePage === "Contests" && (
                <Contests />
            )}


            {/* ================================================= */}
            {/* ANALYTICS                                         */}
            {/* ================================================= */}

            {activePage === "Analytics" && (
                <Analytics />
            )}


            {/* ================================================= */}
            {/* SETTINGS                                          */}
            {/* ================================================= */}

            {activePage === "Settings" && (
                <Settings
                    onViewProfile={() =>
                        setActivePage(
                            "Student Profile"
                        )
                    }

                    onLogout={() => {
                        setCurrentPage("login")
                        setActivePage("Dashboard")
                    }}
                />
            )}


            {/* ================================================= */}
            {/* NOTIFICATIONS                                     */}
            {/* ================================================= */}

            {activePage === "Notifications" && (
                <Notifications />
            )}

        </Layout>
    )
}


export default App