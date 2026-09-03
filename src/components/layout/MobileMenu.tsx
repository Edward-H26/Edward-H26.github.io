import { NavLink } from "react-router-dom"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { NAV_ITEMS, PROFILE } from "@/data/content"
import { InstitutionLogos } from "@/components/ui/InstitutionLogos"
import { ProfileAvatar } from "@/components/ui/ProfileAvatar"
import { SocialLinks } from "@/components/ui/SocialLinks"

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
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 xl:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-full glass-menu z-50 xl:hidden shadow-2xl overflow-y-auto"
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
              <div className="mb-5 flex w-full flex-col items-center gap-6">
                <div className="flex w-full max-w-[13rem] flex-col items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-lg" />
                    <ProfileAvatar
                      sizeClassName="w-24 h-24"
                      frameClassName="relative border-2 border-white/80 shadow-lg"
                      loading="eager"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <h2 className="text-lg font-semibold leading-tight text-gray-900">
                      {PROFILE.name}
                    </h2>
                    <p className="text-sm leading-tight text-gray-500">
                      {PROFILE.title}
                    </p>
                  </div>
                </div>
                <InstitutionLogos variant="mobile" />
                <SocialLinks
                  size={18}
                  className="flex w-full max-w-[13rem] justify-center gap-3"
                  linkClassName="p-2.5 rounded-full bg-orange-100 text-gray-600 hover:bg-orange-200 transition-colors"
                />
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
