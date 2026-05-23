import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import { BentoGrid } from "@/components/ui/BentoGrid"
import { BentoItem } from "@/components/ui/BentoItem"
import { InstitutionLogo } from "@/components/ui/InstitutionLogo"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { SECTIONS, SKILLS_CATEGORIES, PROFESSIONAL_SKILLS } from "@/data/content"
import { getCardsByTitle, getFirstCardByTitle } from "@/utils/content"

type EducationLogoProps = {
  school: string
}

function EducationLogo({ school }: EducationLogoProps) {
  return <InstitutionLogo school={school} />
}

export function InfoPage() {
  const info = SECTIONS.info

  const languagesCard = getFirstCardByTitle(info.cards, "Languages")
  const certificationsCard = getFirstCardByTitle(info.cards, "Certifications and Honors")
  const educationCards = getCardsByTitle(info.cards, "Education")

  return (
    <>
      <div className="space-y-8">
        <div>
          <SectionHeader heading={info.heading} subheading={info.subheading} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-primary mb-4">
            Technical Skills
          </h2>
          <BentoGrid className="lg:grid-cols-2 xl:grid-cols-3 auto-rows-auto">
            {Object.entries(SKILLS_CATEGORIES).map(([category, skills]) => (
              <BentoItem
                key={category}
                className="!p-4"
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
              {educationCards.map((eduCard, eduIndex) => {
                return (
                  <div key={eduIndex} className="card">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-7">
                      <EducationLogo school={eduCard.bullets[0]} />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {eduCard.bullets[0]}
                        </h3>
	                        {eduCard.bullets.slice(1).map((line, index) => (
	                          line.startsWith("Core Courses:") ? (
	                            <details key={index} className="mt-2 text-sm text-gray-600">
	                              <summary className="cursor-pointer font-medium text-gray-700">
	                                Core Courses
	                              </summary>
	                              <p className="mt-1 leading-relaxed">
	                                {line.replace("Core Courses: ", "")}
	                              </p>
	                            </details>
	                          ) : (
	                            <p key={index} className="text-sm text-gray-600 mt-1">
	                              {line}
	                            </p>
	                          )
	                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
