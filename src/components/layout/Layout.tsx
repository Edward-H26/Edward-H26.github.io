import { Outlet } from "react-router-dom"
import { Navigation } from "./Navigation"
import { Sidebar } from "./Sidebar"
import { MobileMenu } from "./MobileMenu"
import { useState } from "react"

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation onMenuClick={() => setMobileMenuOpen(true)} />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="flex">
        <Sidebar className="hidden lg:block" />

        <main className="flex-1 lg:ml-72 pt-16">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
