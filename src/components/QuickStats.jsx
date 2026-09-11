import {
  Code2,
  Trophy,
  GitBranch,
  Flame,
  Medal,
  CalendarDays,
} from "lucide-react"

function QuickStats() {
  const stats = [
    {
      label: "Problems Solved",
      value: "847",
      icon: Code2,
    },
    {
      label: "Streak",
      value: "47d",
      icon: Flame,
    },
    {
      label: "National Rank",
      value: "#312",
      icon: Medal,
    },
    {
      label: "CF Rating",
      value: "1847",
      icon: Trophy,
    },
    {
      label: "Active Weeks",
      value: "38",
      icon: CalendarDays,
    },
  ]

  return (
    <section className="px-8">
      <div className="flex flex-wrap gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.label}
              className="flex h-[44px] items-center gap-2 rounded-full border border-border bg-card px-5"
            >
              <Icon
                size={14}
                strokeWidth={1.8}
                className="text-muted-foreground"
              />

              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>

              <span className="font-mono text-sm font-bold text-foreground">
                {stat.value}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default QuickStats