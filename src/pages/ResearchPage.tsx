import { Card } from "@/components/ui/Card"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { SECTIONS } from "@/data/content"

export function ResearchPage() {
  const research = SECTIONS.research

  return (
    <div>
      <SectionHeader heading={research.heading} subheading={research.subheading} />

      <div className="space-y-6">
        {research.cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  )
}
