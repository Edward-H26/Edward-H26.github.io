import { routeUrl } from "./routes.mjs"
import { SISTER_SITE_URL, SOCIAL_LABELS } from "./site.mjs"
import { cardIds, cardMeta, escapeHtml, segmentsToHtml } from "./text.mjs"

/** @param {import("../../src/data/index.js").ContentCard} card */
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

/** @param {import("../../src/data/index.js").ContentSection} section */
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

/** @param {import("./content.mjs").SiteContent} content */
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

/**
 * The static profile that React replaces on mount. The home page carries the whole profile; a
 * route page carries only its own section so that crawlers that do not run JavaScript do not see
 * six copies of the same text.
 * @param {import("./content.mjs").SiteContent} content
 * @param {{ path: string }} [route] the route being rendered, home by default
 */
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
