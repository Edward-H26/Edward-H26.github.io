import assert from "node:assert/strict"
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs"
import os from "node:os"
import path from "node:path"
import { before, describe, it } from "node:test"
import { fileURLToPath } from "node:url"
import {
  BODY_MARKERS,
  HEAD_MARKERS,
  SISTER_SITE_URL,
  SITE_URL,
  buildBody,
  buildHead,
  buildJsonLd,
  buildLlmsTxt,
  buildRobots,
  buildRoutes,
  buildSitemap,
  cardIds,
  escapeHtml,
  extractBetween,
  loadContent,
  parseCitation,
  replaceBetween,
  routeUrl,
  writeRoutePages
} from "./seo.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const normalize = (text) => text.replace(/\s+/g, " ").trim()
const jsonLdOf = (head) => JSON.parse(head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
const idsIn = (html) => [...html.matchAll(/ id="([^"]+)"/g)].map((match) => match[1])

let content
let routes
before(async () => {
  content = await loadContent()
  routes = buildRoutes(content)
})

describe("parseCitation", () => {
  it("keeps initials with periods inside author names and reads the venue", () => {
    const parsed = parseCitation(
      "[1] Eric Ji, Qiran Hu, Minh N. Do, and Yaoyao Liu. AC3S: Adaptive Conditioning. European Conference on Computer Vision (ECCV) 2026.",
      "AC3S: Adaptive Conditioning"
    )
    assert.deepEqual(parsed, {
      authors: ["Eric Ji", "Qiran Hu", "Minh N. Do", "Yaoyao Liu"],
      title: "AC3S: Adaptive Conditioning",
      venue: "European Conference on Computer Vision (ECCV) 2026"
    })
  })

  it("expands a short card title to the full title found in the citation", () => {
    const parsed = parseCitation("[4] Sarthak Jain, Qiran Hu. AlphaWiseFT: Adaptive Weight Interpolation. Under Review.", "AlphaWiseFT")
    assert.equal(parsed.title, "AlphaWiseFT: Adaptive Weight Interpolation")
    assert.equal(parsed.venue, "Under Review")
  })

  it("keeps question marks in titles and survives abbreviations inside titles", () => {
    assert.deepEqual(parseCitation("[5] Ann Lee, Qiran Hu. Is Scale All You Need? Under Review.", "Is Scale All You Need?"), {
      authors: ["Ann Lee", "Qiran Hu"],
      title: "Is Scale All You Need?",
      venue: "Under Review"
    })
    assert.deepEqual(parseCitation("[6] Ann Lee. U.S. Policy vs. Practice. NeurIPS 2026.", "U.S. Policy vs. Practice"), {
      authors: ["Ann Lee"],
      title: "U.S. Policy vs. Practice",
      venue: "NeurIPS 2026"
    })
  })

  it("falls back to the card title when the citation does not contain it", () => {
    assert.deepEqual(parseCitation("[9] Someone. Other work. Venue.", "Missing"), { authors: [], title: "Missing", venue: "" })
    assert.deepEqual(parseCitation("", "Missing"), { authors: [], title: "Missing", venue: "" })
  })

  it("drops an et al. marker from author lists", () => {
    assert.deepEqual(parseCitation("[7] Qiran Hu et al. Short Paper. Workshop 2026.", "Short Paper").authors, ["Qiran Hu"])
    assert.deepEqual(parseCitation("[8] Ann Lee, Qiran Hu, et al. Short Paper. Workshop 2026.", "Short Paper").authors, ["Ann Lee", "Qiran Hu"])
    assert.deepEqual(parseCitation("[9] Ann Lee & Qiran Hu. Short Paper. Workshop 2026.", "Short Paper").authors, ["Ann Lee", "Qiran Hu"])
  })

  it("parses every real publication into authors that include the site owner", () => {
    for (const card of content.SECTIONS.publications.cards) {
      const parsed = parseCitation(card.bullets[0], card.title)
      assert.ok(parsed.authors.length >= 2, `${card.title} should list authors`)
      assert.ok(parsed.authors.includes(content.PROFILE.name))
      assert.ok(parsed.venue.length > 0)
    }
  })
})

describe("routes", () => {
  it("has one route per navigation item with trailing-slash canonical urls", () => {
    assert.deepEqual(
      routes.map((route) => route.path),
      content.NAV_ITEMS.map((item) => item.path)
    )
    assert.equal(routeUrl("/"), `${SITE_URL}/`)
    assert.equal(routeUrl("/publications"), `${SITE_URL}/publications/`)
  })

  it("gives every route a distinct title and a snippet-sized description", () => {
    assert.equal(new Set(routes.map((route) => route.title)).size, routes.length)
    for (const route of routes) {
      assert.ok(route.description.length > 40 && route.description.length <= 160, route.path)
    }
  })

  it("skips a navigation item that has no section yet", () => {
    const extra = buildRoutes({ ...content, NAV_ITEMS: [...content.NAV_ITEMS, { path: "/talks", label: "Talks" }] })
    assert.deepEqual(extra, routes)
  })
})

describe("head", () => {
  it("emits title, canonical, Open Graph, Twitter, and robots tags for each route", () => {
    for (const route of routes) {
      const head = buildHead(content, route, routes)
      assert.equal(head.match(/<title>/g).length, 1)
      assert.ok(head.includes(`<title>${route.title}</title>`))
      assert.ok(head.includes(`<link rel="canonical" href="${routeUrl(route.path)}" />`))
      assert.ok(head.includes(`<meta property="og:url" content="${routeUrl(route.path)}" />`))
      assert.ok(head.includes(`<meta property="og:image" content="${SITE_URL}/images/og-card.png" />`))
      assert.ok(head.includes('<meta name="twitter:card" content="summary_large_image" />'))
      assert.ok(head.includes('<meta name="twitter:site" content="@QiranHu" />'))
      assert.ok(head.includes('<meta name="robots" content="index, follow'))
    }
  })

  it("marks only the home page as a profile", () => {
    assert.ok(buildHead(content, routes[0], routes).includes('<meta property="og:type" content="profile" />'))
    assert.ok(buildHead(content, routes[1], routes).includes('<meta property="og:type" content="website" />'))
  })

  it("drops the Twitter handle tags when there is no X profile", () => {
    const head = buildHead({ ...content, PROFILE: { ...content.PROFILE, social: { github: content.PROFILE.social.github } } }, routes[0], routes)
    assert.ok(!head.includes("twitter:site"))
    assert.ok(!head.includes("twitter:creator"))
    assert.ok(head.includes('<meta name="twitter:card"'))
  })

  it("escapes html inside metadata", () => {
    const head = buildHead(content, { path: "/x", title: 'A "quoted" <title>', description: "d & e" }, routes)
    assert.ok(head.includes("<title>A &quot;quoted&quot; &lt;title&gt;</title>"))
    assert.ok(head.includes('content="d &amp; e"'))
  })

  it("embeds json-ld that parses and cannot close the script tag early", () => {
    const head = buildHead(content, routes[0], routes)
    const raw = head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]
    assert.ok(!raw.includes("</"))
    assert.equal(jsonLdOf(head)["@context"], "https://schema.org")
  })
})

