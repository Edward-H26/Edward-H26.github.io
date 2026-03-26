import { PageTransition } from "@/components/ui/PageTransition"
import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import { BentoGrid } from "@/components/ui/BentoGrid"
import { BentoItem } from "@/components/ui/BentoItem"
import { SECTIONS, SKILLS_CATEGORIES, PROFESSIONAL_SKILLS } from "@/data/content"

export function InfoPage() {
  const info = SECTIONS.info

  const languagesCard = info.cards.find((c) => c.title === "Languages")
  const certificationsCard = info.cards.find((c) => c.title === "Certifications and Honors")
  const educationCards = info.cards.filter((c) => c.title === "Education")

  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <h1 className="section-title">{info.heading}</h1>
          <p className="section-subtitle">{info.subheading}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-primary mb-4">
            Technical Skills
          </h2>
          <BentoGrid className="lg:grid-cols-3 auto-rows-auto">
            {Object.entries(SKILLS_CATEGORIES).map(([category, skills], categoryIndex) => (
              <BentoItem
                key={category}
                className="!p-4"
                colSpan={categoryIndex < 2 ? 1 : 1}
              >
                <h3 className="text-sm font-semibold text-blue-800 mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant={PROFESSIONAL_SKILLS.includes(skill) ? "pro" : "default"}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </BentoItem>
            ))}
          </BentoGrid>
        </div>

        {languagesCard && (
          <div>
            <h2 className="text-lg font-semibold text-primary mb-4">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {languagesCard.bullets.map((lang, index) => (
                <Badge key={index} variant="accent">{lang}</Badge>
              ))}
            </div>
          </div>
        )}

        {certificationsCard && (
          <Card card={certificationsCard} />
        )}

        {educationCards.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-primary mb-4">
              Education
            </h2>
            <div className="space-y-4">
              {educationCards.map((eduCard, eduIndex) => (
                <div key={eduIndex} className="card">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {eduCard.bullets[0]}
                  </h3>
                  {eduCard.bullets.slice(1).map((line, index) => (
                    <p key={index} className="text-sm text-gray-600 mt-1">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
