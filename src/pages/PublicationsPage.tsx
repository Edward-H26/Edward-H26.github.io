import { PublicationCard } from "@/components/ui/PublicationCard"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { SECTIONS } from "@/data/content"

export function PublicationsPage() {
  const publications = SECTIONS.publications

  return (
    <div>
      <SectionHeader heading={publications.heading} subheading={publications.subheading} />

      <div className="space-y-4">
        {publications.cards.map((publication, index) => (
          <PublicationCard key={index} publication={publication} index={index} />
        ))}
      </div>
    </div>
  )
}
