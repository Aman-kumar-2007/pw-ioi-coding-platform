import {
    Medal,
    Search,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    MapPin,
    Flame,
    Trophy,
    Crown,
} from "lucide-react"

const students = [
    {
        rank: 1,
        name: "Rahul Sharma",
        username: "@rahul_sharma",
        initials: "RS",
        city: "Noida",
        year: "3rd Year",
        score: 4325.42,
        streak: 42,
        solved: 612,
    },
    {
        rank: 2,
        name: "Arjun Verma",
        username: "@arjun_verma",
        initials: "AV",
        city: "Bangalore",
        year: "3rd Year",
        score: 3792.61,
        streak: 38,
        solved: 580,
    },
    {
        rank: 3,
        name: "Krish Upadhyay",
        username: "@krish_upadhyay",
        initials: "KU",
        city: "Noida",
        year: "2nd Year",
        score: 3351.28,
        streak: 29,
        solved: 498,
    },
    {
        rank: 4,
        name: "Aditya Singh",
        username: "@aditya_singh",
        initials: "AS",
        city: "Bangalore",
        year: "3rd Year",
        score: 3120.14,
        streak: 24,
        solved: 461,
    },
    {
        rank: 5,
        name: "Priya Kulkarni",
        username: "@priya_k",
        initials: "PK",
        city: "Pune",
        year: "2nd Year",
        score: 2984.77,
        streak: 21,
        solved: 438,
    },
    {
        rank: 6,
        name: "Rohan Singh",
        username: "@rohan_singh",
        initials: "RS",
        city: "Lucknow",
        year: "3rd Year",
        score: 2810.36,
        streak: 19,
        solved: 402,
    },
    {
        rank: 7,
        name: "Aman Kumar",
        username: "@aman_k",
        initials: "AK",
        city: "Noida",
        year: "3rd Year",
        score: 2675.89,
        streak: 17,
        solved: 389,
    },
    {
        rank: 8,
        name: "Sneha Verma",
        username: "@sneha_v",
        initials: "SV",
        city: "Bangalore",
        year: "1st Year",
        score: 2541.13,
        streak: 15,
        solved: 361,
    },
    {
        rank: 9,
        name: "Devansh Tiwari",
        username: "@dev_t",
        initials: "DT",
        city: "Pune",
        year: "2nd Year",
        score: 2418.67,
        streak: 14,
        solved: 352,
    },
    {
        rank: 10,
        name: "Karan Jain",
        username: "@karan_j",
        initials: "KJ",
        city: "Lucknow",
        year: "1st Year",
        score: 2290.11,
        streak: 13,
        solved: 331,
    },
]

function FilterButton({ icon: Icon, children }) {
    return (
        <button className="group flex h-9 items-center gap-2 rounded-lg border border-border bg-secondary px-3 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-muted hover:text-foreground">
            {Icon && (
                <Icon
                    size={13}
                    className="transition-transform duration-200 group-hover:scale-110"
                />
            )}

            <span>{children}</span>

            <ChevronDown
                size={13}
                className="transition-transform duration-200 group-hover:translate-y-0.5"
            />
        </button>
    )
}