describe("json-ld", () => {
  it("describes the person with photo, contact details, social profiles, and research interests", () => {
    const person = buildJsonLd(content, routes)["@graph"].find((node) => node["@type"] === "Person")
    assert.equal(person.name, content.PROFILE.name)
    assert.equal(person.email, `mailto:${content.PROFILE.email}`)
    assert.equal(person.image, `${SITE_URL}${content.PROFILE.photo}`)
    for (const href of Object.values(content.PROFILE.social)) assert.ok(person.sameAs.includes(href))
    assert.ok(person.sameAs.includes(SISTER_SITE_URL))
    assert.deepEqual(person.knowsAbout, content.RESEARCH_INTERESTS)
    assert.equal(person.worksFor.url, "https://www.illinois.edu/")
  })

  it("lists one scholarly article per publication with authors and publication status", () => {
    const graph = buildJsonLd(content, routes)["@graph"]
    const articles = graph.filter((node) => node["@type"] === "ScholarlyArticle")
    assert.equal(articles.length, content.SECTIONS.publications.cards.length)
    for (const article of articles) {
      assert.ok(article.author.length >= 2)
      assert.ok(article.author.some((author) => author["@id"] === `${SITE_URL}/#person`))
      assert.ok(article.publication?.["@type"] === "PublicationEvent" || article.creativeWorkStatus === "Under review")
    }
    const accepted = articles.find((article) => article.headline.startsWith("AC3S"))
    assert.match(accepted.publication.name, /ECCV/)
    assert.equal(accepted.url, "https://arxiv.org/pdf/2606.31204")
    assert.deepEqual(
      accepted.subjectOf.map((page) => page.name),
      ["Project Page", "Video", "BibTeX"]
    )
  })

  it("tolerates a publication card without a citation", () => {
    const graph = buildJsonLd(
      { ...content, SECTIONS: { ...content.SECTIONS, publications: { id: "publications", heading: "Publications", cards: [{ title: "Draft", bullets: [] }] } } },
      routes
    )["@graph"]
    const article = graph.find((node) => node["@type"] === "ScholarlyArticle")
    assert.equal(article.headline, "Draft")
    assert.deepEqual(article.author, [])
    assert.equal(article.url, `${SITE_URL}/publications/#publications-draft`)
  })

  it("describes the home page as a ProfilePage and every other route as its own WebPage", () => {
    const home = buildJsonLd(content, routes)["@graph"]
    const profilePage = home.find((node) => node["@type"] === "ProfilePage")
    assert.deepEqual(
      profilePage.hasPart.map((part) => part.url),
      routes.slice(1).map((route) => routeUrl(route.path))
    )
    for (const route of routes.slice(1)) {
      const graph = buildJsonLd(content, routes, route)["@graph"]
      assert.equal(graph.filter((node) => node["@type"] === "ProfilePage").length, 0)
      const page = graph.find((node) => node["@type"] === "WebPage")
      assert.equal(page.url, routeUrl(route.path))
      assert.equal(page.name, route.title)
      assert.deepEqual(page.about, { "@id": `${SITE_URL}/#person` })
    }
  })

  it("only references node ids that exist in the graph", () => {
    for (const route of routes) {
      const graph = buildJsonLd(content, routes, route)["@graph"]
      const ids = new Set(graph.map((node) => node["@id"]))
      const references = []
      const walk = (value) => {
        if (Array.isArray(value)) value.forEach(walk)
        else if (value && typeof value === "object") {
          if (Object.keys(value).length === 1 && value["@id"]) references.push(value["@id"])
          Object.values(value).forEach(walk)
        }
      }
      walk(graph)
      assert.ok(references.length > 0)
      for (const reference of references) assert.ok(ids.has(reference), `${reference} on ${route.path}`)
    }
  })
})

