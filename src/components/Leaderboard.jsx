import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

import {
    Medal,
    Search,
    ChevronLeft,
    ChevronRight,
    Flame,
    Crown,
} from "lucide-react"

function PodiumCard({ student, position }) {
    const isFirst = position === 1

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
            className={`group relative flex flex-col items-center rounded-2xl border bg-card px-5 text-center transition-all duration-300 hover:-translate-y-2 ${style.border
                } ${style.glow} ${isFirst
                    ? "min-h-[350px] py-6"
                    : "min-h-[320px] py-5"
                }`}
        >
            {/* Top Accent */}
            <div
                className={`absolute left-1/2 top-0 h-[2px] -translate-x-1/2 rounded-full transition-all duration-300 group-hover:w-28 ${isFirst ? "w-20" : "w-14"
                    } ${style.accent}`}
            />

            {/* Rank Icon */}
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
                    className={`flex items-center justify-center rounded-full border-2 font-bold transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg ${isFirst
                            ? "h-28 w-28 text-3xl"
                            : "h-24 w-24 text-2xl"
                        } ${style.avatar}`}
                >
                    {student.name
                        ?.split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                </div>

                {/* Rank Badge */}
                <div
                    className={`absolute -bottom-1 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-card font-mono text-xs font-bold shadow-lg transition-transform duration-300 group-hover:scale-110 ${style.badge}`}
                >
                    {position}
                </div>
            </div>

            {/* Name */}
            <h3 className="mt-5 truncate px-3 text-base font-bold">
                {student.name}
            </h3>

            {/* Solved */}
            <div
                className={`mx-auto mt-auto w-full max-w-[250px] rounded-xl border px-4 py-3 transition-all duration-300 group-hover:-translate-y-1 ${style.score}`}
            >
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Problems Solved
                </p>

                <p
                    className={`mt-1 font-mono text-xl font-bold transition-transform duration-300 group-hover:scale-[1.03] ${style.scoreText}`}
                >
                    {student.solved}
                </p>

                <p className="mt-1 text-[9px] text-muted-foreground">
                    Total problems solved
                </p>
            </div>
        </div>
    )
}

