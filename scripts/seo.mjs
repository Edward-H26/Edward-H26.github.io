// Generates everything a search engine or AI crawler sees without running JavaScript, from the
// same data the React app renders (src/data/content.ts): the metadata block and the static profile
// inside index.html, public/robots.txt, public/sitemap.xml, public/llms.txt, and with --routes one
// index.html per route inside dist/ so deep links answer 200 instead of the 404 redirect page.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { build } from "esbuild"

export const SITE_URL = "https://edward-h26.github.io"
export const SISTER_SITE_URL = "https://edward-h26.github.io/PersonalWebsite/"
export const OG_IMAGE_URL = `${SITE_URL}/images/og-card.png`
export const SITE_DESCRIPTION =
  "Qiran Hu, research assistant at the University of Illinois Urbana-Champaign working on multimodal learning, 3D-aware generative models, and multi-agent AI."
export const HEAD_MARKERS = ["<!-- seo:head -->", "<!-- /seo:head -->"]
export const BODY_MARKERS = ["<!-- seo:body -->", "<!-- /seo:body -->"]

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const SOCIAL_LABELS = { github: "GitHub", linkedin: "LinkedIn", x: "X", scholar: "Google Scholar" }
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

const STATIC_STYLE = `.static-profile{font-family:Inter,system-ui,sans-serif;max-width:52rem;margin:0 auto;padding:2.5rem 1.25rem;line-height:1.6;color:#1f2937}
.static-profile a{color:#13294b}
.static-profile h1{font-size:2rem;margin:0 0 .25rem}
.static-profile h2{font-size:1.4rem;margin:2rem 0 .5rem}
.static-profile h3{font-size:1.05rem;margin:1.25rem 0 .25rem}
.static-profile .meta{margin:0 0 .35rem;color:#4b5563}
.static-profile nav ul{display:flex;flex-wrap:wrap;gap:.75rem;list-style:none;padding:0}`

export async function loadContent() {
  const { outputFiles } = await build({
    entryPoints: [path.join(ROOT, "src/data/content.ts")],
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
    logLevel: "silent"
  })
  const code = Buffer.from(outputFiles[0].text).toString("base64")
  return import(`data:text/javascript;base64,${code}`)
}

export function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

const segmentsToText = (segments) => segments.map((segment) => segment.text).join("")
const segmentsToHtml = (segments) =>
  segments
    .map((segment) =>
      segment.href ? `<a href="${escapeHtml(segment.href)}">${escapeHtml(segment.text)}</a>` : escapeHtml(segment.text)
    )
    .join("")
const segmentsToMarkdown = (segments) =>
  segments.map((segment) => (segment.href ? `[${segment.text}](${segment.href})` : segment.text)).join("")

const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")

const cardMeta = (card) => [card.subtitle, card.date, card.location].filter(Boolean).join(", ")

function splitName(name) {
  const [givenName, ...rest] = name.split(" ")
  return { givenName, familyName: rest.join(" ") }
}

export function routeUrl(routePath) {
  return routePath === "/" ? `${SITE_URL}/` : `${SITE_URL}${routePath}/`
}

