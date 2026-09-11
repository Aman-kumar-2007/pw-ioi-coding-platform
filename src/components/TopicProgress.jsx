const topicData = [
    {
        name: "Arrays",
        solved: 85,
        total: 100,
        color: "bg-blue-400",
    },
    {
        name: "Strings",
        solved: 70,
        total: 100,
        color: "bg-emerald-400",
    },
    {
        name: "Hashing",
        solved: 64,
        total: 100,
        color: "bg-cyan-400",
    },
    {
        name: "Binary Search",
        solved: 58,
        total: 100,
        color: "bg-indigo-400",
    },
    {
        name: "Stack",
        solved: 52,
        total: 100,
        color: "bg-purple-400",
    },
    {
        name: "Linked List",
        solved: 48,
        total: 100,
        color: "bg-pink-400",
    },
    {
        name: "Recursion",
        solved: 45,
        total: 100,
        color: "bg-orange-400",
    },
    {
        name: "Trees",
        solved: 61,
        total: 100,
        color: "bg-green-400",
    },
    {
        name: "Graphs",
        solved: 40,
        total: 100,
        color: "bg-violet-400",
    },
    {
        name: "Dynamic Programming",
        solved: 45,
        total: 100,
        color: "bg-amber-400",
    },
    {
        name: "Greedy",
        solved: 38,
        total: 100,
        color: "bg-red-400",
    },
    {
        name: "Bit Manipulation",
        solved: 35,
        total: 100,
        color: "bg-sky-400",
    },
]

function TopicProgress() {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5">
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/[0.025] blur-3xl" />

            <div className="relative">
                <div className="mb-5">
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-1 rounded-full bg-emerald-400" />

                        <h2 className="text-sm font-bold">
                            Topic-wise Progress
                        </h2>
                    </div>

                    <p className="mt-1 text-[9px] text-muted-foreground">
                        Your progress across coding topics
                    </p>
                </div>

                <div className="max-h-[360px] space-y-4 overflow-y-auto pr-2">
                    {topicData.map((topic) => {
                        const percentage =
                            (topic.solved / topic.total) * 100

                        return (
                            <div key={topic.name}>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <span className="max-w-[180px] truncate text-[10px] font-medium">
                                        {topic.name}
                                    </span>

                                    <span className="font-mono text-[9px] text-muted-foreground">
                                        {topic.solved}/{topic.total}
                                    </span>
                                </div>

                                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                                    <div
                                        className={`h-full rounded-full transition-all duration-700 ${topic.color}`}
                                        style={{
                                            width: `${percentage}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default TopicProgress