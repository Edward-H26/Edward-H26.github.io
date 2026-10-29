// Generates everything a search engine or AI crawler sees without running JavaScript, from the
// same data the React app renders (src/data/index.ts): the metadata block and the static profile
// inside index.html, public/robots.txt, public/sitemap.xml, public/llms.txt, and with --routes one
// index.html per route inside dist/ so deep links answer 200 instead of the 404 redirect page.
// The work is done by the modules in scripts/seo/; this file is the command line entry and the
// public surface that the tests import.
import path from "node:path"
import { fileURLToPath } from "node:url"
import { loadContent } from "./seo/content.mjs"
import { DIST_DIR, ROOT } from "./seo/paths.mjs"
import { writeRoutePages, writeSiteFiles } from "./seo/write.mjs"

export { SISTER_SITE_URL, SITE_URL } from "./seo/site.mjs"
export { loadContent } from "./seo/content.mjs"
export { cardIds, escapeHtml } from "./seo/text.mjs"
export { parseCitation } from "./seo/citation.mjs"
export { buildRoutes, routeUrl } from "./seo/routes.mjs"
export { buildJsonLd } from "./seo/jsonLd.mjs"
export { buildHead } from "./seo/head.mjs"
export { buildBody } from "./seo/body.mjs"
export { buildLlmsTxt } from "./seo/llms.mjs"
export { buildRobots, buildSitemap } from "./seo/crawlers.mjs"
export { BODY_MARKERS, HEAD_MARKERS, extractBetween, replaceBetween } from "./seo/markers.mjs"
export { writeRoutePages, writeSiteFiles } from "./seo/write.mjs"

async function main() {
  const content = await loadContent()
  if (process.argv.includes("--routes")) {
    const written = writeRoutePages(DIST_DIR, content)
    console.log(`Route pages written: ${written.join(", ")}`)
    return
  }
  writeSiteFiles(ROOT, content)
  console.log("index.html, robots.txt, sitemap.xml, and llms.txt regenerated")
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main()
}
