import {
    Pencil,
    GraduationCap,
    Building2,
} from "lucide-react"

function DashboardHeader() {
    return (

        <section className="px-8 pb-6 pt-7">
            <div className="relative h-[150px] overflow-hidden rounded-2xl border border-primary/20 bg-card">

                <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

                <div className="pointer-events-none absolute bottom-[-90px] left-[48%] h-[180px] w-[320px] rounded-[50%] bg-indigo-500/10 blur-2xl" />

                <div className="relative flex h-full items-center justify-between px-7">

                    <div className="flex h-full flex-col justify-between py-5">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Good evening, Aman.
                            </h1>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Keep solving, keep growing!
                            </p>
                        </div>

                        <div className="flex items-center gap-5">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <GraduationCap
                                    size={15}
                                    className="text-primary"
                                />

                                <span>
                                    CSE
                                </span>

                                <span className="text-border">
                                    •
                                </span>

                                <span>
                                    3rd Year
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Building2
                                    size={15}
                                    className="text-primary"
                                />

                                <span>
                                    PW IOI
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="absolute right-[180px] top-1/2 hidden -translate-y-1/2 text-center lg:block">
                        <p className="max-w-[230px] text-sm font-medium leading-6 text-foreground/80">
                            “Discipline today,
                            <br />
                            better results tomorrow.”
                        </p>
                    </div>

                    {/* Edit Profile */}
                    <button className="absolute right-6 top-5 flex items-center gap-2 rounded-lg border border-primary/50 bg-primary/5 px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-primary/10">
                        <Pencil size={14} />
                        Edit Profile
                    </button>
                </div>
            </div>

        </section>
    )
}

export default DashboardHeader