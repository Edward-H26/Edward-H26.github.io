import { routeUrl } from "./routes.mjs"
import { SISTER_SITE_URL, SITE_DESCRIPTION, SITE_URL, SOCIAL_LABELS } from "./site.mjs"
import { cardMeta, segmentsToMarkdown } from "./text.mjs"

/**
 * The Markdown profile at /llms.txt for AI assistants: contact, bio, news, interests, every section
 * with its cards, the skills, and a list of pages.
 * @param {import("./content.mjs").SiteContent} content
 * @param {import("./routes.mjs").Route[]} routes
 */
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
