import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import { BentoGrid } from "@/components/ui/BentoGrid"
import { BentoItem } from "@/components/ui/BentoItem"
import { InstitutionLogo } from "@/components/ui/InstitutionLogo"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { SECTIONS, SKILLS_CATEGORIES, PROFESSIONAL_SKILLS } from "@/data/content"
import { getCardsByTitle, getFirstCardByTitle } from "@/utils/cards"

// Highlighted skills lead each category; the sort is stable, so the rest keep their CV order.
const strengthsFirst = (skills: readonly string[]) =>
  [...skills].sort((a, b) => Number(PROFESSIONAL_SKILLS.includes(b)) - Number(PROFESSIONAL_SKILLS.includes(a)))

// Long categories collapse to this many chips so every card starts at a similar height.
const COLLAPSED_SKILLS = 13

function SkillCategory({ category, skills }: { category: string; skills: readonly string[] }) {
  const [expanded, setExpanded] = useState(false)
  const ordered = strengthsFirst(skills)
  const shown = expanded ? ordered : ordered.slice(0, COLLAPSED_SKILLS)
  const hidden = ordered.length - shown.length

  return (
    <BentoItem className="!p-4">
      <h3 className="text-sm font-semibold text-blue-800 mb-3">{category}</h3>
      <div className="flex flex-wrap gap-1.5">
        {shown.map((skill) => (
          <Badge key={skill} variant={PROFESSIONAL_SKILLS.includes(skill) ? "pro" : "default"}>
            {skill}
          </Badge>
        ))}
      </div>
      {(hidden > 0 || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((wasExpanded) => !wasExpanded)}
          aria-expanded={expanded}
          className="mt-3 flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-accent-dark"
        >
          {expanded ? "Show less" : `${hidden} more`}
          <ChevronDown size={14} className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </BentoItem>
  )
}

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
        <h2 className="text-lg font-semibold text-primary mb-4">
          Technical Skills
        </h2>
        <BentoGrid className="lg:grid-cols-2 xl:grid-cols-3 auto-rows-auto">
          {Object.entries(SKILLS_CATEGORIES).map(([category, skills]) => (
            <SkillCategory key={category} category={category} skills={skills} />
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
                    <InstitutionLogo school={eduCard.bullets[0]} />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {eduCard.bullets[0]}
                      </h3>
                      {eduCard.bullets.slice(1).map((line, index) => (
                        <p key={index} className="text-sm text-gray-600 mt-1">
                          {line}
                        </p>
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
  )
}
