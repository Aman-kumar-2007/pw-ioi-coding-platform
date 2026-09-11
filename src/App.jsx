import Layout from "./components/Layout"
import DashboardHeader from "./components/DashboardHeader"
import QuickStats from "./components/QuickStats"
import PlatformCards from "./components/PlatformCards"
import RatingSection from "./components/RatingSection"

function App() {
    return (
        <Layout>
            <DashboardHeader />
            <QuickStats />
            <PlatformCards />
            <RatingSection />
        </Layout>
    )
}

export default App