function Leaderboard() {
    const [students, setStudents] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [currentUserId, setCurrentUserId] = useState(null)

useEffect(() => {
    const fetchLeaderboard = async () => {
        try {
            setLoading(true)
            setError("")

            const {
                data: { session },
            } = await supabase.auth.getSession()

            if (!session?.access_token) {
                throw new Error("Authentication session not found")
            }

            const response = await fetch(
                "http://localhost:5001/api/leaderboard",
                {
                    headers: {
                        Authorization: `Bearer ${session.access_token}`,
                    },
                }
            )

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Failed to fetch leaderboard"
                )
            }

            setStudents(result.data.leaderboard || [])
        } catch (error) {
            console.error("Leaderboard fetch error:", error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    fetchLeaderboard()
}, [])

    const filteredStudents = students.filter((student) => {
        const query = searchQuery.trim().toLowerCase()

        return (
            !query ||
            student.name?.toLowerCase().includes(query)
        )
    })

    const topStudents = filteredStudents.slice(0, 3)

    return (
        <section className="px-8 pb-10 pt-7">
            {/* Header */}
            <div className="relative mb-7 overflow-visible rounded-2xl border border-border bg-card px-6 py-5">
                {/* Accent */}
                <div className="absolute left-0 top-0 h-full w-[2px] rounded-full bg-primary" />

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
                            Compare coding performance across the PW IOI
                            community.
                        </p>
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
                        value={searchQuery}
                        onChange={(e) =>
                            setSearchQuery(e.target.value)
                        }
                        placeholder="Search by name..."
                        className="w-full bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
                    />
                </div>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="mb-7 flex min-h-[220px] items-center justify-center rounded-2xl border border-border bg-card">
                    <div className="flex flex-col items-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />

                        <p className="mt-4 text-xs text-muted-foreground">
                            Loading leaderboard...
                        </p>
                    </div>
                </div>
            ) : error ? (
                /* Error */
                <div className="mb-7 flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-border bg-card">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                        <Search size={20} />
                    </div>

                    <p className="mt-4 text-sm font-semibold">
                        Failed to load leaderboard
                    </p>

                    <p className="mt-1 max-w-md text-center text-xs text-muted-foreground">
                        {error}
                    </p>
                </div>
            ) : (
                <>
                    {/* Podium */}
                    {topStudents.length > 0 ? (
                        <div className="mb-7 grid grid-cols-1 items-end gap-5 md:grid-cols-3">
                            {/* 2nd Place */}
                            {topStudents[1] && (
                                <PodiumCard
                                    student={topStudents[1]}
                                    position={2}
                                />
                            )}

                            {/* 1st Place */}
                            {topStudents[0] && (
                                <PodiumCard
                                    student={topStudents[0]}
                                    position={1}
                                />
                            )}

                            {/* 3rd Place */}
                            {topStudents[2] && (
                                <PodiumCard
                                    student={topStudents[2]}
                                    position={3}
                                />
                            )}
                        </div>
                    ) : (
                        <div className="mb-7 flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-border bg-card">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                                <Search size={20} />
                            </div>

                            <p className="mt-4 text-sm font-semibold">
                                No students found
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Try changing your search.
                            </p>
                        </div>
                    )}

                    {/* Table */}
                    <div className="overflow-hidden rounded-2xl border border-border bg-card">
                        {/* Table Header */}
                        <div className="grid grid-cols-[55px_1fr_140px_120px] items-center border-b border-border bg-secondary/30 px-5 py-3">
                            <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                                #
                            </span>

                            <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                                Student
                            </span>

                            <span className="text-right text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                                Solved
                            </span>

                            <span className="text-right text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                                Max Streak
                            </span>
                        </div>

                        {/* Rows */}
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => {
                                const isCurrentUser =
                                    student.userId === currentUserId

                                return (
                                    <div
                                        key={student.userId}
                                        className={`group grid grid-cols-[55px_1fr_140px_120px] items-center border-b border-border px-5 py-3.5 transition-all duration-200 last:border-b-0 ${isCurrentUser
                                                ? "bg-primary/[0.06] hover:bg-primary/[0.10]"
                                                : "hover:bg-secondary/40"
                                            }`}
                                    >
                                        {/* Rank */}
                                        <div>
                                            <span
                                                className={`font-mono text-xs font-semibold transition-transform duration-200 group-hover:translate-x-1 ${student.rank === 1
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
                                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-200 group-hover:scale-110 ${isCurrentUser
                                                        ? "bg-primary/15 text-primary"
                                                        : "bg-muted text-foreground"
                                                    }`}
                                            >
                                                {student.name
                                                    ?.split(" ")
                                                    .map(
                                                        (word) =>
                                                            word[0]
                                                    )
                                                    .join("")
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate text-xs font-semibold">
                                                    {student.name}
                                                </p>

                                                {isCurrentUser && (
                                                    <p className="mt-0.5 text-[9px] text-primary">
                                                        You
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Solved */}
                                        <p
                                            className={`text-right font-mono text-xs font-semibold ${student.rank === 1
                                                    ? "text-amber-400"
                                                    : "text-foreground"
                                                }`}
                                        >
                                            {student.solved}
                                        </p>

                                        {/* Max Streak */}
                                        <div className="flex justify-end">
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-[9px] font-medium text-muted-foreground">
                                                <Flame size={10} />
                                                —
                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="flex min-h-[150px] items-center justify-center">
                                <p className="text-xs text-muted-foreground">
                                    No matching students.
                                </p>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between px-5 py-4">
                            <p className="text-[10px] text-muted-foreground">
                                Showing{" "}
                                <span className="font-medium text-foreground">
                                    {filteredStudents.length}
                                </span>{" "}
                                of {students.length} students
                            </p>

                            {/* Pagination - will make dynamic later */}
                            <div className="flex items-center gap-1">
                                <button
                                    disabled
                                    className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg border border-border text-muted-foreground opacity-50"
                                >
                                    <ChevronLeft size={14} />
                                </button>

                                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary bg-primary/10 text-xs font-semibold text-primary">
                                    1
                                </button>

                                <button
                                    disabled
                                    className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg border border-border text-xs text-muted-foreground opacity-50"
                                >
                                    2
                                </button>

                                <button
                                    disabled
                                    className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg border border-border text-xs text-muted-foreground opacity-50"
                                >
                                    3
                                </button>

                                <span className="px-1 text-xs text-muted-foreground">
                                    ...
                                </span>

                                <button
                                    disabled
                                    className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg border border-border text-xs text-muted-foreground opacity-50"
                                >
                                    20
                                </button>

                                <button
                                    disabled
                                    className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg border border-border text-muted-foreground opacity-50"
                                >
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    )
}

export default Leaderboard