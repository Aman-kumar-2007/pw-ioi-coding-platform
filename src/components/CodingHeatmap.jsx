import { useMemo, useState } from "react"
import { Activity, ChevronDown } from "lucide-react"

const platforms = [
    "All Platforms",
    "LeetCode",
    "Codeforces",
    "GeeksforGeeks",
    "GitHub",
]

const intensityClasses = [
    "bg-muted",
    "bg-primary/20",
    "bg-primary/40",
    "bg-primary/65",
    "bg-primary",
]

function getPlatformSubmissions(
    monthIndex,
    weekIndex,
    dayIndex,
    platform
) {
    const seed =
        monthIndex * 19 +
        weekIndex * 13 +
        dayIndex * 29 +
        platform.length * 7

    const value = Math.abs(seed) % 15

    if (value < 4) return 0
    if (value < 7) return 1
    if (value < 10) return 2
    if (value < 13) return 4

    return 7
}

function getSubmissions(
    monthIndex,
    weekIndex,
    dayIndex,
    platform
) {
    if (platform === "All Platforms") {
        const codingPlatforms = [
            "LeetCode",
            "Codeforces",
            "GeeksforGeeks",
        ]

        return codingPlatforms.reduce(
            (total, currentPlatform) =>
                total +
                getPlatformSubmissions(
                    monthIndex,
                    weekIndex,
                    dayIndex,
                    currentPlatform
                ),
            0
        )
    }

    return getPlatformSubmissions(
        monthIndex,
        weekIndex,
        dayIndex,
        platform
    )
}

function getIntensity(submissions) {
    if (submissions === 0) return 0
    if (submissions <= 1) return 1
    if (submissions <= 3) return 2
    if (submissions <= 5) return 3
    return 4
}

