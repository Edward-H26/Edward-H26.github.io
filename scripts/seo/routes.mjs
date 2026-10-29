import { SITE_DESCRIPTION, SITE_URL } from "./site.mjs"
import { truncate } from "./text.mjs"

/** Longest meta description that search engines show without cutting it. */
export const DESCRIPTION_MAX_LENGTH = 160

/**
 * A crawlable page: the router path plus the title and description its head carries.
 * @typedef {{ path: string, title: string, description: string }} Route
 */

/** Canonical URL of a route: the origin for "/", otherwise origin, path, and a trailing slash. */
export function routeUrl(routePath) {
  return routePath === "/" ? `${SITE_URL}/` : `${SITE_URL}${routePath}/`
}

/**
 * One route per navigation item that has a section, home first. The home route carries the site
 * description; a section route lists its card titles, cut to snippet length.
 * @param {import("./content.mjs").SiteContent} content
 * @returns {Route[]}
 */
export function buildRoutes(content) {
  const { PROFILE, NAV_ITEMS, SECTIONS } = content
  return NAV_ITEMS.flatMap((item) => {
    if (item.path === "/") {
      return [{ path: "/", title: `${PROFILE.name} | ${PROFILE.title}`, description: SITE_DESCRIPTION }]
    }
    const section = SECTIONS[item.path.slice(1)]
    if (!section) return []
    const titles = [...new Set(section.cards.map((card) => card.title))]
    return [
      {
        path: item.path,
        title: `${section.heading} | ${PROFILE.name}`,
        description: truncate(
          `${section.heading} of ${PROFILE.name}, ${PROFILE.title} at ${PROFILE.affiliation}: ${titles.join("; ")}.`,
          DESCRIPTION_MAX_LENGTH
        )
      }
    ]
  })
}