function truncate(text, max = 160) {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`
}

// Citations look like "[1] A. Author, B. Author. Title. Venue." and a card title may be only a prefix
// of the full title, so the title is located inside the citation and its terminator is searched
// from the end of the known title (author initials and abbreviations contain periods too).
// A closing "." is dropped from the title while "?" and "!" belong to it.
export function parseCitation(citation, title) {
  const body = citation.replace(/^\[\d+\]\s*/, "")
  const start = body.indexOf(title)
  if (start < 0) return { authors: [], title, venue: "" }
  const rest = body.slice(start)
  const terminator = /[.?!](?=\s|$)/g
  terminator.lastIndex = Math.max(0, title.length - 1)
  const hit = terminator.exec(rest)
  const fullTitle = hit ? rest.slice(0, hit[0] === "." ? hit.index : hit.index + 1) : rest
  const venue = hit ? rest.slice(hit.index + 1).trim().replace(/\.\s*$/, "") : ""
  const authors = body
    .slice(0, start)
    .replace(/\.\s*$/, "")
    .split(/\s*,\s*(?:and\s+|&\s*)?|\s+and\s+|\s*&\s*/)
    .map((author) => author.trim().replace(/\s+et\s+al\.?$/i, ""))
    .filter((author) => author && !/^et\s+al\.?$/i.test(author))
  return { authors, title: fullTitle, venue }
}

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
        description: truncate(`${section.heading} of ${PROFILE.name}, ${PROFILE.title} at ${PROFILE.affiliation}: ${titles.join("; ")}.`)
      }
    ]
  })
}

// Document-wide unique ids for the cards of a section (two "Education" cards must not share one).
export function cardIds(section) {
  const used = new Set()
  return section.cards.map((card) => {
    const base = `${section.id}-${slug(card.title)}`
    let id = base
    for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`
    used.add(id)
    return id
  })
}

function findHref(paragraphs, text) {
  return paragraphs.flat().find((segment) => segment.text === text && segment.href)?.href
}

function buildArticle(card, cardId, profile, personId) {
  const { authors, title, venue } = parseCitation(card.bullets[0] ?? "", card.title)
  const links = card.links ?? []
  const primary = links.find((link) => /arxiv|paper|pdf/i.test(link.label)) ?? links[0]
  const url = primary?.url ?? `${routeUrl("/publications")}#${cardId}`
  const related = links.filter((link) => link !== primary).map((link) => ({ "@type": "WebPage", name: link.label, url: link.url }))
  const status = /under review/i.test(venue)
    ? { creativeWorkStatus: "Under review" }
    : venue
      ? { publication: { "@type": "PublicationEvent", name: venue } }
      : {}
  return {
    "@type": "ScholarlyArticle",
    "@id": url,
    headline: title,
    name: title,
    url,
    author: authors.map((name) => (name === profile.name ? { "@id": personId } : { "@type": "Person", name })),
    ...(related.length ? { subjectOf: related } : {}),
    ...status
  }
}

