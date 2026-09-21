import { Fragment } from "react"
import type { ContentCard } from "@/data/content"
import { PROFILE } from "@/data/content"
import { LinkChip } from "@/components/ui/ContentLinks"

// The venue acronym in parentheses is bold and a published venue closes with a period, as on the
// reference homepages. Rows that read "Under Review" get neither.
function renderVenue(venue: string) {
  const tail = /\d$/.test(venue) ? "." : ""
  const match = venue.match(/\(([A-Za-z]+)\)/)
  if (!match || match.index === undefined) return venue + tail
  const start = match.index + 1
  return (
    <>
      {venue.slice(0, start)}
      <strong className="text-gray-700">{match[1]}</strong>
      {venue.slice(start + match[1].length)}
      {tail}
    </>
  )
}

function primaryLink(publication: ContentCard) {
  const links = publication.links ?? []
  return links.find((link) => /arxiv|pdf/i.test(link.label)) ?? links.find((link) => /project/i.test(link.label))
}

function Authors({ authors }: { authors: string[] }) {
  return (
    <p className="mt-2 text-[15px] leading-relaxed text-gray-700">
      {authors.map((author, index) => (
        <Fragment key={author}>
          {index > 0 && ", "}
          {author === PROFILE.name ? <strong className="font-semibold text-gray-900">{author}</strong> : author}
        </Fragment>
      ))}
    </p>
  )
}

interface PublicationCardProps {
  publication: ContentCard
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const primary = primaryLink(publication)
  const thumbnail = publication.image ? (
    <figure className="paper-thumb">
      <img src={publication.image.src} alt={publication.image.alt} loading="lazy" width={publication.image.width ?? 1000} height={publication.image.height ?? 700} />
      {publication.badge && (
        <span className={publication.badge === "Under Review" ? "paper-badge paper-badge-muted" : "paper-badge"}>{publication.badge}</span>
      )}
    </figure>
  ) : null

  return (
    <article className="card flex flex-col gap-5 md:flex-row md:items-start md:gap-7">
      {thumbnail && (
        <div className="w-full flex-shrink-0 md:w-[360px]">
          {primary ? (
            <a href={primary.url} target="_blank" rel="noopener noreferrer" aria-label={`${publication.title} (${primary.label})`}>
              {thumbnail}
            </a>
          ) : (
            thumbnail
          )}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold leading-snug text-primary md:text-xl">
          {primary ? (
            <a href={primary.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent-dark hover:no-underline">
              {publication.title}
            </a>
          ) : (
            publication.title
          )}
        </h3>

        {publication.authors && <Authors authors={publication.authors} />}

        {publication.venue && <p className="mt-2 text-[15px] italic text-gray-500">{renderVenue(publication.venue)}</p>}

        {publication.links && publication.links.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {publication.links.map((link) => (
              <LinkChip key={link.url} link={link} />
            ))}
          </div>
        )}

        {publication.note && <p className="mt-3 text-sm font-medium italic text-[#d2361e]">{publication.note}</p>}
      </div>
    </article>
  )
}
