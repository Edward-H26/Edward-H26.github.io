import assert from "node:assert/strict"
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs"
import os from "node:os"
import path from "node:path"
import { describe, it } from "node:test"
import { buildBody } from "./body.mjs"
import { buildRobots, buildSitemap } from "./crawlers.mjs"
import { SAMPLE_CONTENT } from "./fixtures.mjs"
import { buildHead } from "./head.mjs"
import { buildLlmsTxt } from "./llms.mjs"
import { BODY_MARKERS, HEAD_MARKERS, extractBetween } from "./markers.mjs"
import { buildRoutes } from "./routes.mjs"
import { writeSiteFiles } from "./write.mjs"

const normalize = (text) => text.replace(/\s+/g, " ").trim()

function makeRoot() {
  const root = mkdtempSync(path.join(os.tmpdir(), "seo-root-"))
  mkdirSync(path.join(root, "public"))
  writeFileSync(
    path.join(root, "index.html"),
    `<html><head>\n    ${HEAD_MARKERS[0]}\n    old head\n    ${HEAD_MARKERS[1]}\n</head><body><div id="root">\n      ${BODY_MARKERS[0]}\n      old body\n      ${BODY_MARKERS[1]}\n</div></body></html>`
  )
  return root
}

describe("writeSiteFiles", () => {
  it("fills the index.html blocks for the home route and writes the three public files", () => {
    const root = makeRoot()
    writeSiteFiles(root, SAMPLE_CONTENT)
    const routes = buildRoutes(SAMPLE_CONTENT)
    const html = readFileSync(path.join(root, "index.html"), "utf8")
    assert.ok(!html.includes("old head") && !html.includes("old body"))
    assert.equal(normalize(extractBetween(html, HEAD_MARKERS)), normalize(buildHead(SAMPLE_CONTENT, routes[0], routes)))
    assert.equal(normalize(extractBetween(html, BODY_MARKERS)), normalize(buildBody(SAMPLE_CONTENT)))
    assert.equal(readFileSync(path.join(root, "public/robots.txt"), "utf8"), buildRobots())
    assert.equal(readFileSync(path.join(root, "public/sitemap.xml"), "utf8"), buildSitemap(routes))
    assert.equal(readFileSync(path.join(root, "public/llms.txt"), "utf8"), buildLlmsTxt(SAMPLE_CONTENT, routes))
  })

  it("writes the same index.html when run twice", () => {
    const root = makeRoot()
    writeSiteFiles(root, SAMPLE_CONTENT)
    const first = readFileSync(path.join(root, "index.html"), "utf8")
    writeSiteFiles(root, SAMPLE_CONTENT)
    assert.equal(readFileSync(path.join(root, "index.html"), "utf8"), first)
  })
})