export function buildJsonLd(content, routes, route = routes[0]) {
  const { PROFILE, HOME_BIO, RESEARCH_INTERESTS, SECTIONS } = content
  const personId = `${SITE_URL}/#person`
  const websiteId = `${SITE_URL}/#website`
  const { givenName, familyName } = splitName(PROFILE.name)
  const lab = SECTIONS.research.cards[0]
  const schools = SECTIONS.info.cards
    .filter((card) => card.title === "Education")
    .map((card) => ({ "@type": "EducationalOrganization", name: card.bullets[0].split(",")[0] }))
  const home = routes[0]
  const page =
    route.path === "/"
      ? {
          "@type": "ProfilePage",
          "@id": `${SITE_URL}/#profilepage`,
          url: `${SITE_URL}/`,
          name: home.title,
          description: home.description,
          inLanguage: "en",
          isPartOf: { "@id": websiteId },
          mainEntity: { "@id": personId },
          hasPart: routes.slice(1).map((other) => ({
            "@type": "WebPage",
            "@id": routeUrl(other.path),
            url: routeUrl(other.path),
            name: other.title,
            description: other.description,
            isPartOf: { "@id": websiteId }
          }))
        }
      : {
          "@type": "WebPage",
          "@id": routeUrl(route.path),
          url: routeUrl(route.path),
          name: route.title,
          description: route.description,
          inLanguage: "en",
          isPartOf: { "@id": websiteId },
          about: { "@id": personId }
        }
  const publicationIds = cardIds(SECTIONS.publications)
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: PROFILE.name,
        givenName,
        familyName,
        jobTitle: PROFILE.title,
        description: HOME_BIO.map(segmentsToText).join(" "),
        email: `mailto:${PROFILE.email}`,
        telephone: PROFILE.phone,
        url: `${SITE_URL}/`,
        image: `${SITE_URL}${PROFILE.photo}`,
        worksFor: { "@type": "Organization", name: PROFILE.affiliation, url: findHref(HOME_BIO, PROFILE.affiliation) },
        affiliation: [{ "@type": "Organization", name: lab.title, url: lab.links?.[0]?.url }, ...schools],
        sameAs: [...Object.values(PROFILE.social), SISTER_SITE_URL],
        knowsAbout: RESEARCH_INTERESTS
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${SITE_URL}/`,
        name: PROFILE.name,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        author: { "@id": personId },
        publisher: { "@id": personId }
      },
      page,
      ...SECTIONS.publications.cards.map((card, index) => buildArticle(card, publicationIds[index], PROFILE, personId))
    ]
  }
}

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
    `<meta property="og:image" content="${OG_IMAGE_URL}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(`${PROFILE.name}, ${PROFILE.title}`)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    ...(isHome
      ? [
          `<meta property="profile:first_name" content="${escapeHtml(givenName)}" />`,
          `<meta property="profile:last_name" content="${escapeHtml(familyName)}" />`
        ]
      : []),
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(handle ? [`<meta name="twitter:site" content="${escapeHtml(handle)}" />`, `<meta name="twitter:creator" content="${escapeHtml(handle)}" />`] : []),
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE_URL}" />`,
    ...Object.values(PROFILE.social).map((href) => `<link rel="me" href="${escapeHtml(href)}" />`),
    `<style>${STATIC_STYLE}</style>`,
    `<script type="application/ld+json">${jsonLd}</script>`
  ].join("\n")
}

function renderCard(card, id) {
  const meta = cardMeta(card)
  const links = card.links?.length
    ? `<p>Links: ${card.links.map((link) => `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`).join(", ")}</p>`
    : ""
  return [
    `<article id="${id}">`,
    `<h3>${escapeHtml(card.title)}</h3>`,
    meta ? `<p class="meta">${escapeHtml(meta)}</p>` : "",
    `<ul>${card.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>`,
    links,
    `</article>`
  ]
    .filter(Boolean)
    .join("\n")
}

function renderSection(section, url) {
  const ids = cardIds(section)
  return [
    `<section id="${escapeHtml(section.id)}">`,
    `<h2><a href="${url}">${escapeHtml(section.heading)}</a></h2>`,
    section.subheading ? `<p class="meta">${escapeHtml(section.subheading)}</p>` : "",
    ...section.cards.map((card, index) => renderCard(card, ids[index])),
    `</section>`
  ]
    .filter(Boolean)
    .join("\n")
}

function renderHeader(content) {
  const { PROFILE, NAV_ITEMS } = content
  return [
    `<header>`,
    `<h1>${escapeHtml(PROFILE.name)}</h1>`,
    `<p class="meta">${escapeHtml(`${PROFILE.title}, ${PROFILE.affiliation}`)}</p>`,
    `<nav aria-label="Sections"><ul>${NAV_ITEMS.map((item) => `<li><a href="${routeUrl(item.path)}">${escapeHtml(item.label)}</a></li>`).join("")}</ul></nav>`,
    `</header>`
  ].join("\n")
}