function PodiumCard({ student, position }) {
    const isFirst = position === 1
    const isSecond = position === 2
    const isThird = position === 3

    const rankStyles = {
        1: {
            border: "border-amber-400/50",
            icon: "border-amber-400/40 bg-amber-400/10 text-amber-400",
            avatar:
                "border-amber-400/70 bg-amber-400/10 text-amber-300",
            badge: "bg-amber-400 text-[#15110a]",
            score:
                "border-amber-400/20 bg-amber-400/[0.06]",
            scoreText: "text-amber-300",
            glow: "shadow-[0_12px_50px_rgba(245,158,11,0.10)]",
            accent: "bg-amber-400",
        },

        2: {
            border: "border-slate-400/35",
            icon: "border-slate-400/30 bg-slate-400/10 text-slate-300",
            avatar:
                "border-slate-400/50 bg-slate-400/[0.08] text-slate-200",
            badge: "bg-slate-300 text-[#11151c]",
            score:
                "border-slate-400/15 bg-slate-400/[0.04]",
            scoreText: "text-slate-200",
            glow: "shadow-[0_12px_40px_rgba(148,163,184,0.06)]",
            accent: "bg-slate-400",
        },

        3: {
            border: "border-orange-500/35",
            icon: "border-orange-500/30 bg-orange-500/10 text-orange-400",
            avatar:
                "border-orange-500/50 bg-orange-500/[0.08] text-orange-300",
            badge: "bg-orange-500 text-[#170d08]",
            score:
                "border-orange-500/15 bg-orange-500/[0.04]",
            scoreText: "text-orange-300",
            glow: "shadow-[0_12px_40px_rgba(249,115,22,0.06)]",
            accent: "bg-orange-500",
        },
    }

    const style = rankStyles[position]

    return (
        <div
            className={`group relative flex flex-col items-center rounded-2xl border bg-card px-5 text-center transition-all duration-300 hover:-translate-y-2 ${style.border} ${style.glow} ${
                isFirst
                    ? "min-h-[390px] py-6"
                    : "min-h-[350px] py-5"
            }`}
        >
            {/* Top accent */}
            <div
                className={`absolute left-1/2 top-0 h-[2px] -translate-x-1/2 rounded-full transition-all duration-300 group-hover:w-28 ${
                    isFirst ? "w-20" : "w-14"
                } ${style.accent}`}
            />

            {/* Rank icon */}
            <div
                className={`absolute -top-5 flex h-10 w-10 items-center justify-center rounded-xl border bg-card shadow-lg transition-all duration-300 group-hover:-translate-y-1 ${style.icon}`}
            >
                {isFirst ? (
                    <Crown size={19} />
                ) : (
                    <Medal size={19} />
                )}
            </div>

            {/* Avatar */}
            <div className="relative mt-9">
                <div
                    className={`flex items-center justify-center rounded-full border-2 font-bold transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg ${
                        isFirst
                            ? "h-28 w-28 text-3xl"
                            : "h-24 w-24 text-2xl"
                    } ${style.avatar}`}
                >
                    {student.initials}
                </div>

                {/* Rank badge */}
                <div
                    className={`absolute -bottom-1 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-card font-mono text-xs font-bold shadow-lg transition-transform duration-300 group-hover:scale-110 ${style.badge}`}
                >
                    {position}
                </div>
            </div>

            {/* Name */}
            <h3 className="mt-5 truncate px-3 text-base font-bold transition-colors duration-200 group-hover:text-foreground">
                {student.name}
            </h3>

            {/* Username */}
            <button className="mt-1 flex items-center gap-1 text-[10px] text-primary transition-all duration-200 hover:gap-1.5 hover:opacity-80">
                {student.username}
                <ExternalLink size={10} />
            </button>

            {/* Location */}
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <MapPin size={11} />
                {student.city}

                <span className="text-border">
                    •
                </span>

                {student.year}
            </div>

            {/* Score */}
            <div
                className={`mx-auto mt-auto w-full max-w-[250px] rounded-xl border px-4 py-3 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-opacity-80 ${style.score}`}
            >
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Score
                </p>

                <p
                    className={`mt-1 font-mono text-xl font-bold transition-transform duration-300 group-hover:scale-[1.03] ${style.scoreText}`}
                >
                    {student.score.toFixed(2)}
                </p>
            </div>
        </div>
    )
}

