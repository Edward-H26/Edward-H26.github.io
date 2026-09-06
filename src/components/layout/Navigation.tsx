import { NavLink } from "react-router-dom"
import { Menu, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { NAV_ITEMS } from "@/data/content"
import { ProfileAvatar } from "@/components/ui/ProfileAvatar"

interface NavigationProps {
  onMenuClick: () => void
}

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
      <motion.header
        className="fixed top-0 left-0 right-0 h-16 glass-nav z-50 hidden xl:block xl:pl-80"
        {...desktopMotionProps}
      >
        <div className="h-full max-w-4xl mx-auto px-6 flex items-center justify-between">
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <a
            href="https://edward-h26.github.io/PersonalWebsite/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-chip rounded-full px-4 py-2 font-semibold"
          >
            Explore My Journey
            <Sparkles size={14} strokeWidth={2.25} className="text-accent" />
          </a>
        </div>
      </motion.header>

      <header className="fixed top-0 left-0 right-0 glass-nav z-50 xl:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="relative flex-shrink-0">
              <ProfileAvatar
                sizeClassName="w-10 h-10"
                frameClassName="border-2 border-white/50 shadow-lg"
                loading="eager"
              />
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
