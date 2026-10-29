import { routeUrl } from "./routes.mjs"
import { SISTER_SITE_URL, SITE_URL } from "./site.mjs"

// Search and AI crawlers named one by one in robots.txt, on top of the wildcard rule, because some
// of them only honour an explicit entry.
const AI_CRAWLERS = [
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "DuckAssistBot",
  "MistralAI-User",
  "cohere-ai",
  "CCBot"
]

/** Sitemap priority of the home page and of every other route. */
const SITEMAP_PRIORITY = { home: "1.0", page: "0.8" }

/**
 * The XML sitemap with one url entry per route.
 * @param {import("./routes.mjs").Route[]} routes
 */
export function buildSitemap(routes) {
  const urls = routes
    .map(
      (route) =>
        `  <url>\n    <loc>${routeUrl(route.path)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${route.path === "/" ? SITEMAP_PRIORITY.home : SITEMAP_PRIORITY.page}</priority>\n  </url>`
    )
    .join("\n")
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

/** robots.txt that allows every crawler and lists this site's sitemap and the sister site's. */
export function buildRobots() {
  const explicit = AI_CRAWLERS.map((agent) => `User-agent: ${agent}\nAllow: /`).join("\n\n")
  return `# Search engines and AI assistants are welcome to read, index, and cite this site.\nUser-agent: *\nAllow: /\n\n${explicit}\n\nSitemap: ${SITE_URL}/sitemap.xml\nSitemap: ${SISTER_SITE_URL}sitemap.xml\n`
}
