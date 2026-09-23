function TopicProgress({ data = [] }) {
    const colors = [
        "bg-emerald-400",
        "bg-blue-400",
        "bg-purple-400",
        "bg-amber-400",
        "bg-rose-400",
        "bg-cyan-400",
        "bg-indigo-400",
        "bg-orange-400",
        "bg-teal-400",
        "bg-pink-400",
        "bg-lime-400",
        "bg-violet-400",
    ]

    const topicData = data.map((topic, index) => ({
        name: topic.topic,
        solved: topic.solved || 0,
        color: colors[index % colors.length],
    }))

    return (
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/[0.025] blur-3xl" />

            <div className="relative">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="h-6 w-1 rounded-full bg-emerald-400" />

                            <h2 className="text-base font-bold">
                                Topic-wise Progress
                            </h2>
                        </div>

                        <p className="mt-1.5 text-xs text-muted-foreground">
                            Your progress across coding topics
                        </p>
                    </div>

                    <span className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-[10px] font-medium text-muted-foreground">
                        {topicData.length} Topics
                    </span>
                </div>

                {/* Scrollable area */}
                <div className="h-[360px] overflow-y-auto pr-3">
                    {topicData.length === 0 ? (
                        <div className="flex h-full items-center justify-center">
                            <p className="text-sm text-muted-foreground">
                                No topic data available
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                            {topicData.map((topic) => (
                                <div
                                    key={topic.name}
                                    className="group"
                                >
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm font-semibold text-foreground">
                                            {topic.name}
                                        </span>

                                        <span className="font-mono text-xs text-muted-foreground">
                                            {topic.solved} solved
                                        </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                                        <div
                                            className={`h-full rounded-full transition-all duration-700 ${topic.color}`}
                                            style={{
                                                width: `${Math.min(
                                                    topic.solved,
                                                    100
                                                )}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TopicProgress