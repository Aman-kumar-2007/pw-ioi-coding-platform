import Layout from "./components/Layout"
import DashboardHeader from "./components/DashboardHeader"
import QuickStats from "./components/QuickStats"
import PlatformCards from "./components/PlatformCards"
import RatingSection from "./components/RatingSection"
import CodingHeatmap from "./components/CodingHeatmap"
import LearningProgress from "./components/LearningProgress"

function App() {
    return (
        <Layout>
            <DashboardHeader />
            <QuickStats />
            <PlatformCards />
            <RatingSection />
            <CodingHeatmap/>
            <LearningProgress/>
        </Layout>
    )
}

export default App