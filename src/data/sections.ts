import type { ContentSection } from "./types"
import { EXPERIENCE } from "./experience"
import { INFO } from "./info"
import { PROJECTS } from "./projects"
import { PUBLICATIONS } from "./publications"
import { RESEARCH } from "./research"
import { SERVICE } from "./service"
import { TEACHING } from "./teaching"

/**
 * Every routed section keyed by route id. Each key must equal its section's id and the matching
 * NAV_ITEMS path without the leading slash, because the router, the pre-rendered profile, and the
 * sitemap all look sections up that way.
 */
export const SECTIONS = {
  research: RESEARCH,
  publications: PUBLICATIONS,
  experience: EXPERIENCE,
  projects: PROJECTS,
  teaching: TEACHING,
  service: SERVICE,
  info: INFO,
} as const satisfies Readonly<Record<string, ContentSection>>

/** Route id of a section, for pages that render any section by id. */
export type SectionId = keyof typeof SECTIONS