describe("static body", () => {
  it("contains every section, card, bullet, news item, and interest on the home page", () => {
    const body = buildBody(content)
    for (const section of Object.values(content.SECTIONS)) {
      assert.ok(body.includes(`<section id="${section.id}">`))
      for (const card of section.cards) {
        assert.ok(body.includes(`<h3>${escapeHtml(card.title)}</h3>`), card.title)
        for (const bullet of card.bullets) assert.ok(body.includes(escapeHtml(bullet)))
        for (const link of card.links ?? []) assert.ok(body.includes(`href="${escapeHtml(link.url)}"`))
      }
    }
    for (const item of content.NEWS) assert.ok(body.includes(item.date))
    for (const interest of content.RESEARCH_INTERESTS) assert.ok(body.includes(interest))
    assert.ok(body.includes(SISTER_SITE_URL))
    assert.ok(!body.includes("undefined"))
  })

  it("uses unique element ids even when two cards share a title", () => {
    const ids = idsIn(buildBody(content))
    assert.equal(new Set(ids).size, ids.length)
    assert.deepEqual(
      cardIds(content.SECTIONS.info).filter((id) => id.startsWith("info-education")),
      ["info-education", "info-education-2"]
    )
  })

  it("renders only the route's own section on a route page", () => {
    for (const route of routes.slice(1)) {
      const body = buildBody(content, route)
      const section = content.SECTIONS[route.path.slice(1)]
      assert.ok(body.includes(`<section id="${section.id}">`))
      for (const other of Object.values(content.SECTIONS)) {
        if (other !== section) assert.ok(!body.includes(`<section id="${other.id}">`), `${route.path} leaks ${other.id}`)
      }
      assert.ok(!body.includes('<section id="about">'))
      assert.ok(body.includes("<h1>"))
      assert.ok(body.includes(`href="${routeUrl("/")}"`))
    }
  })

  it("escapes markup coming from the content and tolerates cards without optional fields", () => {
    const body = buildBody(
      {
        ...content,
        SECTIONS: {
          ...content.SECTIONS,
          projects: { id: "projects", heading: "Projects", cards: [{ title: "Bad <b>title</b>", bullets: ["a & b"] }] }
        }
      },
      { path: "/projects" }
    )
    const section = body.slice(body.indexOf('<section id="projects">'), body.indexOf("</section>"))
    assert.ok(section.includes("<h3>Bad &lt;b&gt;title&lt;/b&gt;</h3>"))
    assert.ok(section.includes("<li>a &amp; b</li>"))
    assert.ok(!section.includes("Links:"))
    assert.ok(!section.includes('class="meta"'))
  })
})

