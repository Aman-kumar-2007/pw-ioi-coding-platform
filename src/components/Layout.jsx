import { useState } from "react"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

function Layout({
    children,
    activePage,
    setActivePage,
    onLogout,
}) {
    const [sidebarCollapsed, setSidebarCollapsed] =
        useState(false)

    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* Sidebar */}

            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
                onLogout={onLogout}
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
            />


            {/* Main Content */}

            <main
                className={`min-h-screen overflow-x-hidden pt-[72px] transition-all duration-300 ${
                    sidebarCollapsed
                        ? "ml-[76px]"
                        : "ml-[240px]"
                }`}
            >

                {/* Topbar */}

                <Topbar
                    activePage={activePage}
                    setActivePage={setActivePage}
                    sidebarCollapsed={
                        sidebarCollapsed
                    }
                />


                {/* Page */}

                {children}

            </main>

        </div>
    )
}

export default Layout