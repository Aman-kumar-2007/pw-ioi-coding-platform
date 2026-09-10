function StatCard({ title, value, description, icon }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h3 className="text-3xl font-bold text-gray-900 mt-3">
            {value}
          </h3>
        </div>

        <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
          {icon}
        </div>
      </div>

      <p className="text-gray-400 text-sm mt-4">
        {description}
      </p>
    </div>
  )
}

export default StatCard