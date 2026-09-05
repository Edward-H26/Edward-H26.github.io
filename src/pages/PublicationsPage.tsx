import { PublicationCard } from "@/components/ui/PublicationCard"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { SECTIONS } from "@/data/content"

export function PublicationsPage() {
  const publications = SECTIONS.publications

  return (
    <div>
      <SectionHeader heading={publications.heading} subheading={publications.subheading} />

      <div className="space-y-5">
        {publications.cards.map((publication) => (
          <PublicationCard key={publication.title} publication={publication} />
        ))}
      </div>
    </div>
  )
}
