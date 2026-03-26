import { NavLink } from "react-router-dom"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PROFILE } from "@/data/content"
import { UIUCLogo } from "@/components/ui/UIUCLogo"
import { ColumbiaLogo } from "@/components/ui/ColumbiaLogo"

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
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 md:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-80 glass-menu z-50 md:hidden shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
              <span className="text-lg font-semibold text-gradient-subtle">
                Menu
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100/80 transition-all duration-200"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-lg" />
                  <img
                    src={PROFILE.photo}
                    alt={PROFILE.name}
                    className="relative w-24 h-24 rounded-full object-cover border-2 border-white/80 shadow-lg"
                  />
                </div>
                <h2 className="mt-3 text-lg font-semibold text-gray-900">
                  {PROFILE.name}
                </h2>
                <p className="text-sm text-gray-500 text-center">
                  {PROFILE.title}
                </p>
                <div className="flex flex-col gap-2 mt-1">
                  <div className="flex items-center gap-2">
                    <ColumbiaLogo size={24} className="flex-shrink-0" />
                    <span className="text-sm text-gray-500">Columbia University</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UIUCLogo size={24} className="flex-shrink-0" />
                    <span className="text-sm text-gray-500">University of Illinois<br />Urbana-Champaign</span>
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-accent-light/80 text-accent-dark backdrop-blur-sm"
                            : "text-gray-600 hover:bg-gray-100/80"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
