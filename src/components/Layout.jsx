import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

function Layout({ children, activePage, setActivePage }) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
            />

            <main className="ml-[240px] min-h-screen w-[calc(100%-240px)] overflow-x-hidden pt-[72px]">
                <Topbar />
                {children}
            </main>
        </div>
    )
}

export default Layout