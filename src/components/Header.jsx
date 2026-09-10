function Header() {
  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h2>

        <p className="text-gray-600 mt-1">
          Welcome back!
        </p>
      </div>

      <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center">
        A
      </div>
    </header>
  )
}

export default Header