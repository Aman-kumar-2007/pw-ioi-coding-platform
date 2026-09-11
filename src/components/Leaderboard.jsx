import {
    Medal,
    Search,
    ChevronDown,
} from "lucide-react"

const students = [
    {
        rank: 1,
        name: "Rahul Sharma",
        batch: "CSE • 3rd Year",
        solved: 1248,
        cfRating: 1924,
        lcRating: 2018,
        streak: 86,
    },
    {
        rank: 2,
        name: "Arjun Verma",
        batch: "CSE • 3rd Year",
        solved: 1187,
        cfRating: 1887,
        lcRating: 1976,
        streak: 72,
    },
    {
        rank: 3,
        name: "Aman Kumar",
        batch: "CSE • 3rd Year",
        solved: 847,
        cfRating: 1847,
        lcRating: 1912,
        streak: 47,
    },
    {
        rank: 4,
        name: "Aditya Singh",
        batch: "IT • 3rd Year",
        solved: 821,
        cfRating: 1812,
        lcRating: 1884,
        streak: 64,
    },
    {
        rank: 5,
        name: "Karan Mehta",
        batch: "CSE • 2nd Year",
        solved: 796,
        cfRating: 1788,
        lcRating: 1852,
        streak: 51,
    },
    {
        rank: 6,
        name: "Rohan Gupta",
        batch: "ECE • 3rd Year",
        solved: 742,
        cfRating: 1764,
        lcRating: 1819,
        streak: 39,
    },
]

function Leaderboard() {
    return (
        <section className="px-8 pb-10 pt-7">
            {/* Header */}
            <div className="mb-6 flex items-end justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Medal
                            size={18}
                            className="text-primary"
                        />

                        <h2 className="text-lg font-bold">
                            Leaderboard
                        </h2>
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                        See how you rank among PW IOI students.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2">
                    <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-secondary px-3 text-xs font-medium text-muted-foreground hover:text-foreground">
                        All Batches
                        <ChevronDown size={14} />
                    </button>

                    <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-secondary px-3 text-xs font-medium text-muted-foreground hover:text-foreground">
                        All Time
                        <ChevronDown size={14} />
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="mb-5 flex h-10 items-center gap-2 rounded-lg border border-border bg-secondary px-3">
                <Search
                    size={15}
                    className="text-muted-foreground"
                />

                <input
                    type="text"
                    placeholder="Search student..."
                    className="w-full bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
                />
            </div>

            {/* Leaderboard Table */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
                {/* Table Header */}
                <div className="grid grid-cols-[70px_1fr_130px_130px_130px_100px] items-center border-b border-border bg-secondary/50 px-5 py-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Rank
                    </span>

                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Student
                    </span>

                    <span className="text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Solved
                    </span>

                    <span className="text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        CF Rating
                    </span>

                    <span className="text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        LC Rating
                    </span>

                    <span className="text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Streak
                    </span>
                </div>

                {/* Rows */}
                {students.map((student) => (
                    <div
                        key={student.rank}
                        className={`grid grid-cols-[70px_1fr_130px_130px_130px_100px] items-center px-5 py-4 transition-colors hover:bg-secondary/40 ${
                            student.name === "Aman Kumar"
                                ? "bg-primary/5"
                                : ""
                        }`}
                    >
                        {/* Rank */}
                        <div>
                            <span
                                className={`font-mono text-sm font-bold ${
                                    student.rank <= 3
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                }`}
                            >
                                #{student.rank}
                            </span>
                        </div>

                        {/* Student */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-bold">
                                {student.name
                                    .split(" ")
                                    .map((word) => word[0])
                                    .join("")}
                            </div>

                            <div>
                                <p className="text-sm font-semibold">
                                    {student.name}
                                </p>

                                <p className="mt-0.5 text-[10px] text-muted-foreground">
                                    {student.batch}
                                </p>
                            </div>
                        </div>

                        {/* Solved */}
                        <p className="text-right font-mono text-xs font-semibold">
                            {student.solved}
                        </p>

                        {/* CF */}
                        <p className="text-right font-mono text-xs font-semibold text-[#2196f3]">
                            {student.cfRating}
                        </p>

                        {/* LC */}
                        <p className="text-right font-mono text-xs font-semibold text-[#f59e0b]">
                            {student.lcRating}
                        </p>

                        {/* Streak */}
                        <p className="text-right font-mono text-xs font-semibold">
                            {student.streak}d
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Leaderboard