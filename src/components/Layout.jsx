import Sidebar from "./Sidebar"

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="ml-[240px] min-h-screen">
        {children}
      </main>
    </div>
  )
}

export default Layout