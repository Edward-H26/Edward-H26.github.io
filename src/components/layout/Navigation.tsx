import { NavLink } from "react-router-dom"
import { Menu, Sparkles, GithubIcon, LinkedinIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { PROFILE } from "@/data/content"
import { XLogo } from "@/components/ui/XLogo"

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
        <header className="fixed top-0 left-0 right-0 h-16 glass-nav z-50 hidden lg:block lg:pl-80">
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
              className="px-4 py-2 text-sm font-semibold rounded-full bg-accent text-white hover:bg-accent/90 transition-colors"
            >
              <span className="flex items-center gap-2">
                <span>Explore My Journey</span>
                <Sparkles size={14} className="text-primary" />
              </span>
            </a>
          </div>
        </header>

        <header className="fixed top-0 left-0 right-0 glass-nav z-50 lg:hidden">
          <div className="px-4 py-3">
            <div className="flex items-start gap-4">
              <button
                onClick={onMenuClick}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100/80 transition-colors flex-shrink-0"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>

              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-xl" />
                  <img
                    src={PROFILE.photo}
                    alt={PROFILE.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/50 shadow-lg relative"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="text-base font-bold text-gray-900 truncate">{PROFILE.name}</h1>
                  <p className="text-xs text-gray-600 truncate">{PROFILE.title}</p>
                  <p className="text-xs text-gray-500 truncate">{PROFILE.affiliation}</p>
                  <p className="text-xs text-gray-500 truncate">{PROFILE.email}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 ml-10">
              <a
                href={PROFILE.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-orange-100 text-gray-700 hover:bg-orange-200 transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={PROFILE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-orange-100 text-gray-700 hover:bg-orange-200 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={PROFILE.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-orange-100 text-gray-700 hover:bg-orange-200 transition-colors"
                aria-label="X"
              >
                <XLogo size={16} />
              </a>
            </div>
          </div>
        </header>
      </>
    )
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 h-16 glass-nav z-50 hidden lg:block lg:pl-80"
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

      <header className="sticky top-0 glass-nav z-50 lg:hidden">
        <div className="px-4 py-3">
          <div className="flex items-start gap-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100/80 transition-colors flex-shrink-0"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-xl" />
                <img
                  src={PROFILE.photo}
                  alt={PROFILE.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/50 shadow-lg relative"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-base font-bold text-gray-900 truncate">{PROFILE.name}</h1>
                <p className="text-xs text-gray-600 truncate">{PROFILE.title}</p>
                <p className="text-xs text-gray-500 truncate">{PROFILE.affiliation}</p>
                <p className="text-xs text-gray-500 truncate">{PROFILE.email}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 ml-10">
            <a
              href={PROFILE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-orange-100 text-gray-700 hover:bg-orange-200 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={PROFILE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-orange-100 text-gray-700 hover:bg-orange-200 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={PROFILE.social.x}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-orange-100 text-gray-700 hover:bg-orange-200 transition-colors"
              aria-label="X"
            >
              <XLogo size={16} />
            </a>
          </div>
        </div>
      </header>
    </>
  )
}