// The home page carries the whole profile; a route page carries only its own section so that
// crawlers that do not run JavaScript do not see six copies of the same text.
export function buildBody(content, route = { path: "/" }) {
  const { PROFILE, NAV_ITEMS, HOME_BIO, ANNOUNCEMENT, NEWS, RESEARCH_INTERESTS, SECTIONS, SKILLS_CATEGORIES } = content
  if (route.path !== "/") {
    return [
      `<div class="static-profile">`,
      renderHeader(content),
      renderSection(SECTIONS[route.path.slice(1)], routeUrl(route.path)),
      `<p>Full profile: <a href="${routeUrl("/")}">${routeUrl("/")}</a></p>`,
      `</div>`
    ].join("\n")
  }
  const social = Object.entries(PROFILE.social).map(
    ([key, href]) => `<li>${escapeHtml(SOCIAL_LABELS[key] ?? key)}: <a href="${escapeHtml(href)}">${escapeHtml(href)}</a></li>`
  )
  return [
    `<div class="static-profile">`,
    renderHeader(content),
    `<section id="about">`,
    `<h2>About</h2>`,
    ...HOME_BIO.map((paragraph) => `<p>${segmentsToHtml(paragraph)}</p>`),
    `<p>${escapeHtml(ANNOUNCEMENT.text)}</p>`,
    `</section>`,
    `<section id="news">`,
    `<h2>News</h2>`,
    `<ul>${NEWS.map((item) => `<li><strong>${escapeHtml(item.date)}</strong>: ${segmentsToHtml(item.segments)}</li>`).join("")}</ul>`,
    `</section>`,
    `<section id="research-interests">`,
    `<h2>Research Interests</h2>`,
    `<ul>${RESEARCH_INTERESTS.map((interest) => `<li>${escapeHtml(interest)}</li>`).join("")}</ul>`,
    `</section>`,
    ...NAV_ITEMS.filter((item) => SECTIONS[item.path.slice(1)]).map((item) =>
      renderSection(SECTIONS[item.path.slice(1)], routeUrl(item.path))
    ),
    `<section id="skills">`,
    `<h2>Skills</h2>`,
    `<ul>${Object.entries(SKILLS_CATEGORIES)
      .map(([category, items]) => `<li><strong>${escapeHtml(category)}</strong>: ${escapeHtml(items.join(", "))}</li>`)
      .join("")}</ul>`,
    `</section>`,
    `<section id="contact">`,
    `<h2>Contact</h2>`,
    `<ul>`,
    `<li>Email: <a href="mailto:${escapeHtml(PROFILE.email)}">${escapeHtml(PROFILE.email)}</a></li>`,
    `<li>Phone: ${escapeHtml(PROFILE.phone)}</li>`,
    ...social,
    `<li>Interactive 3D portfolio: <a href="${SISTER_SITE_URL}">${SISTER_SITE_URL}</a></li>`,
    `</ul>`,
    `</section>`,
    `</div>`
  ].join("\n")
}

export function buildLlmsTxt(content, routes) {
  const { PROFILE, NAV_ITEMS, HOME_BIO, ANNOUNCEMENT, NEWS, RESEARCH_INTERESTS, SECTIONS, SKILLS_CATEGORIES } = content
  const lines = [
    `# ${PROFILE.name}`,
    ``,
    `> ${SITE_DESCRIPTION}`,
    ``,
    `- Website: ${SITE_URL}/`,
    `- Interactive 3D portfolio: ${SISTER_SITE_URL}`,
    ...Object.entries(PROFILE.social).map(([key, href]) => `- ${SOCIAL_LABELS[key] ?? key}: ${href}`),
    `- Email: ${PROFILE.email}`,
    `- Phone: ${PROFILE.phone}`,
    ``,
    `## About`,
    ``,
    ...HOME_BIO.flatMap((paragraph) => [segmentsToMarkdown(paragraph), ``]),
    ANNOUNCEMENT.text,
    ``,
    `## News`,
    ``,
    ...NEWS.map((item) => `- **${item.date}**: ${segmentsToMarkdown(item.segments)}`),
    ``,
    `## Research Interests`,
    ``,
    ...RESEARCH_INTERESTS.map((interest) => `- ${interest}`),
    ``
  ]
  for (const item of NAV_ITEMS) {
    const section = SECTIONS[item.path.slice(1)]
    if (!section) continue
    lines.push(`## ${section.heading}`, ``)
    if (section.subheading) lines.push(section.subheading, ``)
    for (const card of section.cards) {
      const meta = cardMeta(card)
      lines.push(`### ${card.title}`, ``)
      if (meta) lines.push(meta, ``)
      lines.push(...card.bullets.map((bullet) => `- ${bullet}`))
      if (card.links?.length) lines.push(`- Links: ${card.links.map((link) => `[${link.label}](${link.url})`).join(", ")}`)
      lines.push(``)
    }
  }
  lines.push(`## Skills`, ``)
  lines.push(...Object.entries(SKILLS_CATEGORIES).map(([category, items]) => `- **${category}**: ${items.join(", ")}`))
  lines.push(``, `## Pages`, ``)
  lines.push(...routes.map((route) => `- [${route.title}](${routeUrl(route.path)}): ${route.description}`))
  lines.push(``)
  return lines.join("\n")
}

