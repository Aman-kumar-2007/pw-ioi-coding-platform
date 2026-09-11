import Layout from "./components/Layout"
import DashboardHeader from "./components/DashboardHeader"
import QuickStats from "./components/QuickStats"
import PlatformCards from "./components/PlatformCards"
import RatingSection from "./components/RatingSection"
import CodingHeatmap from "./components/CodingHeatmap"

function App() {
    return (
        <Layout>
            <DashboardHeader />
            <QuickStats />
            <PlatformCards />
            <RatingSection />
            <CodingHeatmap/>
        </Layout>
    )
}

export default App