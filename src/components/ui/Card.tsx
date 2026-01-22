import { ExternalLink } from "lucide-react"
import type { ContentCard } from "@/data/content"

interface CardProps {
  card: ContentCard
  variant?: "default" | "compact"
}

export function Card({ card, variant = "default" }: CardProps) {
  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {card.title}
          </h3>
          {card.subtitle && (
            <p className="text-sm text-accent-dark mt-0.5">
              {card.subtitle}
            </p>
          )}
        </div>
        {(card.location || card.date) && (
          <div className="text-sm text-gray-500 text-right flex-shrink-0">
            {card.location && <div>{card.location}</div>}
            {card.date && <div className="font-medium">{card.date}</div>}
          </div>
        )}
      </div>

      {variant === "default" && card.bullets.length > 0 && (
        <ul className="space-y-2 text-sm text-gray-600">
          {card.bullets.map((bullet, index) => (
            <li key={index} className="flex gap-2">
              <span className="text-accent-dark mt-1.5 flex-shrink-0">
                &bull;
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {card.links && card.links.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {card.links.map((link, index) => (
            <a
              key={index}
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
      )}
    </div>
  )
}
