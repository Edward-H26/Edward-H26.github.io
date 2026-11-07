import { buildJsonLd } from "./jsonLd.mjs"
import { routeUrl } from "./routes.mjs"
import { OG_IMAGE } from "./site.mjs"
import { escapeHtml, splitName } from "./text.mjs"

// Styles the static profile for the moment before React mounts and for crawlers that never run it.
const STATIC_STYLE = `.static-profile{font-family:Inter,system-ui,sans-serif;max-width:52rem;margin:0 auto;padding:2.5rem 1.25rem;line-height:1.6;color:#1f2937}
.static-profile a{color:#1d4f91}
.static-profile h1{font-size:2rem;margin:0 0 .25rem}
.static-profile h2{font-size:1.4rem;margin:2rem 0 .5rem}
.static-profile h3{font-size:1.05rem;margin:1.25rem 0 .25rem}
.static-profile .meta{margin:0 0 .35rem;color:#4b5563}
.static-profile nav ul{display:flex;flex-wrap:wrap;gap:.75rem;list-style:none;padding:0}`

/**
 * The head block of a route: title, description, robots, canonical, Open Graph, Twitter, and
 * rel="me" tags, the static profile stylesheet, and the JSON-LD graph. The "<" in the JSON is
 * escaped so content can never close the script element early.
 * @param {import("./content.mjs").SiteContent} content
 * @param {import("./routes.mjs").Route} route
 * @param {import("./routes.mjs").Route[]} routes every route, home first
 */
export function buildHead(content, route, routes) {
  const { PROFILE, RESEARCH_INTERESTS } = content
  const url = routeUrl(route.path)
  const { givenName, familyName } = splitName(PROFILE.name)
  const handle = PROFILE.social.x ? `@${new URL(PROFILE.social.x).pathname.replace(/^\/+|\/+$/g, "")}` : ""
  const jsonLd = JSON.stringify(buildJsonLd(content, routes, route)).replace(/</g, "\\u003c")
  const isHome = route.path === "/"
  return [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<meta name="author" content="${escapeHtml(PROFILE.name)}" />`,
    `<meta name="keywords" content="${escapeHtml([PROFILE.name, ...RESEARCH_INTERESTS].join(", "))}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${isHome ? "profile" : "website"}" />`,
    `<meta property="og:site_name" content="${escapeHtml(PROFILE.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE.url}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(`${PROFILE.name}, ${PROFILE.title}`)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    ...(isHome
      ? [
          `<meta property="profile:first_name" content="${escapeHtml(givenName)}" />`,
          `<meta property="profile:last_name" content="${escapeHtml(familyName)}" />`
        ]
      : []),
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(handle
      ? [`<meta name="twitter:site" content="${escapeHtml(handle)}" />`, `<meta name="twitter:creator" content="${escapeHtml(handle)}" />`]
      : []),
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE.url}" />`,
    ...Object.values(PROFILE.social).map((href) => `<link rel="me" href="${escapeHtml(href)}" />`),
    `<style>${STATIC_STYLE}</style>`,
    `<script type="application/ld+json">${jsonLd}</script>`
  ].join("\n")
}
