import {
    Bell,
    Trophy,
    Medal,
    Zap,
    CheckCheck,
    Clock3,
    Trash2,
} from "lucide-react"


const notifications = [
    {
        id: 1,
        title: "Contest starting soon",
        description:
            "LeetCode Weekly Contest starts in 2 hours.",
        time: "2 hours ago",
        icon: Trophy,
        iconClass: "text-amber-400",
        bgClass: "bg-amber-400/10",
        unread: true,
    },
    {
        id: 2,
        title: "Leaderboard update",
        description:
            "You moved up 8 positions this week.",
        time: "5 hours ago",
        icon: Medal,
        iconClass: "text-blue-400",
        bgClass: "bg-blue-400/10",
        unread: true,
    },
    {
        id: 3,
        title: "Keep your streak alive",
        description:
            "Solve one problem today to continue your streak.",
        time: "Today",
        icon: Zap,
        iconClass: "text-violet-400",
        bgClass: "bg-violet-400/10",
        unread: false,
    },
    {
        id: 4,
        title: "Weekly progress",
        description:
            "You solved 24 problems this week.",
        time: "Yesterday",
        icon: Bell,
        iconClass: "text-primary",
        bgClass: "bg-primary/10",
        unread: false,
    },
]


function Notifications() {
    return (
        <div className="min-h-[calc(100vh-72px)] bg-background px-4 py-5 text-foreground sm:px-6 lg:px-7">

            <div className="mx-auto max-w-[1000px]">

                {/* Header */}
                <section className="mb-5 overflow-hidden rounded-2xl border border-border bg-card">

                    <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Bell size={21} />
                            </div>

                            <div>

                                <h1 className="text-2xl font-extrabold">
                                    Notifications
                                </h1>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Stay updated with your CodeSync activity.
                                </p>

                            </div>

                        </div>


                        <button
                            type="button"
                            className="flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-4 text-xs font-semibold text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
                        >
                            <CheckCheck size={14} />
                            Mark all as read
                        </button>

                    </div>

                </section>


                {/* Notification list */}
                <section className="overflow-hidden rounded-2xl border border-border bg-card">

                    <div className="flex items-center justify-between border-b border-border px-5 py-4">

                        <div>

                            <p className="text-sm font-bold">
                                Recent Notifications
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Your latest CodeSync updates
                            </p>

                        </div>


                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-bold text-primary">
                            2 Unread
                        </span>

                    </div>


                    <div className="divide-y divide-border">

                        {notifications.map(
                            (notification) => {

                                const Icon =
                                    notification.icon

                                return (
                                    <button
                                        key={
                                            notification.id
                                        }
                                        type="button"
                                        className={`flex w-full gap-4 px-5 py-5 text-left transition-all hover:bg-secondary/40 ${
                                            notification.unread
                                                ? "bg-primary/[0.025]"
                                                : ""
                                        }`}
                                    >

                                        <div
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${notification.bgClass}`}
                                        >
                                            <Icon
                                                size={19}
                                                className={
                                                    notification.iconClass
                                                }
                                            />
                                        </div>


                                        <div className="min-w-0 flex-1">

                                            <div className="flex items-start justify-between gap-4">

                                                <div className="flex items-center gap-2">

                                                    <p className="text-sm font-bold">
                                                        {
                                                            notification.title
                                                        }
                                                    </p>

                                                    {notification.unread && (
                                                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                    )}

                                                </div>


                                                <span className="flex shrink-0 items-center gap-1 text-[10px] text-muted-foreground">

                                                    <Clock3
                                                        size={11}
                                                    />

                                                    {
                                                        notification.time
                                                    }

                                                </span>

                                            </div>


                                            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                                                {
                                                    notification.description
                                                }
                                            </p>

                                        </div>

                                    </button>
                                )
                            }
                        )}

                    </div>


                    {/* Bottom */}
                    <div className="flex items-center justify-between border-t border-border bg-secondary/20 px-5 py-4">

                        <p className="text-[10px] text-muted-foreground">
                            Notifications are based on your preferences.
                        </p>


                        <button
                            type="button"
                            className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground hover:text-red-400"
                        >
                            <Trash2 size={12} />
                            Clear all
                        </button>

                    </div>

                </section>

            </div>

        </div>
    )
}


export default Notifications