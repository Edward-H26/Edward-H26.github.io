import { PageTransition } from "@/components/ui/PageTransition"
import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import { SECTIONS, SKILLS_CATEGORIES } from "@/data/content"

export function InfoPage() {
  const info = SECTIONS.info

  const languagesCard = info.cards.find((c) => c.title === "Languages")
  const certificationsCard = info.cards.find((c) => c.title === "Certifications and Honors")
  const educationCard = info.cards.find((c) => c.title === "Education")

  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <h1 className="section-title">{info.heading}</h1>
          <p className="section-subtitle">{info.subheading}</p>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Technical Skills
          </h2>
          <div className="space-y-4">
            {Object.entries(SKILLS_CATEGORIES).map(([category, skills]) => (
              <div key={category}>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index}>{skill}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {languagesCard && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {languagesCard.bullets.map((lang, index) => (
                <Badge key={index} variant="accent">{lang}</Badge>
              ))}
            </div>
          </section>
        )}

        {certificationsCard && (
          <section>
            <Card card={certificationsCard} />
          </section>
        )}

        {educationCard && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Education
            </h2>
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900">
                {educationCard.bullets[0]}
              </h3>
              {educationCard.bullets.slice(1).map((line, index) => (
                <p key={index} className="text-sm text-gray-600 mt-1">
                  {line}
                </p>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  )
}
