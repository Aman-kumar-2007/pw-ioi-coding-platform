import { useState } from "react"

import Layout from "./components/Layout"
import DashboardHeader from "./components/DashboardHeader"
import QuickStats from "./components/QuickStats"
import PlatformCards from "./components/PlatformCards"
import RatingProgress from "./components/RatingSection"
import CodingHeatmap from "./components/CodingHeatmap"
import LearningProgress from "./components/LearningProgress"
import Leaderboard from "./components/Leaderboard"
import Contests from "./components/Contests"
import Analytics from "./components/Analytics"

function App() {
    const [activePage, setActivePage] = useState("Dashboard")

    return (
        <Layout
            activePage={activePage}
            setActivePage={setActivePage}
        >
            {activePage === "Dashboard" && (
                <>
                    <DashboardHeader />
                    <QuickStats />
                    <PlatformCards />
                    <RatingProgress />
                    <CodingHeatmap />
                    <LearningProgress />
                </>
            )}

            {activePage === "Leaderboard" && (
                <Leaderboard />
            )}

            {activePage === "Contests" && (
                <Contests />
            )}

             {activePage === "Analytics" && (
                <Analytics />
            )}
        </Layout>
    )
}

export default App