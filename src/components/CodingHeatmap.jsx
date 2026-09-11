import { Activity } from "lucide-react"

const weeks = 52
const days = 7

function getIntensity(week, day) {
    const value = (week * 17 + day * 11) % 10

    if (value < 3) return 0
    if (value < 5) return 1
    if (value < 7) return 2
    if (value < 9) return 3
    return 4
}

const intensityClasses = [
    "bg-muted",
    "bg-primary/20",
    "bg-primary/40",
    "bg-primary/65",
    "bg-primary",
]

function CodingHeatmap() {
    return (
        <section className="px-8 pt-7">
            {/* Header */}
            <div className="mb-4 flex items-end justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Activity
                            size={18}
                            className="text-primary"
                        />

                        <h2 className="text-lg font-bold">
                            Coding Activity
                        </h2>
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                        LeetCode + Codeforces activity over the last year.
                    </p>
                </div>

                <div className="flex items-center gap-5">
                    <div>
                        <p className="font-mono text-lg font-bold">
                            1,284
                        </p>

                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                            Submissions
                        </p>
                    </div>

                    <div>
                        <p className="font-mono text-lg font-bold">
                            47
                        </p>

                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                            Current Streak
                        </p>
                    </div>
                </div>
            </div>

            {/* Heatmap Card */}
            <div className="rounded-2xl border border-border bg-card p-6">
                {/* Month Labels */}
                <div className="mb-3 ml-8 flex justify-between pr-1">
                    {[
                        "Oct",
                        "Nov",
                        "Dec",
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                    ].map((month) => (
                        <span
                            key={month}
                            className="text-[10px] text-muted-foreground"
                        >
                            {month}
                        </span>
                    ))}
                </div>

                <div className="flex gap-2">
                    {/* Day Labels */}
                    <div className="flex w-6 flex-col justify-between py-[2px]">
                        <span className="text-[9px] text-muted-foreground">
                            Mon
                        </span>
                        <span className="text-[9px] text-muted-foreground">
                            Wed
                        </span>
                        <span className="text-[9px] text-muted-foreground">
                            Fri
                        </span>
                    </div>

                    {/* Grid */}
                    <div className="flex min-w-0 flex-1 gap-[3px] overflow-hidden">
                        {Array.from({ length: weeks }).map(
                            (_, weekIndex) => (
                                <div
                                    key={weekIndex}
                                    className="flex min-w-0 flex-1 flex-col gap-[3px]"
                                >
                                    {Array.from({
                                        length: days,
                                    }).map((_, dayIndex) => {
                                        const intensity =
                                            getIntensity(
                                                weekIndex,
                                                dayIndex
                                            )

                                        return (
                                            <div
                                                key={dayIndex}
                                                title={`${intensity} submissions`}
                                                className={`aspect-square w-full max-w-[16px] rounded-[3px] ${intensityClasses[intensity]}`}
                                            />
                                        )
                                    })}
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-5 flex items-center justify-end gap-2">
                    <span className="text-[10px] text-muted-foreground">
                        Less
                    </span>

                    {intensityClasses.map((className, index) => (
                        <span
                            key={index}
                            className={`h-3 w-3 rounded-[2px] ${className}`}
                        />
                    ))}

                    <span className="text-[10px] text-muted-foreground">
                        More
                    </span>
                </div>
            </div>
        </section>
    )
}

export default CodingHeatmap