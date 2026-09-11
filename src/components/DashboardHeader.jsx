import {
  ArrowUpRight,
  RefreshCw,
} from "lucide-react"

function DashboardHeader() {
  return (
    <section className="px-8 pb-7 pt-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
            Student Dashboard
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, Aman.
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Track your coding progress, contest ratings, and
            contribution activity across platforms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
            <RefreshCw size={14} />
            Sync data
          </button>

          <button className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            View profile
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default DashboardHeader