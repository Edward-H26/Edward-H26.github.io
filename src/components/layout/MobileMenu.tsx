import { NavLink } from "react-router-dom"
import { X, Github, Linkedin, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 md:hidden shadow-xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="text-lg font-semibold text-primary">
                Menu
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={PROFILE.photo}
                  alt={PROFILE.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
                <h2 className="mt-3 text-lg font-semibold text-gray-900">
                  {PROFILE.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {PROFILE.title}
                </p>
              </div>

              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-accent-light text-accent"
                          : "text-gray-600 hover:bg-gray-100"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-center gap-4">
                  <a
                    href={PROFILE.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-100 text-gray-600 hover:text-accent transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={PROFILE.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-100 text-gray-600 hover:text-accent transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="p-3 rounded-full bg-gray-100 text-gray-600 hover:text-accent transition-colors"
                  >
                    <Mail size={20} />
                  </a>
                  <a
                    href={PROFILE.social.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-100 text-gray-600 hover:text-accent transition-colors"
                  >
                    <XLogo size={20} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
