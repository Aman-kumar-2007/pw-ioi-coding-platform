import {
    BookOpen,
    ChevronRight,
} from "lucide-react"

const topics = [
    {
        name: "Arrays",
        solved: 126,
        max: 126,
    },
    {
        name: "Strings",
        solved: 94,
        max: 126,
    },
    {
        name: "Hashing",
        solved: 82,
        max: 126,
    },
    {
        name: "Binary Search",
        solved: 61,
        max: 126,
    },
    {
        name: "Stack",
        solved: 57,
        max: 126,
    },
    {
        name: "Linked List",
        solved: 43,
        max: 126,
    },
    {
        name: "Recursion",
        solved: 51,
        max: 126,
    },
    {
        name: "Trees",
        solved: 68,
        max: 126,
    },
    {
        name: "Graphs",
        solved: 41,
        max: 126,
    },
    {
        name: "Dynamic Programming",
        solved: 73,
        max: 126,
    },
    {
        name: "Greedy",
        solved: 52,
        max: 126,
    },
    {
        name: "Bit Manipulation",
        solved: 38,
        max: 126,
    },
]

function LearningProgress() {
    const highestSolved = Math.max(
        ...topics.map((topic) => topic.solved)
    )

    return (
        <section className="px-8 pb-10 pt-7">
            {/* Header */}
            <div className="mb-4 flex items-end justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <BookOpen
                            size={18}
                            className="text-primary"
                        />

                        <h2 className="text-lg font-bold">
                            Learning Progress
                        </h2>
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Problems solved by topic across LeetCode and Codeforces.
                    </p>
                </div>

                <button className="flex items-center gap-1 text-xs font-medium text-primary hover:opacity-80">
                    View all topics
                    <ChevronRight size={14} />
                </button>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-border bg-card p-6">
                <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
                    {topics.map((topic) => {
                        const width =
                            (topic.solved / highestSolved) * 100

                        return (
                            <div key={topic.name}>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                        {topic.name}
                                    </span>

                                    <span className="font-mono text-xs font-semibold text-muted-foreground">
                                        {topic.solved} solved
                                    </span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-primary transition-all"
                                        style={{
                                            width: `${width}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default LearningProgress