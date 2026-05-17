import type { BioSegment, ContentCard, ContentLink } from "@/data/content"

export type PublicationStatus = {
  label: string
  className: string
}

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

export function getPublicationStatus(citation: string): PublicationStatus {
  const normalizedCitation = citation.toLowerCase()
  const isUnderReview = normalizedCitation.includes("under review")
  const isSubmitted = normalizedCitation.includes("submitted")
  const isPreprint = normalizedCitation.includes("preprint")

  if (isUnderReview) {
    return {
      label: "Under Review",
      className: "bg-blue-100 text-blue-700",
    }
  }

  if (isSubmitted) {
    return {
      label: "Submitted",
      className: "bg-blue-100 text-blue-700",
    }
  }

  if (isPreprint) {
    return {
      label: "Preprint",
      className: "bg-purple-100 text-purple-700",
    }
  }

  return {
    label: "Published",
    className: "bg-green-100 text-green-700",
  }
}

export function isCurrentDateRange(date?: string) {
  return date?.includes("Present") ?? false
}
