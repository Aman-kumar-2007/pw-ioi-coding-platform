import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Sidebar />

            <main className="ml-[240px] min-h-screen">
                <Topbar />
                {children}
            </main>
        </div>
    )
}

export default Layout