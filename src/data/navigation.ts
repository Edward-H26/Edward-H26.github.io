import type { NavItem } from "./types"

/** Routes shown in the desktop navigation bar, in order. */
export const NAV_MAIN: readonly NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/publications", label: "Publications" },
  { path: "/research", label: "Research" },
  { path: "/experience", label: "Experience" },
  { path: "/projects", label: "Projects" },
  { path: "/teaching", label: "Teaching" },
  { path: "/info", label: "Info" },
]

/** Routes tucked behind the "More" menu of the desktop navigation bar. */
export const NAV_MORE: readonly NavItem[] = [{ path: "/service", label: "Service" }]

/**
 * Every route in order, which is what the router, the mobile menu, and the SEO generator walk.
 * Each non-home path must match a key of SECTIONS without its leading slash.
 */
export const NAV_ITEMS: readonly NavItem[] = [...NAV_MAIN, ...NAV_MORE]
