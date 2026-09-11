import { useMemo, useState } from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

import {
    Activity,
    Award,
    BarChart3,
    Code2,
    Flame,
    Trophy,
    ExternalLink,
} from "lucide-react"
import TopicProgress from "./TopicProgress"

/* =========================================================
   DATA
   ========================================================= */

const activityData = {
    Weekly: [
        { label: "Mon", problems: 4 },
        { label: "Tue", problems: 7 },
        { label: "Wed", problems: 3 },
        { label: "Thu", problems: 9 },
        { label: "Fri", problems: 6 },
        { label: "Sat", problems: 12 },
        { label: "Sun", problems: 8 },
    ],

    Monthly: [
        { label: "Jan", problems: 6 },
        { label: "Feb", problems: 18 },
        { label: "Mar", problems: 17 },
        { label: "Apr", problems: 13 },
        { label: "May", problems: 19 },
        { label: "Jun", problems: 30 },
        { label: "Jul", problems: 22 },
        { label: "Aug", problems: 16 },
        { label: "Sep", problems: 17 },
        { label: "Oct", problems: 16 },
        { label: "Nov", problems: 23 },
        { label: "Dec", problems: 40 },
    ],

    Yearly: [
        { label: "2022", problems: 84 },
        { label: "2023", problems: 126 },
        { label: "2024", problems: 185 },
        { label: "2025", problems: 312 },
        { label: "2026", problems: 430 },
    ],
}

const ratingData = {
    Weekly: [
        { label: "W1", codeforces: 1490, leetcode: 1180 },
        { label: "W2", codeforces: 1510, leetcode: 1200 },
        { label: "W3", codeforces: 1535, leetcode: 1215 },
        { label: "W4", codeforces: 1542, leetcode: 1230 },
        { label: "W5", codeforces: 1555, leetcode: 1250 },
        { label: "W6", codeforces: 1570, leetcode: 1270 },
        { label: "W7", codeforces: 1560, leetcode: 1280 },
        { label: "W8", codeforces: 1585, leetcode: 1295 },
        { label: "W9", codeforces: 1600, leetcode: 1310 },
        { label: "W10", codeforces: 1625, leetcode: 1330 },
        { label: "W11", codeforces: 1650, leetcode: 1360 },
        { label: "W12", codeforces: 1670, leetcode: 1380 },
    ],

    Monthly: [
        { label: "Jan", codeforces: 1080, leetcode: 890 },
        { label: "Feb", codeforces: 1140, leetcode: 930 },
        { label: "Mar", codeforces: 1180, leetcode: 970 },
        { label: "Apr", codeforces: 1320, leetcode: 1030 },
        { label: "May", codeforces: 1360, leetcode: 1080 },
        { label: "Jun", codeforces: 1480, leetcode: 1130 },
        { label: "Jul", codeforces: 1500, leetcode: 1180 },
        { label: "Aug", codeforces: 1520, leetcode: 1210 },
        { label: "Sep", codeforces: 1600, leetcode: 1240 },
        { label: "Oct", codeforces: 1660, leetcode: 1300 },
        { label: "Nov", codeforces: 1680, leetcode: 1340 },
        { label: "Dec", codeforces: 1810, leetcode: 1400 },
    ],

    Yearly: [
        { label: "2022", codeforces: 920, leetcode: 760 },
        { label: "2023", codeforces: 1080, leetcode: 880 },
        { label: "2024", codeforces: 1260, leetcode: 1010 },
        { label: "2025", codeforces: 1450, leetcode: 1190 },
        { label: "2026", codeforces: 1567, leetcode: 1400 },
    ],
}

const difficultyData = [
    {
        name: "Basic",
        value: 80,
        color: "bg-green-400",
    },
    {
        name: "Easy",
        value: 180,
        color: "bg-emerald-400",
    },
    {
        name: "Medium",
        value: 200,
        color: "bg-amber-400",
    },
    {
        name: "Hard",
        value: 50,
        color: "bg-red-400",
    },
]

