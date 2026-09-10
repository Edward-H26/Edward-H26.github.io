import { Card } from "@/components/ui/Card"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { SECTIONS } from "@/data/content"

// Renders any content section as a stack of cards, for the sections with no bespoke layout.
export function SectionPage({ id }: { id: string }) {
  const section = SECTIONS[id]

  return (
    <div>
      <SectionHeader heading={section.heading} subheading={section.subheading} />

      <div className="space-y-6">
        {section.cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  )
}
