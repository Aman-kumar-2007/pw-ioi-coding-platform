import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import StatCard from "./components/StatCard"

function App() {
  return (
    <div className="min-h-screen bg-[#f7f7fb] flex">

      <Sidebar />

      <main className="flex-1 p-8">

        <Header />

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

      </main>

    </div>
  )
}

export default App