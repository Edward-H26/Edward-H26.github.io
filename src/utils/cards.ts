import type { BioSegment, ContentCard, ContentLink } from "@/data/content"

export function getCardsByTitle(cards: ContentCard[], title: string) {
  return cards.filter((card) => card.title === title)
}

export function getFirstCardByTitle(cards: ContentCard[], title: string) {
  return cards.find((card) => card.title === title)
}

export function getSegmentKey(segment: BioSegment, index: number) {
  return `${segment.href ?? segment.text}-${index}`
}

export function splitLinksByLabel(
  links: ContentLink[] | undefined,
  label: string
) {
  const normalizedLabel = label.toLowerCase()
  const primary = links?.find((link) => link.label.toLowerCase() === normalizedLabel)
  const secondary = links?.filter((link) => link.label.toLowerCase() !== normalizedLabel) ?? []

  return { primary, secondary }
}

export function isCurrentDateRange(date?: string) {
  return date?.includes("Present") ?? false
}