function Leaderboard() {
    return (
        <section className="px-8 pb-10 pt-7">

            {/* Header */}
            <div className="relative mb-7 overflow-hidden rounded-2xl border border-border bg-card px-6 py-5">

                {/* Accent */}
                <div className="absolute left-0 top-0 h-full w-[2px] bg-primary" />

                <div className="flex items-start justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Medal size={17} />
                            </div>

                            <h1 className="text-xl font-bold">
                                Student{" "}
                                <span className="text-primary">
                                    Leaderboard
                                </span>
                            </h1>
                        </div>

                        <p className="mt-2 text-xs text-muted-foreground">
                            Compare coding performance across the PW IOI community.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <FilterButton icon={MapPin}>
                            All Cities
                        </FilterButton>

                        <FilterButton>
                            All Years
                        </FilterButton>
                    </div>
                </div>

                {/* Search */}
                <div className="group mt-5 flex h-10 w-full max-w-[520px] items-center gap-2 rounded-lg border border-border bg-secondary px-3 transition-all duration-200 focus-within:border-primary/50 focus-within:bg-muted">
                    <Search
                        size={15}
                        className="text-muted-foreground transition-colors duration-200 group-focus-within:text-primary"
                    />

                    <input
                        type="text"
                        placeholder="Search by name or username..."
                        className="w-full bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
                    />
                </div>
            </div>

            {/* Podium */}
            <div className="mb-7 grid grid-cols-1 items-end gap-5 md:grid-cols-3">

                <PodiumCard
                    student={students[1]}
                    position={2}
                />

                <PodiumCard
                    student={students[0]}
                    position={1}
                />

                <PodiumCard
                    student={students[2]}
                    position={3}
                />
            </div>

            {/* Leaderboard Table */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card">

                {/* Header */}
                <div className="grid grid-cols-[55px_1.6fr_120px_110px_130px_120px_90px] items-center border-b border-border bg-secondary/30 px-5 py-3">
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                        #
                    </span>

                    <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Student
                    </span>

                    <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                        City
                    </span>

                    <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Year
                    </span>

                    <span className="text-right text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Score
                    </span>

                    <span className="text-right text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Max Streak
                    </span>

                    <span className="text-right text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Solved
                    </span>
                </div>

                {/* Rows */}
                {students.map((student) => {
                    const isCurrentUser =
                        student.name === "Aman Kumar"

                    return (
                        <div
                            key={student.rank}
                            className={`group grid grid-cols-[55px_1.6fr_120px_110px_130px_120px_90px] items-center border-b border-border px-5 py-3.5 transition-all duration-200 last:border-b-0 ${
                                isCurrentUser
                                    ? "bg-primary/[0.06] hover:bg-primary/[0.10]"
                                    : "hover:bg-secondary/40"
                            }`}
                        >
                            {/* Rank */}
                            <div>
                                <span
                                    className={`font-mono text-xs font-semibold transition-transform duration-200 group-hover:translate-x-1 ${
                                        student.rank === 1
                                            ? "text-amber-400"
                                            : student.rank === 2
                                                ? "text-slate-300"
                                                : student.rank === 3
                                                    ? "text-orange-400"
                                                    : "text-muted-foreground"
                                    }`}
                                >
                                    {student.rank}
                                </span>
                            </div>

                            {/* Student */}
                            <div className="flex items-center gap-3">
                                <div
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-200 group-hover:scale-110 ${
                                        isCurrentUser
                                            ? "bg-primary/15 text-primary"
                                            : "bg-muted text-foreground"
                                    }`}
                                >
                                    {student.initials}
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-xs font-semibold">
                                        {student.name}
                                    </p>

                                    <button className="mt-0.5 flex items-center gap-1 text-[9px] text-muted-foreground transition-all duration-200 hover:text-primary">
                                        {student.username}
                                        <ExternalLink size={9} />
                                    </button>
                                </div>
                            </div>

                            {/* City */}
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <MapPin size={11} />
                                {student.city}
                            </div>

                            {/* Year */}
                            <p className="text-xs text-muted-foreground">
                                {student.year}
                            </p>

                            {/* Score */}
                            <p
                                className={`text-right font-mono text-xs font-semibold ${
                                    student.rank === 1
                                        ? "text-amber-400"
                                        : "text-foreground"
                                }`}
                            >
                                {student.score.toFixed(2)}
                            </p>

                            {/* Streak */}
                            <div className="flex justify-end">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-[9px] font-medium text-muted-foreground transition-all duration-200 group-hover:border-primary/20 group-hover:text-foreground">
                                    <Flame
                                        size={10}
                                        className="transition-transform duration-200 group-hover:scale-110"
                                    />
                                    {student.streak}
                                </span>
                            </div>

                            {/* Solved */}
                            <p className="text-right font-mono text-xs font-semibold">
                                {student.solved}
                            </p>
                        </div>
                    )
                })}

                {/* Footer */}
                <div className="flex items-center justify-between px-5 py-4">

                    <p className="text-[10px] text-muted-foreground">
                        Showing{" "}
                        <span className="font-medium text-foreground">
                            1–10
                        </span>{" "}
                        of 200 students
                    </p>

                    <div className="flex items-center gap-1">

                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-200 hover:-translate-x-0.5 hover:bg-secondary hover:text-foreground">
                            <ChevronLeft size={14} />
                        </button>

                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary bg-primary/10 text-xs font-semibold text-primary transition-all duration-200 hover:bg-primary/15 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                            1
                        </button>

                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-xs text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:text-foreground">
                            2
                        </button>

                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-xs text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:text-foreground">
                            3
                        </button>

                        <span className="px-1 text-xs text-muted-foreground">
                            ...
                        </span>

                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-xs text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:text-foreground">
                            20
                        </button>

                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-200 hover:translate-x-0.5 hover:bg-secondary hover:text-foreground">
                            <ChevronRight size={14} />
                        </button>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Leaderboard