const platformData = [
    {
        name: "LeetCode",
        icon: Code2,
        color: "#f59e0b",
        solved: 487,
        easy: 220,
        medium: 198,
        hard: 69,
    },
    {
        name: "Codeforces",
        icon: Trophy,
        color: "#2196f3",
        solved: 312,
        rating: 1847,
        maxRating: 1924,
        contests: 34,
    },
    {
        name: "GitHub",
        icon: Activity,
        color: "#10b981",
        contributions: 203,
        repositories: 28,
        activity: [8, 13, 17, 14, 21, 18, 24, 20, 27, 23, 30, 25, 32, 27, 35, 29, 38, 31, 42, 34],
    },
    {
        name: "GeeksforGeeks",
        icon: Code2,
        color: "#22c55e",
        solved: 347,
        basic: 72,
        easy: 126,
        medium: 108,
        hard: 41,
    },
]


const PERIODS = ["Weekly", "Monthly", "Yearly"]

/* =========================================================
   STAT CARD
   ========================================================= */

function StatCard({
    icon: Icon,
    label,
    value,
    subtitle,
    iconClass,
}) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-secondary/40">
            <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-primary/5 blur-2xl transition-all duration-300 group-hover:bg-primary/10" />

            <div className="relative">
                <div className="flex items-start justify-between">
                    <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconClass}`}
                    >
                        <Icon size={17} />
                    </div>

                    <Activity
                        size={13}
                        className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                    />
                </div>

                <p className="mt-4 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                </p>

                <p className="mt-1 font-mono text-2xl font-bold tracking-tight">
                    {value}
                </p>

                <p className="mt-1 text-[9px] text-emerald-400">
                    {subtitle}
                </p>
            </div>
        </div>
    )
}

/* =========================================================
   COMMON CARD
   ========================================================= */

function AnalyticsCard({ children, className = "" }) {
    return (
        <div
            className={`relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/20 ${className}`}
        >
            <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/[0.025] blur-3xl" />

            <div className="relative">
                {children}
            </div>
        </div>
    )
}

/* =========================================================
   PERIOD SELECTOR
   ========================================================= */

function PeriodSelector({ value, onChange }) {
    return (
        <div className="flex items-center rounded-lg border border-border bg-secondary p-1">
            {PERIODS.map((period) => {
                const active = value === period

                return (
                    <button
                        key={period}
                        onClick={() => onChange(period)}
                        className={`rounded-md px-2.5 py-1.5 text-[9px] font-semibold transition-all duration-200 ${active
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {period}
                    </button>
                )
            })}
        </div>
    )
}

/* =========================================================
   CUSTOM TOOLTIP
   ========================================================= */

function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null

    return (
        <div className="rounded-xl border border-border bg-[#121722]/95 px-3 py-2 shadow-xl backdrop-blur-md">
            <p className="mb-1.5 text-[9px] font-semibold text-muted-foreground">
                {label}
            </p>

            {payload.map((item) => (
                <div
                    key={item.dataKey}
                    className="flex items-center justify-between gap-5"
                >
                    <span className="text-[9px] text-muted-foreground">
                        {item.name || item.dataKey}
                    </span>

                    <span
                        className="font-mono text-[10px] font-semibold"
                        style={{ color: item.color }}
                    >
                        {item.value}
                    </span>
                </div>
            ))}
        </div>
    )
}

/* =========================================================
   ACTIVITY CHART
   ========================================================= */

