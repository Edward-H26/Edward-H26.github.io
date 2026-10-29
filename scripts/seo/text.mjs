// Plain text, HTML, and Markdown helpers shared by the renderers.

/**
 * @typedef {import("../../src/data/index.js").BioSegment} BioSegment
 * @typedef {import("../../src/data/index.js").ContentCard} ContentCard
 * @typedef {import("../../src/data/index.js").ContentSection} ContentSection
 */

/** Escapes the four characters that would break an attribute value or a text node. */
export function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

/** @param {readonly BioSegment[]} segments */
export const segmentsToText = (segments) => segments.map((segment) => segment.text).join("")

/** Renders linked segments as anchors; text and hrefs are escaped. @param {readonly BioSegment[]} segments */
export const segmentsToHtml = (segments) =>
  segments
    .map((segment) => (segment.href ? `<a href="${escapeHtml(segment.href)}">${escapeHtml(segment.text)}</a>` : escapeHtml(segment.text)))
    .join("")

/** Renders linked segments as Markdown links. @param {readonly BioSegment[]} segments */
export const segmentsToMarkdown = (segments) =>
  segments.map((segment) => (segment.href ? `[${segment.text}](${segment.href})` : segment.text)).join("")

/** Lowercase, hyphen-separated identifier made from a title, for element ids. */
export const slug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

/** The "subtitle, date, location" line under a card title, without the missing parts. @param {ContentCard} card */
export const cardMeta = (card) => [card.subtitle, card.date, card.location].filter(Boolean).join(", ")

/** Splits "Given Family Names" into the schema.org givenName and familyName. */
export function splitName(name) {
  const [givenName, ...rest] = name.split(" ")
  return { givenName, familyName: rest.join(" ") }
}

/** Cuts text at a word boundary so the result, ellipsis included, is at most max characters. */
export function truncate(text, max) {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`
}

/**
 * Document-wide unique ids for the cards of a section (two "Education" cards must not share one).
 * @param {ContentSection} section
 * @returns {string[]} one id per card, in card order
 */
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
