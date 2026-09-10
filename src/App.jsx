import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import StatCard from "./components/StatCard"

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      <Sidebar />

      <main className="flex-1 p-8">
        <Header />

        <div className="grid grid-cols-3 gap-6">
          <StatCard
            title="Problems Solved"
            value="0"
            description="Across coding platforms"
          />

          <StatCard
            title="Current Streak"
            value="0 Days"
            description="Keep coding!"
          />

          <StatCard
            title="Activity Score"
            value="0"
            description="Overall coding activity"
          />
        </div>
      </main>

    </div>
  )
}

export default App