import {
  Search,
  Bell,
  Command,
  Menu,
} from "lucide-react"

function Topbar() {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-border px-8">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button className="hidden text-muted-foreground hover:text-foreground">
          <Menu size={20} />
        </button>

        <div>
          <p className="text-xs text-muted-foreground">
            Dashboard
          </p>
          <h2 className="text-sm font-semibold">
            Overview
          </h2>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-secondary px-3 text-muted-foreground transition-colors hover:text-foreground">
          <Search size={16} />
          <span className="text-xs">Search</span>
          <span className="ml-4 flex items-center gap-1 rounded border border-border px-1.5 py-0.5 font-mono text-[9px]">
            <Command size={9} />
            K
          </span>
        </button>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground">
          <Bell size={17} strokeWidth={1.8} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>
      </div>
    </header>
  )
}

export default Topbar