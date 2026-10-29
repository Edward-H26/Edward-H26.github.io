import { Braces, CirclePlay, ExternalLink, FileText, Github, Globe, type LucideIcon } from "lucide-react"
import type { ContentLink } from "@/data"

// Keyed by lowercase link label; matched links lead with this icon, others end with an external-link arrow.
const LINK_ICONS: Partial<Record<string, LucideIcon>> = {
  arxiv: FileText,
  pdf: FileText,
  "project page": Globe,
  video: CirclePlay,
  bibtex: Braces,
  code: Github,
  github: Github,
}

/** External link pill with the icon of its label, or a trailing arrow for unknown labels. */
export function LinkChip({ link }: { link: ContentLink }) {
  const Icon = LINK_ICONS[link.label.toLowerCase()]
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-chip">
      {Icon ? <Icon size={13} strokeWidth={2.25} /> : null}
      {link.label}
      {Icon ? null : <ExternalLink size={13} strokeWidth={2.25} />}
    </a>
  )
}

interface ContentLinksProps {
  links?: readonly ContentLink[]
  className?: string
}

/** Row of LinkChip pills; renders nothing without links. */
export function ContentLinks({ links, className = "flex flex-wrap gap-2 mt-4" }: ContentLinksProps) {
  if (!links || links.length === 0) return null

  return (
    <div className={className}>
      {links.map((link) => (
        <LinkChip key={link.url} link={link} />
      ))}
    </div>
  )
}
