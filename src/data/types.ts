/**
 * Content model shared by the React pages and the SEO generator (scripts/seo, through JSDoc).
 * Every field is readonly because the data never changes at runtime.
 */

/** A labelled external link, rendered as a chip under a card. */
export type ContentLink = {
  readonly label: string
  readonly url: string
}

/** Figure shown on a publication card; width and height reserve the space before it loads. */
export type ContentImage = {
  readonly src: string
  readonly alt: string
  readonly width?: number
  readonly height?: number
}

/** One entry of a section: a role, paper, project, course, or info block. */
export type ContentCard = {
  readonly title: string
  readonly subtitle?: string
  readonly location?: string
  readonly date?: string
  readonly bullets: readonly string[]
  readonly links?: readonly ContentLink[]
  readonly image?: ContentImage
  readonly badge?: string
  readonly authors?: readonly string[]
  readonly venue?: string
  readonly note?: string
}

/** A routed section; id is the route path without its slash and the element id in the pre-rendered profile. */
export type ContentSection = {
  readonly id: string
  readonly heading: string
  readonly subheading?: string
  readonly cards: readonly ContentCard[]
}

/** A navigation entry; path is the React Router path. */
export type NavItem = {
  readonly path: string
  readonly label: string
}

/** A run of text, linked when href is set. A paragraph is an array of segments. */
export type BioSegment = {
  readonly text: string
  readonly href?: string
}

/** A dated news line whose segments render like a bio paragraph. */
export type NewsItem = {
  readonly date: string
  readonly segments: readonly BioSegment[]
}