function ActivityChart() {
    const [period, setPeriod] = useState("Monthly")

    const data = useMemo(
        () => activityData[period],
        [period]
    )

    const total = useMemo(
        () =>
            data.reduce(
                (sum, item) => sum + item.problems,
                0
            ),
        [data]
    )

    return (
        <AnalyticsCard>
            <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-1 rounded-full bg-emerald-400" />

                        <h2 className="text-sm font-bold">
                            Problem Solving Activity
                        </h2>
                    </div>

                    <p className="mt-1 text-[9px] text-muted-foreground">
                        Problems solved over time
                    </p>
                </div>

                <PeriodSelector
                    value={period}
                    onChange={setPeriod}
                />
            </div>

            <div className="mb-4 flex items-end justify-between">
                <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                        Total in selected period
                    </p>

                    <p className="mt-1 font-mono text-lg font-bold text-emerald-400">
                        {total}
                    </p>
                </div>

                <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Problems solved
                </div>
            </div>

            <div className="h-[270px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 5,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            stroke="#20283a"
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="label"
                            tick={{
                                fill: "#7d8495",
                                fontSize: 9,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            allowDecimals={false}
                            tick={{
                                fill: "#7d8495",
                                fontSize: 9,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            content={<ChartTooltip />}
                            cursor={{
                                fill: "#1a2130",
                                opacity: 0.5,
                            }}
                        />

                        <Bar
                            dataKey="problems"
                            name="Problems"
                            fill="#34d399"
                            radius={[5, 5, 0, 0]}
                            maxBarSize={
                                period === "Yearly"
                                    ? 55
                                    : 30
                            }
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </AnalyticsCard>
    )
}

/* =========================================================
   RATING CHART
   ========================================================= */

function RatingChart() {
    const [period, setPeriod] = useState("Monthly")

    const data = useMemo(
        () => ratingData[period],
        [period]
    )

    return (
        <AnalyticsCard>
            <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-1 rounded-full bg-blue-400" />

                        <h2 className="text-sm font-bold">
                            Rating Progress
                        </h2>
                    </div>

                    <p className="mt-1 text-[9px] text-muted-foreground">
                        Rating growth across platforms
                    </p>
                </div>

                <PeriodSelector
                    value={period}
                    onChange={setPeriod}
                />
            </div>

            <div className="mb-4 flex items-center gap-5">
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue-400" />

                    <span className="text-[9px] text-muted-foreground">
                        Codeforces
                    </span>
                </div>

                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-orange-400" />

                    <span className="text-[9px] text-muted-foreground">
                        LeetCode
                    </span>
                </div>
            </div>

            <div className="h-[270px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 5,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            stroke="#20283a"
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="label"
                            tick={{
                                fill: "#7d8495",
                                fontSize: 9,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            domain={["dataMin - 100", "dataMax + 100"]}
                            tick={{
                                fill: "#7d8495",
                                fontSize: 9,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            content={<ChartTooltip />}
                        />

                        <Line
                            type="monotone"
                            dataKey="codeforces"
                            name="Codeforces"
                            stroke="#38bdf8"
                            strokeWidth={2.5}
                            dot={{
                                r: 3,
                                fill: "#38bdf8",
                                strokeWidth: 0,
                            }}
                            activeDot={{
                                r: 5,
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="leetcode"
                            name="LeetCode"
                            stroke="#fb923c"
                            strokeWidth={2.5}
                            dot={{
                                r: 3,
                                fill: "#fb923c",
                                strokeWidth: 0,
                            }}
                            activeDot={{
                                r: 5,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </AnalyticsCard>
    )
}

/* =========================================================
   PLATFORM BREAKDOWN
   ========================================================= */

function PlatformBreakdown() {
    return (
        <div className="lg:col-span-3">
            <div className="mb-4">
                <div className="flex items-center gap-2">
                    <div className="h-5 w-1 rounded-full bg-purple-400" />

                    <h2 className="text-sm font-bold">
                        Platform Overview
                    </h2>
                </div>

                <p className="mt-1 text-[9px] text-muted-foreground">
                    Your coding activity across platforms
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {platformData.map((platform) => {
                    const Icon = platform.icon

                    return (
                        <div
                            key={platform.name}
                            className="group relative min-h-[245px] overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1"
                            style={{
                                borderColor: `${platform.color}55`,
                            }}
                        >
                            {/* Glow */}
                            <div
                                className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full blur-3xl opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                                style={{
                                    backgroundColor: platform.color,
                                }}
                            />

                            <div className="relative flex h-full flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="flex h-12 w-12 items-center justify-center rounded-xl"
                                            style={{
                                                backgroundColor: `${platform.color}18`,
                                                color: platform.color,
                                            }}
                                        >
                                            <Icon size={24} />
                                        </div>

                                        <h3
                                            className="text-lg font-bold"
                                            style={{
                                                color: platform.color,
                                            }}
                                        >
                                            {platform.name}
                                        </h3>
                                    </div>

                                    <button
                                        className="flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                                        style={{
                                            color: platform.color,
                                        }}
                                    >
                                        View Profile
                                        <ExternalLink size={15} />
                                    </button>
                                </div>

                                {/* LeetCode */}
                                {platform.name === "LeetCode" && (
                                    <div className="mt-auto grid grid-cols-[0.8fr_1.2fr] items-end gap-6">
                                        <div>
                                            <p className="font-mono text-5xl font-bold tracking-tight">
                                                {platform.solved}
                                            </p>

                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Problems Solved
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <DifficultyBar
                                                label="Easy"
                                                value={platform.easy}
                                                color="#10b981"
                                            />

                                            <DifficultyBar
                                                label="Medium"
                                                value={platform.medium}
                                                color="#f59e0b"
                                            />

                                            <DifficultyBar
                                                label="Hard"
                                                value={platform.hard}
                                                color="#fb7185"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Codeforces */}
                                {platform.name === "Codeforces" && (
                                    <div className="mt-auto">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <p className="font-mono text-5xl font-bold tracking-tight">
                                                    {platform.solved}
                                                </p>

                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    Problems Solved
                                                </p>
                                            </div>

                                            <div>
                                                <p
                                                    className="font-mono text-5xl font-bold tracking-tight"
                                                    style={{
                                                        color: platform.color,
                                                    }}
                                                >
                                                    {platform.rating}
                                                </p>

                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    Current Rating
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 grid grid-cols-2 border-t border-border pt-4">
                                            <div>
                                                <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                                                    Max Rating
                                                </p>

                                                <p className="mt-1 font-mono text-lg font-semibold">
                                                    {platform.maxRating}
                                                </p>
                                            </div>

                                            <div className="border-l border-border pl-6">
                                                <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                                                    Contests
                                                </p>

                                                <p className="mt-1 font-mono text-lg font-semibold">
                                                    {platform.contests}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* GitHub */}
                                {platform.name === "GitHub" && (
                                    <div className="mt-auto">
                                        <div className="flex items-end justify-between gap-5">
                                            <div>
                                                <p className="font-mono text-5xl font-bold tracking-tight">
                                                    {platform.contributions}
                                                </p>

                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    Contributions
                                                </p>
                                            </div>

                                            <div className="flex h-24 flex-1 items-end justify-end gap-1">
                                                {platform.activity.map(
                                                    (height, index) => (
                                                        <div
                                                            key={index}
                                                            className="w-2 rounded-t-md transition-all duration-300 group-hover:opacity-80"
                                                            style={{
                                                                height: `${height * 2}px`,
                                                                backgroundColor:
                                                                    platform.color,
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                                            <span className="text-sm text-muted-foreground">
                                                Total Repositories
                                            </span>

                                            <span className="font-mono text-lg font-semibold">
                                                {platform.repositories}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* GFG */}
                                {platform.name === "GeeksforGeeks" && (
                                    <div className="mt-auto grid grid-cols-[0.8fr_1.2fr] items-end gap-6">
                                        <div>
                                            <p className="font-mono text-5xl font-bold tracking-tight">
                                                {platform.solved}
                                            </p>

                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Problems Solved
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <DifficultyBar
                                                label="Basic"
                                                value={platform.basic}
                                                color="#22c55e"
                                            />

                                            <DifficultyBar
                                                label="Easy"
                                                value={platform.easy}
                                                color="#34d399"
                                            />

                                            <DifficultyBar
                                                label="Medium"
                                                value={platform.medium}
                                                color="#f59e0b"
                                            />

                                            <DifficultyBar
                                                label="Hard"
                                                value={platform.hard}
                                                color="#fb7185"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function DifficultyBar({ label, value, color }) {
    const percentage = Math.min((value / 250) * 100, 100)

    return (
        <div>
            <div className="mb-1.5 flex items-center justify-between">
                <span
                    className="text-xs font-medium"
                    style={{ color }}
                >
                    {label}
                </span>

                <span className="font-mono text-[10px] text-muted-foreground">
                    {value}
                </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: color,
                    }}
                />
            </div>
        </div>
    )
}

/* =========================================================
   DIFFICULTY
   ========================================================= */

function DifficultyDistribution() {
    const total = difficultyData.reduce(
        (sum, difficulty) => sum + difficulty.value,
        0
    )

    return (
        <AnalyticsCard>
            <div className="mb-6">
                <div className="flex items-center gap-2">
                    <div className="h-5 w-1 rounded-full bg-amber-400" />

                    <h2 className="text-sm font-bold">
                        Difficulty Distribution
                    </h2>
                </div>

                <p className="mt-1 text-[9px] text-muted-foreground">
                    Your problem-solving difficulty mix
                </p>
            </div>

            <div className="space-y-5">
                {difficultyData.map((difficulty) => {
                    const percentage =
                        (difficulty.value / total) * 100

                    return (
                        <div key={difficulty.name}>
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-[10px] font-medium">
                                    {difficulty.name}
                                </span>

                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-[10px] font-semibold">
                                        {difficulty.value}
                                    </span>

                                    <span className="text-[9px] text-muted-foreground">
                                        {percentage.toFixed(1)}%
                                    </span>
                                </div>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-secondary">
                                <div
                                    className={`h-full rounded-full transition-all duration-700 ${difficulty.color}`}
                                    style={{
                                        width: `${percentage}%`,
                                    }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                    Total Problems
                </span>

                <span className="font-mono text-sm font-bold">
                    {total}
                </span>
            </div>
        </AnalyticsCard>
    )
}

/* =========================================================
   MAIN ANALYTICS PAGE
   ========================================================= */

function Analytics() {
    return (
        <section className="px-8 pb-10 pt-7">
            {/* Header */}
            <div className="relative mb-6 overflow-hidden rounded-2xl border border-border bg-card px-6 py-5">
                <div className="absolute left-0 top-0 h-full w-[2px] bg-primary" />

                <div className="absolute -right-24 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

                <div className="absolute bottom-0 left-[35%] h-16 w-16 rounded-full bg-indigo-500/[0.04] blur-2xl" />

                <div className="relative flex items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                                <BarChart3 size={19} />
                            </div>

                            <div>
                                <h1 className="text-xl font-bold tracking-tight">
                                    Coding{" "}
                                    <span className="text-primary">
                                        Analytics
                                    </span>
                                </h1>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Understand your progress and improve
                                    your problem solving.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden items-center gap-6 md:flex">
                        <div className="text-right">
                            <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                                Total Problems
                            </p>

                            <p className="font-mono text-lg font-bold">
                                430
                            </p>
                        </div>

                        <div className="h-8 w-px bg-border" />

                        <div className="text-right">
                            <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                                Overall Growth
                            </p>

                            <p className="font-mono text-lg font-bold text-emerald-400">
                                +18%
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-5">
                <StatCard
                    icon={Code2}
                    label="Problems Solved"
                    value="430"
                    subtitle="+12% from last month"
                    iconClass="bg-emerald-500/10 text-emerald-400"
                />

                <StatCard
                    icon={Trophy}
                    label="Contests"
                    value="28"
                    subtitle="+4% from last month"
                    iconClass="bg-amber-500/10 text-amber-400"
                />

                <StatCard
                    icon={BarChart3}
                    label="Current Rating"
                    value="1567"
                    subtitle="+132 since January"
                    iconClass="bg-blue-500/10 text-blue-400"
                />

                <StatCard
                    icon={Award}
                    label="Global Rank"
                    value="#124,850"
                    subtitle="+18,320 positions"
                    iconClass="bg-purple-500/10 text-purple-400"
                />

                <StatCard
                    icon={Flame}
                    label="Streak"
                    value="42 days"
                    subtitle="Keep the momentum"
                    iconClass="bg-orange-500/10 text-orange-400"
                />
            </div>

            <div className="mb-5">
                <PlatformBreakdown />
            </div>

            <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
                <DifficultyDistribution/>
                <ActivityChart />
                <RatingChart />
                <TopicProgress />
            </div>
        </section>
    )
}

export default Analytics