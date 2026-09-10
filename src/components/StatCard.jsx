function StatCard({ title, value, description }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h3 className="text-3xl font-bold text-gray-900 mt-2">
        {value}
      </h3>

      <p className="text-gray-500 text-sm mt-2">
        {description}
      </p>
    </div>
  )
}

export default StatCard