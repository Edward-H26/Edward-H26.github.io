import { NavLink } from "react-router-dom"
import { Menu, Sun, Moon } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"
import { PROFILE } from "@/data/content"

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
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 z-50">
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <NavLink to="/" className="text-lg font-semibold text-primary dark:text-primary-dark">
            {PROFILE.name}
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
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
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
