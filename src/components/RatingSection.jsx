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
    { month: "Jul", rating: 1690 },
    { month: "Aug", rating: 1780 },
    { month: "Sep", rating: 1847 },
]

function RatingCard({
    title,
    rating,
    maxRating,
    icon: Icon,
    color,
    data,
}) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                            backgroundColor: `${color}18`,
                            color,
                        }}
                    >
                        <Icon size={21} strokeWidth={1.9} />
                    </div>

                    <div>
                        <h3 className="text-sm font-bold">
                            {title}
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
                        {rating}
                    </p>

                    <p className="text-[9px] text-muted-foreground">
                        Current Rating
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="mt-5 h-[190px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 8,
                            right: 8,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            stroke="var(--border)"
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "var(--muted-foreground)",
                                fontSize: 10,
                            }}
                        />

                        <YAxis
                            domain={[
                                (dataMin) =>
                                    Math.floor(dataMin / 100) * 100 - 100,
                                (dataMax) =>
                                    Math.ceil(dataMax / 100) * 100 + 100,
                            ]}
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "var(--muted-foreground)",
                                fontSize: 9,
                            }}
                        />

                        <Tooltip
                            contentStyle={{
                                background: "var(--card)",
                                border: "1px solid var(--border)",
                                borderRadius: "8px",
                                fontSize: "11px",
                            }}
                            labelStyle={{
                                color: "var(--muted-foreground)",
                            }}
                            formatter={(value) => [
                                value,
                                "Rating",
                            ]}
                        />

                        <Line
                            type="monotone"
                            dataKey="rating"
                            stroke={color}
                            strokeWidth={2.5}
                            dot={{
                                r: 3,
                                fill: color,
                                strokeWidth: 0,
                            }}
                            activeDot={{
                                r: 5,
                                fill: color,
                                strokeWidth: 0,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border pt-3">
                <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                        Max Rating
                    </p>

                    <p className="mt-1 font-mono text-sm font-bold">
                        {maxRating}
                    </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <TrendingUp size={13} />
                    <span>+{rating - data[0].rating}</span>
                </div>
            </div>
        </div>
    )
}

function RatingSection() {
    return (
        <section className="px-8 pt-7">
            <div className="mb-4">
                <h2 className="text-lg font-bold">
                    Rating Progress
                </h2>

                <p className="mt-1 text-xs text-muted-foreground">
                    Track your competitive programming performance over time.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <RatingCard
                    title="LeetCode"
                    rating="1847"
                    maxRating="1912"
                    icon={TrendingUp}
                    color="#f59e0b"
                    data={leetcodeData}
                />

                <RatingCard
                    title="Codeforces"
                    rating="1847"
                    maxRating="1924"
                    icon={Trophy}
                    color="#2196f3"
                    data={codeforcesData}
                />
            </div>
        </section>
    )
}

export default RatingSection