import { useState } from "react"

import {
    Trophy,
    CalendarDays,
    Clock3,
    Code2,
    BarChart3,
} from "lucide-react"

const platforms = [
    {
        label: "All Platforms",
        icon: Trophy,
    },
    {
        label: "LeetCode",
        icon: Code2,
    },
    {
        label: "Codeforces",
        icon: BarChart3,
    },
]

function Contests() {
    const [selectedPlatform, setSelectedPlatform] = useState("All Platforms")
    const [selectedView, setSelectedView] = useState("Upcoming")

    return (
        <section className="px-8 pb-10 pt-7">
            {/* Header */}
            <div className="relative mb-6 overflow-hidden rounded-2xl border border-border bg-card px-6 py-5">
                <div className="absolute left-0 top-0 h-full w-[2px] bg-primary" />

                <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative flex items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Trophy size={18} />
                            </div>

                            <div>
                                <h1 className="text-xl font-bold">
                                    Coding{" "}
                                    <span className="text-primary">
                                        Contests
                                    </span>
                                </h1>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Compete, improve and climb the ranks.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden items-center gap-6 md:flex">
                        <div className="flex items-center gap-2">
                            <CalendarDays
                                size={15}
                                className="text-primary"
                            />
                            <div>
                                <p className="text-xs font-semibold">
                                    Upcoming
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                    Never miss a contest
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Clock3
                                size={15}
                                className="text-primary"
                            />
                            <div>
                                <p className="text-xs font-semibold">
                                    Track performance
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                    Analyze your results
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                {/* Platform Filter */}
                <div className="flex items-center gap-2">
                    {platforms.map((platform) => {
                        const Icon = platform.icon
                        const active =
                            selectedPlatform === platform.label

                        return (
                            <button
                                key={platform.label}
                                onClick={() =>
                                    setSelectedPlatform(platform.label)
                                }
                                className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition-all duration-200 ${
                                    active
                                        ? "border-primary/50 bg-primary/10 text-primary"
                                        : "border-border bg-secondary text-muted-foreground hover:border-primary/30 hover:bg-muted hover:text-foreground"
                                }`}
                            >
                                <Icon size={14} />
                                {platform.label}
                            </button>
                        )
                    })}
                </div>

                {/* Upcoming / Past */}
                <div className="flex items-center rounded-lg border border-border bg-secondary p-1">
                    {["Upcoming", "Past"].map((view) => {
                        const active = selectedView === view

                        return (
                            <button
                                key={view}
                                onClick={() => setSelectedView(view)}
                                className={`rounded-md px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                                    active
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {view}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Temporary content */}
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-border bg-card">
                <div className="text-center">
                    <Trophy
                        size={28}
                        className="mx-auto text-muted-foreground"
                    />

                    <p className="mt-3 text-sm font-semibold">
                        {selectedView} Contests
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        {selectedPlatform} contests will appear here.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Contests