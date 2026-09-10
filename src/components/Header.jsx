function Header() {
  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <p className="text-purple-600 font-medium text-sm">
          STUDENT DASHBOARD
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-1">
          Welcome back, Aman 👋
        </h2>

        <p className="text-gray-500 mt-1">
          Track your coding journey in one place.
        </p>
      </div>

      <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm">
        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
          A
        </div>

        <div>
          <p className="font-semibold text-sm">Aman Kumar</p>
          <p className="text-xs text-gray-500">CSE • PW IOI</p>
        </div>
      </div>
    </header>
  )
}

export default Header