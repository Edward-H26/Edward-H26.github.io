import { NavLink } from "react-router-dom"
import { Menu, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { NAV_MAIN } from "@/data"
import { MoreMenu } from "@/components/layout/MoreMenu"
import { ProfileAvatar } from "@/components/profile/ProfileAvatar"

// The interactive 3D portfolio that the header's "Explore My Journey" chip opens.
const JOURNEY_URL = "https://edward-h26.github.io/PersonalWebsite/"

interface NavigationProps {
  onMenuClick: () => void
}

/** Fixed header: the desktop link bar that slides in on load, and the mobile bar with the menu button. */
export function Navigation({ onMenuClick }: NavigationProps) {
  const prefersReducedMotion = useReducedMotion()
  const desktopMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut" },
      }

  return (
    <>
      <motion.header className="fixed top-0 left-0 right-0 h-16 glass-nav z-50 hidden xl:block xl:pl-80" {...desktopMotionProps}>
        <div className="h-full max-w-5xl mx-auto px-6 flex items-center justify-between gap-8">
          <nav className="flex items-center gap-1">
            {NAV_MAIN.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
            <MoreMenu />
          </nav>

          <a
            href={JOURNEY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-chip ml-auto shrink-0 whitespace-nowrap rounded-full"
          >
            Explore My Journey
            <Sparkles size={13} strokeWidth={2.25} className="text-accent" />
          </a>
        </div>
      </motion.header>

      <header className="fixed top-0 left-0 right-0 glass-nav z-50 xl:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="relative flex-shrink-0">
              <ProfileAvatar sizeClassName="w-10 h-10" frameClassName="border-2 border-white/50 shadow-lg" loading="eager" />
            </div>

            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100/80 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
