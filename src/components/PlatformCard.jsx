import { ExternalLink } from "lucide-react"

function PlatformCard({
  platform,
  username,
  mainLabel,
  mainValue,
  stats,
  icon: Icon,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <Icon size={22} />
          </div>

          <div>
            <h3 className="font-bold text-gray-900">
              {platform}
            </h3>

            <p className="text-sm text-gray-400">
              @{username}
            </p>
          </div>
        </div>

        <ExternalLink size={18} className="text-gray-400" />
      </div>

      {/* Main Statistic */}
      <div className="mt-6">
        <p className="text-sm text-gray-500">
          {mainLabel}
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-1">
          {mainValue}
        </h2>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-50 rounded-xl p-3"
          >
            <p className="text-xs text-gray-400">
              {stat.label}
            </p>

            <p className="font-semibold text-gray-800 mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default PlatformCard