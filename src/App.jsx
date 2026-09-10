import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import StatCard from "./components/StatCard"
import PlatformCard from "./components/PlatformCard"
import { Code2, BarChart3 } from "lucide-react"
import ProfileHeader from "./components/ProfileHeader"

function App() {
  return (
    <div className="min-h-screen bg-[#f7f7fb] flex">

      <Sidebar />

      <main className="flex-1 p-8">

        <Header />
        <ProfileHeader />

        <div className="grid grid-cols-3 gap-6">

          <StatCard
            title="Problems Solved"
            value="0"
            description="Across coding platforms"
            icon="💻"
          />

          <StatCard
            title="Current Streak"
            value="0 Days"
            description="Start your coding streak"
            icon="🔥"
          />

          <StatCard
            title="Activity Score"
            value="0"
            description="Overall coding activity"
            icon="📈"
          />

        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">

          <PlatformCard
            platform="LeetCode"
            username="your_username"
            mainLabel="Problems Solved"
            mainValue="0"
            icon={Code2}
            stats={[
              { label: "Easy", value: "0" },
              { label: "Medium", value: "0" },
              { label: "Hard", value: "0" },
            ]}
          />

          <PlatformCard
            platform="Codeforces"
            username="your_username"
            mainLabel="Current Rating"
            mainValue="0"
            icon={BarChart3}
            stats={[
              { label: "Max", value: "0" },
              { label: "Rank", value: "-" },
              { label: "Contests", value: "0" },
            ]}
          />

          <PlatformCard
            platform="GitHub"
            username="your_username"
            mainLabel="Commits"
            mainValue="0"
            icon={Code2}
            stats={[
              { label: "Repos", value: "0" },
              { label: "PRs", value: "0" },
              { label: "Active Days", value: "0" },
            ]}
          />

        </div>

      </main>

    </div>
  )
}

export default App