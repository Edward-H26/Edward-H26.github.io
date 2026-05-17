import type { ContentCard } from "@/data/content"
import { getPublicationStatus } from "@/utils/content"

interface PublicationCardProps {
  publication: ContentCard
  index: number
}

export function PublicationCard({ publication, index }: PublicationCardProps) {
  const status = getPublicationStatus(publication.bullets[0] ?? "")

  return (
    <div className="card">
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${status.className}`}
        >
          {index + 1}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {publication.title}
            </h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.className}`}
            >
              {status.label}
            </span>
          </div>

          {publication.bullets.map((citation, citationIndex) => (
            <p key={citationIndex} className="text-sm text-gray-600 leading-relaxed">
              {citation}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
