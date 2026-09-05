import { Fragment } from "react"
import { CirclePlay, FileText, Globe, Quote, type LucideIcon } from "lucide-react"
import type { ContentCard, ContentLink } from "@/data/content"
import { PROFILE } from "@/data/content"

// The venue acronym in parentheses is bold, as on the reference homepages.
function renderVenue(venue: string) {
  const match = venue.match(/\(([A-Za-z]+)\)/)
  if (!match || match.index === undefined) return venue
  const start = match.index + 1
  return (
    <>
      {venue.slice(0, start)}
      <strong className="text-gray-700">{match[1]}</strong>
      {venue.slice(start + match[1].length)}
    </>
  )
}

// Paper buttons are plain outlined pills, like an academic homepage, not the site's glass chips.
const PAPER_ICONS: Partial<Record<string, LucideIcon>> = { pdf: FileText, "project page": Globe, video: CirclePlay, bibtex: Quote }

function PaperLink({ link }: { link: ContentLink }) {
  const Icon = PAPER_ICONS[link.label.toLowerCase()]
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" className="paper-link">
      {Icon ? <Icon size={13} /> : null}
      {link.label}
    </a>
  )
}

function primaryLink(publication: ContentCard) {
  const links = publication.links ?? []
  return links.find((link) => /arxiv|pdf/i.test(link.label)) ?? links.find((link) => /project/i.test(link.label))
}

function Authors({ authors }: { authors: string[] }) {
  return (
    <p className="mt-1.5 text-sm leading-relaxed text-gray-700">
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
      <img src={publication.image.src} alt={publication.image.alt} loading="lazy" width={1000} height={700} />
      {publication.badge && (
        <span className={publication.badge === "Under Review" ? "paper-badge paper-badge-muted" : "paper-badge"}>{publication.badge}</span>
      )}
    </figure>
  ) : null

  return (
    <article className="card flex flex-col gap-5 md:flex-row md:items-start md:gap-7">
      {thumbnail && (
        <div className="w-full max-w-[360px] flex-shrink-0 md:w-[280px]">
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
        <h3 className="text-base font-semibold leading-snug text-primary md:text-lg">
          {primary ? (
            <a href={primary.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent-dark hover:no-underline">
              {publication.title}
            </a>
          ) : (
            publication.title
          )}
        </h3>

        {publication.authors && <Authors authors={publication.authors} />}

        {publication.venue && <p className="mt-1.5 text-sm italic text-gray-500">{renderVenue(publication.venue)}</p>}

        {publication.links && publication.links.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {publication.links.map((link) => (
              <PaperLink key={link.url} link={link} />
            ))}
          </div>
        )}

        {publication.note && <p className="mt-3 text-sm font-medium italic text-[#d2361e]">{publication.note}</p>}
      </div>
    </article>
  )
}
