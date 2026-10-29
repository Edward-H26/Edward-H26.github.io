import type { BioSegment, ContentCard, ContentLink } from "@/data"

/** Every card of a section with the given title; the Info section repeats "Education". */
export function getCardsByTitle(cards: readonly ContentCard[], title: string) {
  return cards.filter((card) => card.title === title)
}

/** The first card of a section with the given title, if any. */
export function getFirstCardByTitle(cards: readonly ContentCard[], title: string) {
  return cards.find((card) => card.title === title)
}

/** React key for a text segment: its link or text plus its position, since text can repeat. */
export function getSegmentKey(segment: BioSegment, index: number) {
  return `${segment.href ?? segment.text}-${index}`
}

/** Pulls the link whose label matches (case-insensitively) out of a card's links. */
export function splitLinksByLabel(links: readonly ContentLink[] | undefined, label: string) {
  const normalizedLabel = label.toLowerCase()
  const primary = links?.find((link) => link.label.toLowerCase() === normalizedLabel)
  const secondary = links?.filter((link) => link.label.toLowerCase() !== normalizedLabel) ?? []

  return { primary, secondary }
}

/** True for an open-ended date range such as "2026.09 - Present". */
export function isCurrentDateRange(date?: string) {
  return date?.includes("Present") ?? false
}
