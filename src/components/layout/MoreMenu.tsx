import { useEffect, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { NAV_MORE } from "@/data"

/** The "More" dropdown of the desktop header; closes on navigation, outside click, and Escape. */
export function MoreMenu() {
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
