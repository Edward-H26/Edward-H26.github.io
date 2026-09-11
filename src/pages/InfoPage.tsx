import { useEffect, useRef, useState } from "react"
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

// Chip widths vary, so a collapsed category is capped by height rather than by count; that keeps
// every card the same size no matter how long its skill names are.
const COLLAPSED_CAP = 240

// The cap has to land on a row boundary, or it slices the last row of chips in half. Highlighted
// chips are two pixels taller than plain ones, so a row is keyed by its top and measured by the
// lowest chip in it, and the bottom is rounded up so no chip loses a sub-pixel.
function lastRowBottomWithin(list: HTMLElement, cap: number) {
  const top = list.getBoundingClientRect().top
  const rowBottoms = new Map<number, number>()
  for (const chip of Array.from(list.children)) {
    const box = chip.getBoundingClientRect()
    const row = Math.round(box.top - top)
    rowBottoms.set(row, Math.max(rowBottoms.get(row) ?? 0, Math.ceil(box.bottom - top)))
  }
  const bottoms = [...rowBottoms.values()].sort((a, b) => a - b)
  if (bottoms.length === 0 || bottoms[bottoms.length - 1] <= cap) return null
  return bottoms.filter((bottom) => bottom <= cap).pop() ?? bottoms[0]
}

function SkillCategory({ category, skills }: { category: string; skills: readonly string[] }) {
  const [expanded, setExpanded] = useState(false)
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null)
  const list = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = list.current
    const card = element?.parentElement
    if (!element || !card) return
    const measure = () => setCollapsedHeight(lastRowBottomWithin(element, COLLAPSED_CAP))
    measure()
    // Chip heights shift once the web font replaces the fallback, which moves the row boundary.
    document.fonts.ready.then(measure)
    // The card's width decides how the chips wrap, so re-measure when it changes.
    const observer = new ResizeObserver(measure)
    observer.observe(card)
    return () => observer.disconnect()
  }, [skills])

  const collapsed = !expanded && collapsedHeight !== null

  return (
    <BentoItem className="!p-4">
      <h3 className="text-sm font-semibold text-blue-800 mb-3">{category}</h3>
      <div
        ref={list}
        className="flex flex-wrap gap-1.5"
        style={collapsed ? { height: collapsedHeight, overflow: "hidden" } : undefined}
      >
        {strengthsFirst(skills).map((skill) => (
          <Badge key={skill} variant={PROFESSIONAL_SKILLS.includes(skill) ? "pro" : "default"}>
            {skill}
          </Badge>
        ))}
      </div>
      {collapsedHeight !== null && (
        <button
          type="button"
          onClick={() => setExpanded((wasExpanded) => !wasExpanded)}
          aria-expanded={expanded}
          className="mt-3 flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-accent-dark"
        >
          {expanded ? "Show less" : "Show more"}
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
    </div>
  )
}
