import { PageTransition } from "@/components/ui/PageTransition"
import { Card } from "@/components/ui/Card"
import { SECTIONS } from "@/data/content"

export function ResearchPage() {
  const research = SECTIONS.research

  return (
    <PageTransition>
      <div>
        <h1 className="section-title">{research.heading}</h1>
        <p className="section-subtitle">{research.subheading}</p>

        <div className="space-y-6">
          {research.cards.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
