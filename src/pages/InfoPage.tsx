import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import { BentoGrid } from "@/components/ui/BentoGrid"
import { EducationCard } from "@/components/info/EducationCard"
import { SkillCategory } from "@/components/info/SkillCategory"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { SECTIONS, SKILLS_CATEGORIES } from "@/data"
import { getCardsByTitle, getFirstCardByTitle } from "@/utils/cards"

/** The Info page: skill categories, certifications, education, and languages. */
export function InfoPage() {
  const info = SECTIONS.info

  const languagesCard = getFirstCardByTitle(info.cards, "Languages")
  const certificationsCard = getFirstCardByTitle(info.cards, "Certifications and Honors")
  const educationCards = getCardsByTitle(info.cards, "Education")

  return (
    <div className="space-y-8">
      <div>
        <SectionHeader heading={info.heading} subheading={info.subheading} />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-primary mb-4">Technical Skills</h2>
        <BentoGrid className="lg:grid-cols-2 xl:grid-cols-3 auto-rows-auto">
          {Object.entries(SKILLS_CATEGORIES).map(([category, skills]) => (
            <SkillCategory key={category} category={category} skills={skills} />
          ))}
        </BentoGrid>
      </div>

      {certificationsCard && <Card card={certificationsCard} />}

      {educationCards.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-primary mb-4">Education</h2>
          <div className="space-y-4">
            {educationCards.map((eduCard, eduIndex) => (
              <EducationCard key={eduIndex} card={eduCard} />
            ))}
          </div>
        </div>
      )}

      {languagesCard && (
        <div>
          <h2 className="text-lg font-semibold text-primary mb-4">Languages</h2>
          <div className="flex flex-wrap gap-2">
            {languagesCard.bullets.map((lang, index) => (
              <Badge key={index} variant="accent">
                {lang}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
