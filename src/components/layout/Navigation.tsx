import { useEffect, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { ChevronDown, Menu, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { NAV_MAIN, NAV_MORE } from "@/data/content"
import { ProfileAvatar } from "@/components/ui/ProfileAvatar"

function MoreMenu() {
  const [open, setOpen] = useState(false)
  const menu = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const holdsCurrentPage = NAV_MORE.some((item) => item.path === pathname)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", closeOnOutsideClick)
    document.addEventListener("keydown", closeOnEscape)
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [open])

  return (
    <div ref={menu} className="relative">
      <button
        type="button"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`nav-link flex items-center gap-1 ${holdsCurrentPage ? "active" : ""}`}
      >
        More
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-2 w-40 -translate-x-1/2 overflow-hidden rounded-xl glass-menu shadow-xl">
          {NAV_MORE.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "bg-accent-light/80 text-accent-dark" : "text-gray-600 hover:bg-gray-100/80"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

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
            {NAV_MAIN.map((item) => (
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
            <MoreMenu />
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
