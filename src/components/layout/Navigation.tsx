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

  const headerHeight = useTransform(scrollY, [0, 100], [64, 56])
  const bgOpacity = useTransform(scrollY, [0, 50], [0.85, 0.95])

  if (prefersReducedMotion) {
    return (
      <header className="fixed top-0 left-0 right-0 h-16 glass-nav z-50">
        <div className="h-full w-full px-6 lg:pl-80 lg:pr-8 flex items-center justify-between">
          <nav className="hidden lg:flex items-center gap-10">
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
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl text-white relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] premium-cta-button"
          >
            <span>Explore interactive journey</span>
            <Sparkles size={16} className="premium-cta-icon" />
          </a>

          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100/80 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>
    )
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 glass-nav z-50"
      style={{
        height: headerHeight,
        backgroundColor: useTransform(
          bgOpacity,
          (v) => `rgba(255, 255, 255, ${v})`
        ),
      }}
    >
      <div className="h-full w-full px-6 lg:pl-80 lg:pr-8 flex items-center justify-between">
        <nav className="hidden lg:flex items-center gap-10">
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
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl text-white relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] premium-cta-button"
        >
          <span>Explore interactive journey</span>
          <Sparkles size={16} className="premium-cta-icon" />
        </a>

        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100/80 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>
    </motion.header>
  )
}
