import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp } from "lucide-react"

const codeforcesData = [
  { contest: "1", rating: 1200 },
  { contest: "2", rating: 1280 },
  { contest: "3", rating: 1240 },
  { contest: "4", rating: 1390 },
  { contest: "5", rating: 1510 },
  { contest: "6", rating: 1460 },
  { contest: "7", rating: 1620 },
]

const leetcodeData = [
  { contest: "1", rating: 1450 },
  { contest: "2", rating: 1510 },
  { contest: "3", rating: 1480 },
  { contest: "4", rating: 1600 },
  { contest: "5", rating: 1720 },
  { contest: "6", rating: 1680 },
  { contest: "7", rating: 1810 },
]

function RatingGraph({ title, currentRating, maxRating, data }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">

      <div className="flex items-center justify-between mb-5">
        <div>
          <h4 className="font-bold text-gray-900">
            {title}
          </h4>

          <div className="flex gap-4 mt-2">
            <p className="text-sm text-gray-500">
              Rating{" "}
              <span className="font-semibold text-gray-900">
                {currentRating}
              </span>
            </p>

            <p className="text-sm text-gray-500">
              Max{" "}
              <span className="font-semibold text-purple-600">
                {maxRating}
              </span>
            </p>
          </div>
        </div>

        <TrendingUp
          size={20}
          className="text-purple-600"
        />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="contest"
              tick={{ fontSize: 11 }}
              tickFormatter={(value) => `#${value}`}
            />

            <YAxis
              tick={{ fontSize: 11 }}
              domain={["dataMin - 100", "dataMax + 100"]}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="rating"
              stroke="#7c3aed"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#7c3aed",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

function RatingChart() {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-6">

      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">

        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
          <TrendingUp size={20} />
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Rating Progress
          </h3>

          <p className="text-sm text-gray-400">
            Track your competitive programming journey
          </p>
        </div>

      </div>

      {/* Two Graphs */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <RatingGraph
          title="Codeforces"
          currentRating="1620"
          maxRating="1620"
          data={codeforcesData}
        />

        <RatingGraph
          title="LeetCode"
          currentRating="1810"
          maxRating="1810"
          data={leetcodeData}
        />

      </div>

    </section>
  )
}

export default RatingChart