import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Sidebar />

            <main className="ml-[240px] min-h-screen w-[calc(100%-240px)] overflow-x-hidden pt-[72px]">
                <Topbar />
                {children}
            </main>
        </div>
    )
}

export default Layout