import { ExternalLink } from "lucide-react"
import type { ContentLink } from "@/data/content"

interface ContentLinksProps {
  links?: ContentLink[]
  className?: string
}

export function ContentLinks({
  links,
  className = "flex flex-wrap gap-2 mt-4",
}: ContentLinksProps) {
  if (!links || links.length === 0) return null

  return (
    <div className={className}>
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-chip"
        >
          {link.label}
          <ExternalLink size={12} />
        </a>
      ))}
    </div>
  )
}
