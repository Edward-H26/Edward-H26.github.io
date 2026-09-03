import { Fragment } from "react"
import type { ContentCard } from "@/data/content"
import { getPublicationStatus } from "@/utils/cards"
import { ContentLinks } from "@/components/ui/ContentLinks"

const OWNER_NAME = "Qiran Hu"

function renderCitation(citation: string) {
  const parts = citation.split(OWNER_NAME)
  return parts.map((part, partIndex) => (
    <Fragment key={partIndex}>
      {part}
      {partIndex < parts.length - 1 && <strong>{OWNER_NAME}</strong>}
    </Fragment>
  ))
}

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
          <div className="mb-2 flex flex-wrap items-start gap-2">
            <h3 className="text-lg font-semibold leading-snug text-gray-900">
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
              {renderCitation(citation)}
            </p>
          ))}

          {publication.links && publication.links.length > 0 && (
            <ContentLinks links={publication.links} />
          )}
        </div>
      </div>
    </div>
  )
}
