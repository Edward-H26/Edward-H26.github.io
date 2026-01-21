import { NavLink } from "react-router-dom"
import { Menu, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/research", label: "Research" },
  { path: "/experience", label: "Experience" },
  { path: "/projects", label: "Projects" },
  { path: "/publications", label: "Publications" },
  { path: "/info", label: "Info" },
]

interface NavigationProps {
  onMenuClick: () => void
}

export function Navigation({ onMenuClick }: NavigationProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <>
        <header className="sticky top-0 h-16 glass-nav z-50 hidden lg:block lg:pl-80">
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
              className="px-4 py-2 text-sm font-semibold liquid-glass-button rounded-full"
            >
              <span className="liquid-glass-button-content">
                <span>Explore My Journey</span>
                <Sparkles size={14} className="liquid-glass-icon" />
              </span>
            </a>
          </div>
        </header>

        <header className="sticky top-0 h-16 glass-nav z-50 lg:hidden">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100/80 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </header>
      </>
    )
  }

  return (
    <>
      <motion.header
        className="sticky top-0 h-16 glass-nav z-50 hidden lg:block lg:pl-80"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
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
            className="px-4 py-2 text-sm font-semibold liquid-glass-button rounded-full"
          >
            <span className="liquid-glass-button-content">
              <span>Explore My Journey</span>
              <Sparkles size={14} className="liquid-glass-icon" />
            </span>
          </a>
        </div>
      </motion.header>

      <header className="sticky top-0 h-16 glass-nav z-50 lg:hidden">
        <div className="h-full w-full px-6 flex items-center justify-end">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100/80 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>
    </>
  )
}
