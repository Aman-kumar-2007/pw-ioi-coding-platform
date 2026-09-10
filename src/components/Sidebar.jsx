function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-10">
        PW IOI
      </h1>

      <nav className="space-y-4">
        <p>Dashboard</p>
        <p>My Profile</p>
        <p>Leaderboard</p>
        <p>Settings</p>
      </nav>
    </aside>
  )
}

export default Sidebar