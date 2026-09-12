// import { useState } from "react"

// import Layout from "./components/Layout"
// import DashboardHeader from "./components/DashboardHeader"
// import QuickStats from "./components/QuickStats"
// import PlatformCards from "./components/PlatformCards"
// import RatingProgress from "./components/RatingSection"
// import CodingHeatmap from "./components/CodingHeatmap"
// import Leaderboard from "./components/Leaderboard"
// import Contests from "./components/Contests"
// import Analytics from "./components/Analytics"
// import TopicProgress from "./components/TopicProgress"

// function App() {
//     const [activePage, setActivePage] = useState("Dashboard")

//     return (
//         <Layout
//             activePage={activePage}
//             setActivePage={setActivePage}
//         >
//             {activePage === "Dashboard" && (
//                 <>
//                     <DashboardHeader />
//                     <QuickStats />
//                     <PlatformCards />
//                     <CodingHeatmap/>
//                     <RatingProgress />
//                 </>
//             )}

//             {activePage === "Leaderboard" && (
//                 <Leaderboard />
//             )}

//             {activePage === "Contests" && (
//                 <Contests />
//             )}

//              {activePage === "Analytics" && (
//                 <Analytics />
//             )}
//         </Layout>
//     )
// }

// export default App

// import AuthPage from "./components/AuthPage"

// function App() {
//     return <AuthPage />
// }

// export default App

// import ProfileSetup from "./components/ProfileSetup"

// function App() {
//     return <ProfileSetup />
// }

// export default App

import { useState } from "react"
import AuthPage from "./components/AuthPage"
import ProfileSetup from "./components/ProfileSetup"
import Dashboard from "./components/DashboardHeader"

function App() {
    const [currentPage, setCurrentPage] = useState("login")

    const handleLogin = () => {
        const isFirstTimeUser = true

        if (isFirstTimeUser) {
            setCurrentPage("setup")
        } else {
            setCurrentPage("dashboard")
        }
    }

    const handleSetupComplete = () => {
        setCurrentPage("dashboard")
    }

    if (currentPage === "login") {
        return <AuthPage onLogin={handleLogin} />
    }

    if (currentPage === "setup") {
        return (
            <ProfileSetup
                onComplete={handleSetupComplete}
            />
        )
    }

    return <DashboardHeader />
}

export default App