import { NavLink } from "react-router-dom"
import { Menu, Sparkles } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
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
  const { scrollY } = useScroll()

  const bgOpacity = useTransform(scrollY, [0, 50], [0.02, 0.06])

  if (prefersReducedMotion) {
    return (
      <>
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
          <div className="nav-pill px-2 py-2 flex items-center gap-1">
            <nav className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `nav-link-pill ${isActive ? "active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="w-px h-6 bg-gray-200/50 mx-2" />

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

        <header className="fixed top-0 left-0 right-0 h-16 glass-nav z-50 lg:hidden">
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
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden lg:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="nav-pill px-2 py-2 flex items-center gap-1"
          style={{
            backgroundColor: useTransform(
              bgOpacity,
              (v) => `rgba(255, 255, 255, ${v})`
            ),
          }}
        >
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `nav-link-pill ${isActive ? "active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="w-px h-6 bg-gray-200/50 mx-2" />

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
        </motion.div>
      </motion.header>

      <header className="fixed top-0 left-0 right-0 h-16 glass-nav z-50 lg:hidden">
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