export function buildSitemap(routes) {
  const urls = routes
    .map(
      (route) =>
        `  <url>\n    <loc>${routeUrl(route.path)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${route.path === "/" ? "1.0" : "0.8"}</priority>\n  </url>`
    )
    .join("\n")
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function buildRobots() {
  const explicit = AI_CRAWLERS.map((agent) => `User-agent: ${agent}\nAllow: /`).join("\n\n")
  return `# Search engines and AI assistants are welcome to read, index, and cite this site.\nUser-agent: *\nAllow: /\n\n${explicit}\n\nSitemap: ${SITE_URL}/sitemap.xml\nSitemap: ${SISTER_SITE_URL}sitemap.xml\n`
}

export function extractBetween(html, [start, end]) {
  const from = html.indexOf(start)
  const to = html.indexOf(end)
  if (from < 0 || to < from) throw new Error(`Markers ${start} and ${end} were not found`)
  return html.slice(from + start.length, to)
}

export function replaceBetween(html, [start, end], replacement, indent) {
  const from = html.indexOf(start)
  const to = html.indexOf(end)
  if (from < 0 || to < from) throw new Error(`Markers ${start} and ${end} were not found`)
  const block = replacement
    .split("\n")
    .map((line) => indent + line)
    .join("\n")
  return `${html.slice(0, from + start.length)}\n${block}\n${indent}${html.slice(to)}`
}

export function writeRoutePages(distDir, content) {
  const routes = buildRoutes(content)
  const template = readFileSync(path.join(distDir, "index.html"), "utf8")
  for (const route of routes.slice(1)) {
    const dir = path.join(distDir, route.path.slice(1))
    mkdirSync(dir, { recursive: true })
    const html = replaceBetween(template, HEAD_MARKERS, buildHead(content, route, routes), "    ")
    writeFileSync(path.join(dir, "index.html"), replaceBetween(html, BODY_MARKERS, buildBody(content, route), "      "))
  }
  return routes.slice(1).map((route) => route.path)
}

async function main() {
  const content = await loadContent()
  if (process.argv.includes("--routes")) {
    const written = writeRoutePages(path.join(ROOT, "dist"), content)
    console.log(`Route pages written: ${written.join(", ")}`)
    return
  }
  const routes = buildRoutes(content)
  const indexPath = path.join(ROOT, "index.html")
  let html = readFileSync(indexPath, "utf8")
  html = replaceBetween(html, HEAD_MARKERS, buildHead(content, routes[0], routes), "    ")
  html = replaceBetween(html, BODY_MARKERS, buildBody(content), "      ")
  writeFileSync(indexPath, html)
  writeFileSync(path.join(ROOT, "public/robots.txt"), buildRobots())
  writeFileSync(path.join(ROOT, "public/sitemap.xml"), buildSitemap(routes))
  writeFileSync(path.join(ROOT, "public/llms.txt"), buildLlmsTxt(content, routes))
  console.log("index.html, robots.txt, sitemap.xml, and llms.txt regenerated")
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main()
}
