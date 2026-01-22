import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { MobileMenu } from "./MobileMenu"
import { MeshGradient } from "@/components/effects/MeshGradient"
import { GrainOverlay } from "@/components/effects/GrainOverlay"
import { ScrollProgress } from "@/components/effects/ScrollProgress"
import { LiquidGlassFilters } from "@/components/effects/LiquidGlassFilters"

interface LayoutProps {
  mobileMenuOpen: boolean
  onMobileMenuClose: () => void
}

export function Layout({ mobileMenuOpen, onMobileMenuClose }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white/50 relative">
      <LiquidGlassFilters />
      <MeshGradient />
      <GrainOverlay />
      <ScrollProgress />

      <MobileMenu open={mobileMenuOpen} onClose={onMobileMenuClose} />

      <div className="flex relative">
        <Sidebar className="hidden lg:block" />

        <main className="flex-1 lg:ml-72 pt-20 lg:pt-20">
          <div className="max-w-4xl mx-auto px-6 pt-4 pb-24">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