function CodingHeatmap() {
    const [selectedPlatform, setSelectedPlatform] =
        useState("All Platforms")

    const [isOpen, setIsOpen] = useState(false)
    const [hoveredDay, setHoveredDay] = useState(null)

    /*
     * 12 separate months
     * Each month has 5 columns × 7 days
     */
    const months = useMemo(() => {
        const today = new Date()

        const result = []

        for (let monthIndex = 11; monthIndex >= 0; monthIndex--) {
            const monthDate = new Date(
                today.getFullYear(),
                today.getMonth() - monthIndex,
                1
            )

            const year = monthDate.getFullYear()
            const month = monthDate.getMonth()

            const daysInMonth = new Date(
                year,
                month + 1,
                0
            ).getDate()

            const weeks = []

            for (
                let week = 0;
                week < Math.ceil(daysInMonth / 7);
                week++
            ) {
                const weekDays = []

                for (let day = 0; day < 7; day++) {
                    const dayNumber =
                        week * 7 + day + 1

                    if (dayNumber > daysInMonth) {
                        weekDays.push(null)
                        continue
                    }

                    const date = new Date(
                        year,
                        month,
                        dayNumber
                    )

                    const submissions =
                        getSubmissions(
                            monthIndex,
                            week,
                            day,
                            selectedPlatform
                        )

                    weekDays.push({
                        date,
                        submissions,
                    })
                }

                weeks.push(weekDays)
            }

            result.push({
                name: monthDate.toLocaleDateString(
                    "en-US",
                    {
                        month: "short",
                    }
                ),
                year,
                weeks,
            })
        }

        return result
    }, [selectedPlatform])

    const stats = useMemo(() => {
        let total = 0
        let activeDays = 0

        months.forEach((month) => {
            month.weeks.forEach((week) => {
                week.forEach((day) => {
                    if (!day) return

                    total += day.submissions

                    if (day.submissions > 0) {
                        activeDays++
                    }
                })
            })
        })

        return {
            total,
            activeDays,
            label:
                selectedPlatform === "All Platforms"
                    ? "Total Solved"
                    : selectedPlatform === "GitHub"
                        ? "Contributions"
                        : `${selectedPlatform} Solved`,
        }
    }, [months])

    const formatDate = (date) => {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    return (
        <section className="px-8 pt-7">
            {/* Header */}
            <div className="mb-4 flex items-end justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Activity
                            size={19}
                            className="text-primary"
                        />

                        <h2 className="text-lg font-bold">
                            Coding Activity
                        </h2>
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Your activity across coding and development platforms.
                    </p>
                </div>

                {/* Dropdown */}
                <div className="relative">
                    <button
                        onClick={() =>
                            setIsOpen(!isOpen)
                        }
                        className="flex min-w-[165px] items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-2.5 text-xs font-medium transition-colors hover:border-primary/40"
                    >
                        <span>
                            {selectedPlatform}
                        </span>

                        <ChevronDown
                            size={15}
                            className={`text-muted-foreground transition-transform ${isOpen
                                ? "rotate-180"
                                : ""
                                }`}
                        />
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-[165px] overflow-hidden rounded-lg border border-border bg-card p-1 shadow-xl">
                            {platforms.map(
                                (platform) => (
                                    <button
                                        key={platform}
                                        onClick={() => {
                                            setSelectedPlatform(
                                                platform
                                            )
                                            setIsOpen(
                                                false
                                            )
                                        }}
                                        className={`w-full rounded-md px-3 py-2 text-left text-xs transition-colors ${selectedPlatform ===
                                            platform
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            }`}
                                    >
                                        {platform}
                                    </button>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-border bg-card p-6">
                {/* Month Grid */}
                <div className="grid grid-cols-12 gap-4.5 overflow-visible pb-3">
                    {months.map(
                        (month, monthIndex) => (
                            <div
                                key={`${month.name}-${month.year}`}
                                className="shrink-0"
                            >
                                {/* Month Name */}
                                <p className="mb-3 text-center text-[11px] font-medium text-muted-foreground">
                                    {month.name}
                                </p>

                                {/* Month Grid */}
                                <div className="mx-auto grid w-fit grid-cols-5 gap-[6px]">
                                    {month.weeks.map(
                                        (
                                            week,
                                            weekIndex
                                        ) => (
                                            <div
                                                key={
                                                    weekIndex
                                                }
                                                className="flex flex-col gap-[4px]"
                                            >
                                                {week.map(
                                                    (
                                                        day,
                                                        dayIndex
                                                    ) => {
                                                        if (
                                                            !day
                                                        ) {
                                                            return (
                                                                <div
                                                                    key={
                                                                        dayIndex
                                                                    }
                                                                    className="h-[14px] w-[14px]"
                                                                />
                                                            )
                                                        }

                                                        const intensity =
                                                            getIntensity(
                                                                day.submissions
                                                            )

                                                        const isHovered =
                                                            hoveredDay?.monthIndex ===
                                                            monthIndex &&
                                                            hoveredDay?.weekIndex ===
                                                            weekIndex &&
                                                            hoveredDay?.dayIndex ===
                                                            dayIndex

                                                        return (
                                                            <div
                                                                key={
                                                                    dayIndex
                                                                }
                                                                className="relative"
                                                                onMouseEnter={() =>
                                                                    setHoveredDay(
                                                                        {
                                                                            monthIndex,
                                                                            weekIndex,
                                                                            dayIndex,
                                                                        }
                                                                    )
                                                                }
                                                                onMouseLeave={() =>
                                                                    setHoveredDay(
                                                                        null
                                                                    )
                                                                }
                                                            >
                                                                <div
                                                                    className={`h-[14px] w-[14px] cursor-pointer rounded-[3px] transition-all duration-150 hover:scale-110 hover:ring-1 hover:ring-foreground/40 ${intensityClasses[intensity]}`}
                                                                />

                                                                {/* Tooltip */}
                                                                {isHovered && (
                                                                    <div className="pointer-events-none absolute bottom-full left-1/2 z-[100] mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-[#171b27] px-3 py-2 shadow-2xl">                                                                        <p className="text-[11px] font-semibold text-foreground">
                                                                        {formatDate(
                                                                            day.date
                                                                        )}
                                                                    </p>

                                                                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                                                                            {day.submissions ===
                                                                                0
                                                                                ? "No submissions"
                                                                                : `${day.submissions} ${day.submissions ===
                                                                                    1
                                                                                    ? "submission"
                                                                                    : "submissions"
                                                                                }`}
                                                                        </p>

                                                                        <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-border bg-[#171b27]" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    }
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                    {/* Stats */}
                    <div className="flex items-center">
                        <div className="pr-8">
                            <p className="font-mono text-xl font-bold">
                                {stats.total}
                            </p>

                            <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                                {stats.label}
                            </p>
                        </div>

                        <div className="h-10 w-px bg-border" />

                        <div className="pl-8">
                            <p className="font-mono text-xl font-bold">
                                {stats.activeDays}
                            </p>

                            <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                                Active Days
                            </p>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-2">
                        <span className="mr-1 text-[10px] text-muted-foreground">
                            Less
                        </span>

                        {intensityClasses.map(
                            (className, index) => (
                                <span
                                    key={index}
                                    className={`h-3.5 w-3.5 rounded-[3px] ${className}`}
                                />
                            )
                        )}

                        <span className="ml-1 text-[10px] text-muted-foreground">
                            More
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CodingHeatmap