describe("crawler files", () => {
  it("allows every crawler and lists both sitemaps", () => {
    const robots = buildRobots()
    assert.ok(robots.startsWith("# "))
    assert.ok(robots.includes("User-agent: *\nAllow: /"))
    assert.ok(robots.includes("User-agent: GPTBot\nAllow: /"))
    assert.ok(robots.includes("User-agent: ClaudeBot\nAllow: /"))
    assert.ok(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`))
    assert.ok(robots.includes(`Sitemap: ${SISTER_SITE_URL}sitemap.xml`))
    assert.ok(!robots.includes("Disallow"))
  })

  it("lists every route exactly once in the sitemap", () => {
    const sitemap = buildSitemap(routes)
    for (const route of routes) assert.equal(sitemap.split(`<loc>${routeUrl(route.path)}</loc>`).length, 2)
    assert.equal(sitemap.match(/<url>/g).length, routes.length)
  })

  it("writes llms.txt with the name heading, a summary quote, and every publication", () => {
    const llms = buildLlmsTxt(content, routes)
    assert.ok(llms.startsWith(`# ${content.PROFILE.name}\n\n> `))
    for (const card of content.SECTIONS.publications.cards) assert.ok(llms.includes(`### ${card.title}`))
    for (const route of routes) assert.ok(llms.includes(`](${routeUrl(route.path)})`))
    assert.ok(!llms.includes("undefined"))
  })
})

describe("index.html", () => {
  it("is in sync with the generator (run: node scripts/seo.mjs)", () => {
    const html = readFileSync(path.join(ROOT, "index.html"), "utf8")
    assert.equal(normalize(extractBetween(html, HEAD_MARKERS)), normalize(buildHead(content, routes[0], routes)))
    assert.equal(normalize(extractBetween(html, BODY_MARKERS)), normalize(buildBody(content)))
    assert.equal(readFileSync(path.join(ROOT, "public/robots.txt"), "utf8"), buildRobots())
    assert.equal(readFileSync(path.join(ROOT, "public/sitemap.xml"), "utf8"), buildSitemap(routes))
    assert.equal(readFileSync(path.join(ROOT, "public/llms.txt"), "utf8"), buildLlmsTxt(content, routes))
  })

  it("replaces only the block between markers and keeps them for the next run", () => {
    const html = "<head>\n  <!-- seo:head -->\n  old\n  <!-- /seo:head -->\n</head>"
    const next = replaceBetween(html, HEAD_MARKERS, "a\nb", "  ")
    assert.equal(next, "<head>\n  <!-- seo:head -->\n  a\n  b\n  <!-- /seo:head -->\n</head>")
    assert.throws(() => replaceBetween("<head></head>", HEAD_MARKERS, "x", ""), /Markers/)
  })

  it("writes one page per route into dist with route-specific head and body", () => {
    const dist = mkdtempSync(path.join(os.tmpdir(), "seo-dist-"))
    mkdirSync(dist, { recursive: true })
    writeFileSync(
      path.join(dist, "index.html"),
      `<html><head>\n    ${HEAD_MARKERS[0]}\n    home head\n    ${HEAD_MARKERS[1]}\n</head><body><div id="root">\n      ${BODY_MARKERS[0]}\n      home body\n      ${BODY_MARKERS[1]}\n</div></body></html>`
    )
    const written = writeRoutePages(dist, content)
    assert.deepEqual(written, routes.slice(1).map((route) => route.path))
    for (const route of routes.slice(1)) {
      const html = readFileSync(path.join(dist, route.path.slice(1), "index.html"), "utf8")
      assert.ok(html.includes(`<link rel="canonical" href="${routeUrl(route.path)}" />`))
      assert.ok(html.includes(`<section id="${route.path.slice(1)}">`))
      assert.ok(!html.includes("home head") && !html.includes("home body"))
      assert.ok(html.includes(HEAD_MARKERS[1]) && html.includes(BODY_MARKERS[1]))
    }
    assert.ok(readFileSync(path.join(dist, "index.html"), "utf8").includes("home body"))
  })
})
