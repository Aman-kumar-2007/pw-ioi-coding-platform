const topicData = [
    { name: "Arrays", solved: 85, color: "bg-blue-400" },
    { name: "Strings", solved: 70, color: "bg-emerald-400" },
    { name: "Hashing", solved: 64, color: "bg-cyan-400" },
    { name: "Binary Search", solved: 58, color: "bg-indigo-400" },
    { name: "Stack", solved: 52, color: "bg-purple-400" },
    { name: "Linked List", solved: 48, color: "bg-pink-400" },
    { name: "Recursion", solved: 45, color: "bg-orange-400" },
    { name: "Trees", solved: 61, color: "bg-green-400" },
    { name: "Graphs", solved: 40, color: "bg-violet-400" },
    { name: "Dynamic Programming", solved: 45, color: "bg-amber-400" },
    { name: "Greedy", solved: 38, color: "bg-red-400" },
    { name: "Bit Manipulation", solved: 35, color: "bg-sky-400" },
]

function TopicProgress() {
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
                        12 Topics
                    </span>
                </div>

                {/* Scrollable area */}
                <div className="h-[360px] overflow-y-auto pr-3">
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
                                            width: `${topic.solved}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopicProgress