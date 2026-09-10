function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
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

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h2>

        <p className="mt-2 text-gray-600">
          Welcome to PW IOI Coding Platform
        </p>
      </main>

    </div>
  )
}

export default App