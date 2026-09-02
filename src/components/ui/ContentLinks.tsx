import { CirclePlay, ExternalLink, FileText, Globe, type LucideIcon } from "lucide-react"
import type { ContentLink } from "@/data/content"

interface ContentLinksProps {
  links?: ContentLink[]
  className?: string
}

// Keyed by lowercase link label; matched links show this icon in place of the external-link arrow.
const LINK_ICONS: Partial<Record<string, LucideIcon>> = {
  arxiv: FileText,
  project: Globe,
  video: CirclePlay,
}

export function ContentLinks({
  links,
  className = "flex flex-wrap gap-2 mt-4",
}: ContentLinksProps) {
  if (!links || links.length === 0) return null

  return (
    <div className={className}>
      {links.map((link) => {
        const Icon = LINK_ICONS[link.label.toLowerCase()]
        return (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-chip"
          >
            {Icon ? <Icon size={12} /> : null}
            {link.label}
            {Icon ? null : <ExternalLink size={12} />}
          </a>
        )
      })}
    </div>
  )
}
