import type { ContentCard } from "@/data/content"
import { ContentBullets } from "@/components/ui/ContentBullets"
import { ContentLinks } from "@/components/ui/ContentLinks"

interface CardProps {
  card: ContentCard
}

export function Card({ card }: CardProps) {
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

      <ContentBullets bullets={card.bullets} />

      <ContentLinks links={card.links} />
    </div>
  )
}
