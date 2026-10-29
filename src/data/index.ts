/**
 * Public entry of the site content. Pages import from "@/data"; the SEO generator bundles this
 * file with esbuild, so every value exported here is also what scripts/seo sees.
 */
export type { BioSegment, ContentCard, ContentImage, ContentLink, ContentSection, NavItem, NewsItem } from "./types"
export { PROFILE } from "./profile"
export { NAV_ITEMS, NAV_MAIN, NAV_MORE } from "./navigation"
export { ANNOUNCEMENT, HOME_BIO } from "./bio"
export { NEWS } from "./news"
export { RESEARCH_INTERESTS } from "./researchInterests"
export { SECTIONS, type SectionId } from "./sections"
export { PROFESSIONAL_SKILLS, SKILLS_CATEGORIES } from "./skills"
