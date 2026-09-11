import {
    TrendingUp,
    Trophy,
} from "lucide-react"

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts"

const leetcodeData = [
    { month: "Apr", rating: 1580 },
    { month: "May", rating: 1625 },
    { month: "Jun", rating: 1690 },
    { month: "Jul", rating: 1715 },
    { month: "Aug", rating: 1770 },
    { month: "Sep", rating: 1847 },
]

const codeforcesData = [
    { month: "Apr", rating: 1540 },
    { month: "May", rating: 1610 },
    { month: "Jun", rating: 1585 },
    { month: "Jul", rating: 1685 },
    { month: "Aug", rating: 1775 },
    { month: "Sep", rating: 1847 },
]

function RatingTooltip({ active, payload, label, color }) {
    if (!active || !payload?.length) {
        return null
    }

    return (
        <div className="rounded-lg border border-border bg-[#171b27] px-3 py-2 shadow-xl">
            <p className="text-[10px] text-muted-foreground">
                {label}
            </p>

            <p
                className="mt-1 font-mono text-xs font-semibold"
                style={{ color }}
            >
                Rating: {payload[0].value}
            </p>
        </div>
    )
}

function RatingCard({
    platform,
    data,
    currentRating,
    maxRating,
    color,
    icon,
}) {
    const ratingIncrease =
        currentRating - data[0].rating

    return (
        <div className="rounded-2xl border border-border bg-card p-5">
            {/* Card Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                            backgroundColor: `${color}18`,
                            color,
                        }}
                    >
                        {icon}
                    </div>

                    <div>
                        <h3 className="text-sm font-bold">
                            {platform}
                        </h3>

                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                            Rating History
                        </p>
                    </div>
                </div>

                <div className="text-right">
                    <p
                        className="font-mono text-xl font-bold"
                        style={{ color }}
                    >
                        {currentRating}
                    </p>

                    <p className="text-[9px] text-muted-foreground">
                        Current Rating
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="mt-5 h-[190px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <LineChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 4,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#252833"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            tick={{
                                fill: "#6b6b7b",
                                fontSize: 10,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            domain={[
                                "dataMin - 100",
                                "dataMax + 100",
                            ]}
                            tick={{
                                fill: "#6b6b7b",
                                fontSize: 9,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            cursor={{
                                stroke: "#3a3d49",
                                strokeDasharray: "4 4",
                            }}
                            content={(props) => (
                                <RatingTooltip
                                    {...props}
                                    color={color}
                                />
                            )}
                        />

                        <Line
                            type="monotone"
                            dataKey="rating"
                            stroke={color}
                            strokeWidth={2.5}
                            dot={{
                                r: 3.5,
                                fill: color,
                                strokeWidth: 0,
                            }}
                            activeDot={{
                                r: 5,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between border-t border-border pt-4">
                <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                        Max Rating
                    </p>

                    <p className="mt-1 font-mono text-sm font-semibold">
                        {maxRating}
                    </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                    <TrendingUp size={13} />

                    <span>
                        +{ratingIncrease}
                    </span>
                </div>
            </div>
        </div>
    )
}

function RatingProgress() {
    return (
        <section className="px-8 pt-7">
            {/* Section Header */}
            <div className="mb-4">
                <div className="flex items-center gap-2">
                    <TrendingUp
                        size={18}
                        className="text-primary"
                    />

                    <h2 className="text-lg font-bold">
                        Rating Progress
                    </h2>
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                    Track your competitive programming performance over time.
                </p>
            </div>

            {/* Rating Cards */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <RatingCard
                    platform="LeetCode"
                    data={leetcodeData}
                    currentRating={1847}
                    maxRating={1912}
                    color="#f59e0b"
                    icon={<TrendingUp size={20} />}
                />

                <RatingCard
                    platform="Codeforces"
                    data={codeforcesData}
                    currentRating={1847}
                    maxRating={1924}
                    color="#2196f3"
                    icon={<Trophy size={20} />}
                />
            </div>
        </section>
    )
}

export default RatingProgress