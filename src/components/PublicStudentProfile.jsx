import { useMemo } from "react"
import { useNavigate, useParams } from "react-router"
import {
    ArrowLeft,
    AtSign,
    BarChart3,
    BriefcaseBusiness,
    CalendarDays,
    Camera,
    CheckCircle2,
    Code2,
    ExternalLink,
    Flame,
    Globe,
    GraduationCap,
    Hash,
    Link2,
    Mail,
    MapPin,
    Medal,
    MessageCircle,
    Send,
    Trophy,
    UserRound,
    Zap,
} from "lucide-react"

const PublicStudentProfile = () => {
    const { username } = useParams()
    const navigate = useNavigate()

    /*
     * Temporary frontend data.
     * Later this will come from:
     * GET /api/students/:username
     */
    const student = useMemo(
        () => ({
            name: "Aman Kumar",
            username: username || "student",
            avatar: "AK",
            bio: "Building, solving and learning one problem at a time.",

            college: "PW IOI",
            branch: "Computer Science",

            rank: 1,
            score: 1842.5,
            solved: 742,
            maxStreak: 104,
            currentStreak: 18,

            social: {
                github: "amankumar",
                linkedin: "amankumar",
                twitter: "amankumar",
                instagram: "amankumar",
            },

            platforms: {
                leetcode: {
                    username: "aman_1305",
                    solved: 312,
                    rating: 1847,
                },

                codeforces: {
                    username: "aman_1305",
                    solved: 248,
                    rating: 1428,
                },

                gfg: {
                    username: "aman_1305",
                    solved: 182,
                },

                github: {
                    username: "amankumar",
                    repositories: 18,
                    contributions: 624,
                },
            },

            topics: [
                {
                    name: "Arrays",
                    solved: 126,
                    color: "text-blue-400",
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/20",
                    bar: "bg-blue-500",
                },
                {
                    name: "Strings",
                    solved: 94,
                    color: "text-pink-400",
                    bg: "bg-pink-500/10",
                    border: "border-pink-500/20",
                    bar: "bg-pink-500",
                },
                {
                    name: "Hashing",
                    solved: 82,
                    color: "text-purple-400",
                    bg: "bg-purple-500/10",
                    border: "border-purple-500/20",
                    bar: "bg-purple-500",
                },
                {
                    name: "Binary Search",
                    solved: 61,
                    color: "text-cyan-400",
                    bg: "bg-cyan-500/10",
                    border: "border-cyan-500/20",
                    bar: "bg-cyan-500",
                },
                {
                    name: "Stack",
                    solved: 57,
                    color: "text-orange-400",
                    bg: "bg-orange-500/10",
                    border: "border-orange-500/20",
                    bar: "bg-orange-500",
                },
                {
                    name: "Linked List",
                    solved: 43,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/10",
                    border: "border-emerald-500/20",
                    bar: "bg-emerald-500",
                },
                {
                    name: "Recursion",
                    solved: 51,
                    color: "text-yellow-400",
                    bg: "bg-yellow-500/10",
                    border: "border-yellow-500/20",
                    bar: "bg-yellow-500",
                },
                {
                    name: "Trees",
                    solved: 68,
                    color: "text-green-400",
                    bg: "bg-green-500/10",
                    border: "border-green-500/20",
                    bar: "bg-green-500",
                },
                {
                    name: "Graphs",
                    solved: 41,
                    color: "text-indigo-400",
                    bg: "bg-indigo-500/10",
                    border: "border-indigo-500/20",
                    bar: "bg-indigo-500",
                },
                {
                    name: "Dynamic Programming",
                    solved: 73,
                    color: "text-red-400",
                    bg: "bg-red-500/10",
                    border: "border-red-500/20",
                    bar: "bg-red-500",
                },
            ],
        }),
        [username],
    )

    const platformCards = [
        {
            name: "LeetCode",
            username: student.platforms.leetcode.username,
            solved: student.platforms.leetcode.solved,
            secondaryLabel: "Rating",
            secondaryValue: student.platforms.leetcode.rating,
            icon: Code2,
            accent: "text-orange-400",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20",
        },
        {
            name: "Codeforces",
            username: student.platforms.codeforces.username,
            solved: student.platforms.codeforces.solved,
            secondaryLabel: "Rating",
            secondaryValue: student.platforms.codeforces.rating,
            icon: Hash,
            accent: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
        },
        {
            name: "GeeksforGeeks",
            username: student.platforms.gfg.username,
            solved: student.platforms.gfg.solved,
            secondaryLabel: "Problems",
            secondaryValue: student.platforms.gfg.solved,
            icon: GraduationCap,
            accent: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/20",
        },
        {
            name: "GitHub",
            username: student.platforms.github.username,
            solved: student.platforms.github.repositories,
            secondaryLabel: "Contributions",
            secondaryValue: student.platforms.github.contributions,
            icon: Code2,
            accent: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
        },
    ]

    const maxTopicSolved = Math.max(
        ...student.topics.map((topic) => topic.solved),
    )

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">

                {/* ================================================= */}
                {/* BACK BUTTON                                       */}
                {/* ================================================= */}

                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-[var(--muted-foreground)] transition-all hover:border-[var(--accent)] hover:text-[var(--foreground)]"
                >
                    <ArrowLeft size={17} />
                    Back to Leaderboard
                </button>

                {/* ================================================= */}
                {/* PROFILE HERO                                      */}
                {/* ================================================= */}

                <section className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-40 left-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

                    <div className="relative p-6 sm:p-8">
                        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

                            {/* Identity */}
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                                <div className="relative shrink-0">
                                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-bold text-white shadow-xl shadow-indigo-500/20 ring-4 ring-indigo-500/10">
                                        {student.avatar}
                                    </div>

                                    <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-[var(--card)] bg-emerald-500">
                                        <CheckCircle2
                                            size={13}
                                            className="text-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 flex flex-wrap items-center gap-3">
                                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                            {student.name}
                                        </h1>

                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-400">
                                            <CheckCircle2 size={13} />
                                            Verified
                                        </span>
                                    </div>

                                    <div className="mb-3 flex items-center gap-2 font-mono text-sm text-[var(--muted-foreground)]">
                                        <span>
                                            @{student.username}
                                        </span>

                                        <button
                                            className="transition-colors hover:text-[var(--foreground)]"
                                            title="Profile link"
                                        >
                                            <Link2 size={14} />
                                        </button>
                                    </div>

                                    <p className="max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">
                                        {student.bio}
                                    </p>

                                    {/* Location + College */}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <InfoPill
                                            icon={GraduationCap}
                                            text={`${student.college} · ${student.branch}`}
                                        />

                                    </div>

                                    {/* Social Links */}
                                    <div className="mt-4 flex flex-wrap items-center gap-2">

                                        <SocialButton
                                            icon={Code2}
                                            label="GitHub"
                                            username={student.social.github}
                                        />

                                        <SocialButton
                                            icon={BriefcaseBusiness}
                                            label="LinkedIn"
                                            username={student.social.linkedin}
                                        />

                                        <SocialButton
                                            icon={AtSign}
                                            label="X"
                                            username={student.social.twitter}
                                        />

                                        <SocialButton
                                            icon={Camera}
                                            label="Instagram"
                                            username={student.social.instagram}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Rank */}
                            <div className="min-w-[180px] rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5 text-center">
                                <div className="mb-2 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                                    <Medal
                                        size={15}
                                        className="text-indigo-400"
                                    />

                                    Global Rank
                                </div>

                                <div className="text-4xl font-bold tracking-tight text-indigo-400">
                                    #{student.rank}
                                </div>

                                <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                                    CodeSync Ranking
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================================================= */}
                {/* QUICK STATS                                       */}
                {/* ================================================= */}

                <section className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard
                        icon={Trophy}
                        label="CodeSync Score"
                        value={student.score.toLocaleString()}
                        iconClass="text-indigo-400"
                        iconBg="bg-indigo-500/10"
                    />

                    <StatCard
                        icon={Code2}
                        label="Problems Solved"
                        value={student.solved.toLocaleString()}
                        iconClass="text-blue-400"
                        iconBg="bg-blue-500/10"
                    />

                    <StatCard
                        icon={Flame}
                        label="Max Streak"
                        value={`${student.maxStreak} days`}
                        iconClass="text-orange-400"
                        iconBg="bg-orange-500/10"
                    />

                    <StatCard
                        icon={Zap}
                        label="Current Streak"
                        value={`${student.currentStreak} days`}
                        iconClass="text-purple-400"
                        iconBg="bg-purple-500/10"
                    />
                </section>

                {/* ================================================= */}
                {/* PLATFORM STATS                                    */}
                {/* ================================================= */}

                <section className="mt-6">
                    <SectionHeader
                        icon={BarChart3}
                        title="Coding Platforms"
                        description="Connected platforms and current statistics"
                    />

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {platformCards.map((platform) => {
                            const Icon = platform.icon

                            return (
                                <div
                                    key={platform.name}
                                    className={`group rounded-2xl border ${platform.border} bg-[var(--card)] p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div
                                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${platform.bg}`}
                                        >
                                            <Icon
                                                size={21}
                                                className={platform.accent}
                                            />
                                        </div>

                                        <button
                                            className="rounded-lg p-2 text-[var(--muted-foreground)] opacity-0 transition-all group-hover:opacity-100 hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
                                            title={`Open ${platform.name}`}
                                        >
                                            <ExternalLink size={15} />
                                        </button>
                                    </div>

                                    <div className="mt-5">
                                        <h3 className="font-semibold">
                                            {platform.name}
                                        </h3>

                                        <p className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">
                                            @{platform.username}
                                        </p>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        <div className="rounded-xl bg-[var(--secondary)] p-3">
                                            <p className="text-xs text-[var(--muted-foreground)]">
                                                Solved
                                            </p>

                                            <p className="mt-1 text-lg font-bold">
                                                {platform.solved}
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-[var(--secondary)] p-3">
                                            <p className="text-xs text-[var(--muted-foreground)]">
                                                {platform.secondaryLabel}
                                            </p>

                                            <p className="mt-1 text-lg font-bold">
                                                {platform.secondaryValue}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* ================================================= */}
                {/* TOPICS                                            */}
                {/* ================================================= */}

                <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">

                    <SectionHeader
                        icon={Hash}
                        title="Problem Solving"
                        description="Topic-wise problem solving progress"
                    />

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {student.topics.map((topic) => {
                            const percentage =
                                (topic.solved / maxTopicSolved) * 100

                            return (
                                <div
                                    key={topic.name}
                                    className={`group rounded-xl border ${topic.border} ${topic.bg} p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg`}
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <span
                                            className={`truncate text-xs font-semibold ${topic.color}`}
                                        >
                                            {topic.name}
                                        </span>

                                        <span
                                            className={`shrink-0 font-mono text-[11px] font-semibold ${topic.color}`}
                                        >
                                            {topic.solved}
                                        </span>
                                    </div>

                                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/5">
                                        <div
                                            className={`h-full rounded-full ${topic.bar} transition-all duration-500`}
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />
                                    </div>

                                    <p className="mt-1.5 text-[10px] text-[var(--muted-foreground)]">
                                        problems solved
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* ================================================= */}
                {/* FOOTER                                            */}
                {/* ================================================= */}

                <div className="mt-6 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 py-4 text-xs text-[var(--muted-foreground)]">
                    <div className="flex items-center gap-2">
                        <UserRound size={14} />
                        <span>
                            CodeSync student profile
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <CalendarDays size={14} />
                        <span>
                            Public profile
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ============================================================= */
/* INFO PILL                                                     */
/* ============================================================= */

const InfoPill = ({ icon: Icon, text }) => {
    return (
        <span className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-3 py-1.5 text-xs text-[var(--muted-foreground)]">
            <Icon size={14} />
            {text}
        </span>
    )
}

/* ============================================================= */
/* SOCIAL BUTTON                                                  */
/* ============================================================= */

const SocialButton = ({
    icon: Icon,
    label,
    username,
}) => {
    return (
        <button
            type="button"
            title={`${label}: @${username}`}
            className="group inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-3 py-2 text-xs font-medium text-[var(--muted-foreground)] transition-all hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/10 hover:text-[var(--foreground)]"
        >
            <Icon
                size={14}
                className="transition-transform group-hover:scale-110"
            />

            <span>{label}</span>
        </button>
    )
}

/* ============================================================= */
/* STAT CARD                                                      */
/* ============================================================= */

const StatCard = ({
    icon: Icon,
    label,
    value,
    iconClass,
    iconBg,
}) => {
    return (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:border-[var(--accent)]/30">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                        {label}
                    </p>

                    <p className="mt-2 text-2xl font-bold tracking-tight">
                        {value}
                    </p>
                </div>

                <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
                >
                    <Icon
                        size={19}
                        className={iconClass}
                    />
                </div>
            </div>
        </div>
    )
}

/* ============================================================= */
/* SECTION HEADER                                                 */
/* ============================================================= */

const SectionHeader = ({
    icon: Icon,
    title,
    description,
}) => {
    return (
        <div className="mb-5 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
                <Icon
                    size={17}
                    className="text-indigo-400"
                />
            </div>

            <div>
                <h2 className="text-lg font-semibold">
                    {title}
                </h2>

                <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default PublicStudentProfile