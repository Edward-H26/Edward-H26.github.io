import { PublicationCard } from "@/components/ui/PublicationCard"
import { SECTIONS } from "@/data/content"

export function PublicationsPage() {
  const publications = SECTIONS.publications

  return (
    <>
      <div>
        <h1 className="section-title">{publications.heading}</h1>
        <p className="section-subtitle">{publications.subheading}</p>

        <div className="space-y-4">
          {publications.cards.map((publication, index) => (
            <PublicationCard key={index} publication={publication} index={index} />
          ))}
        </div>
      </div>
    </>
  )
}
