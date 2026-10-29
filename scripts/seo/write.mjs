import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { buildBody } from "./body.mjs"
import { buildRobots, buildSitemap } from "./crawlers.mjs"
import { buildHead } from "./head.mjs"
import { buildLlmsTxt } from "./llms.mjs"
import { BODY_INDENT, BODY_MARKERS, HEAD_INDENT, HEAD_MARKERS, replaceBetween } from "./markers.mjs"
import { buildRoutes } from "./routes.mjs"

/** index.html with its generated blocks replaced for the given route. */
function renderPage(template, content, route, routes) {
  const html = replaceBetween(template, HEAD_MARKERS, buildHead(content, route, routes), HEAD_INDENT)
  return replaceBetween(html, BODY_MARKERS, buildBody(content, route), BODY_INDENT)
}

/**
 * Writes one <route>/index.html per non-home route into the build output, using the built
 * index.html as the template, so deep links answer 200 with route-specific metadata.
 * @param {string} distDir the directory that holds the built index.html
 * @param {import("./content.mjs").SiteContent} content
 * @returns {string[]} the paths of the routes written
 */
export function writeRoutePages(distDir, content) {
  const routes = buildRoutes(content)
  const template = readFileSync(path.join(distDir, "index.html"), "utf8")
  for (const route of routes.slice(1)) {
    const dir = path.join(distDir, route.path.slice(1))
    mkdirSync(dir, { recursive: true })
    writeFileSync(path.join(dir, "index.html"), renderPage(template, content, route, routes))
  }
  return routes.slice(1).map((route) => route.path)
}

/**
 * Regenerates the committed crawler files: the blocks in index.html for the home route, and
 * public/robots.txt, public/sitemap.xml, and public/llms.txt.
 * @param {string} root the repository root
 * @param {import("./content.mjs").SiteContent} content
 */
export function writeSiteFiles(root, content) {
  const routes = buildRoutes(content)
  const indexPath = path.join(root, "index.html")
  writeFileSync(indexPath, renderPage(readFileSync(indexPath, "utf8"), content, routes[0], routes))
  writeFileSync(path.join(root, "public/robots.txt"), buildRobots())
  writeFileSync(path.join(root, "public/sitemap.xml"), buildSitemap(routes))
  writeFileSync(path.join(root, "public/llms.txt"), buildLlmsTxt(content, routes))
}
