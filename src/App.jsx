import Layout from "./components/Layout"
import DashboardHeader from "./components/DashboardHeader"
import QuickStats from "./components/QuickStats"
import PlatformCards from "./components/PlatformCards"

function App() {
  return (
    <Layout>
      <DashboardHeader />
      <QuickStats />
      <PlatformCards />
    </Layout>
  )
}

export default App