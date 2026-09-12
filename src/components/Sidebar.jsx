import {
  LayoutDashboard,
  Code2,
  Trophy,
  GitBranch,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  UserRound,
  Medal,
} from "lucide-react"

function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Leaderboard",
      icon: Medal,
    },
    {
      label: "Student Profile",
      icon: UserRound,
    },
    {
      label: "Contests",
      icon: Trophy,
    },
    {
      label: "Analytics",
      icon: BarChart3,
    },
  ]

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[240px] flex-col border-r border-border bg-background">

      {/* Logo */}
      <div className="flex h-[72px] items-center border-b border-border px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Code2 size={20} strokeWidth={2.5} />
          </div>

          <div>
            <h1 className="text-sm font-bold tracking-tight">
              PW IOI
            </h1>
            <p className="text-[10px] font-medium text-muted-foreground">
              CODING PLATFORM
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Overview
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.label

          return (
            <button
              key={item.label}
              onClick={() => setActivePage(item.label)}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
            >
              <Icon size={18} strokeWidth={1.8} />

              <span>{item.label}</span>

              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>
          )
        })}

        <div className="my-5 border-t border-border" />

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Account
        </p>

        <button
          onClick={() => setActivePage("Settings")}
          className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${activePage === "Settings"
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
        >
          <Settings size={18} strokeWidth={1.8} />

          <span>Settings</span>

          {activePage === "Settings" && (
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
          )}
        </button>
      </nav>

      {/* User section */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-bold">
            AK
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              Aman Kumar
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              Student
            </p>
          </div>

          <button className="text-muted-foreground transition-colors hover:text-foreground">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Collapse button */}
      <button className="fixed left-[226px] top-[58px] z-[100] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground">
        <ChevronLeft size={14} />
      </button>
    </aside>
  )
}

export default Sidebar