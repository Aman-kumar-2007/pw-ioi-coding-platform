function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#171124] text-white p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center font-bold">
          P
        </div>

        <div>
          <h1 className="font-bold text-lg">PW IOI</h1>
          <p className="text-xs text-gray-400">Coding Platform</p>
        </div>
      </div>

      <nav className="space-y-2">
        <p className="bg-purple-600/20 text-purple-300 px-4 py-3 rounded-xl">
          🏠 Dashboard
        </p>

        <p className="text-gray-400 hover:bg-white/5 px-4 py-3 rounded-xl cursor-pointer">
          👤 My Profile
        </p>

        <p className="text-gray-400 hover:bg-white/5 px-4 py-3 rounded-xl cursor-pointer">
          🏆 Leaderboard
        </p>

        <p className="text-gray-400 hover:bg-white/5 px-4 py-3 rounded-xl cursor-pointer">
          ⚙️ Settings
        </p>
      </nav>

      <div className="mt-auto bg-white/5 rounded-2xl p-4">
        <p className="text-sm font-semibold">Keep coding 🚀</p>
        <p className="text-xs text-gray-400 mt-1">
          Build • Learn • Grow
        </p>
      </div>
    </aside>
  )
}

export default Sidebar