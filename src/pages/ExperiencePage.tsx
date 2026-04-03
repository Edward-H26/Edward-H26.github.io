import { Timeline } from "@/components/ui/Timeline"
import { SECTIONS } from "@/data/content"

export function ExperiencePage() {
  const experience = SECTIONS.experience

  return (
    <>
      <div>
        <h1 className="section-title">{experience.heading}</h1>
        <p className="section-subtitle">{experience.subheading}</p>
        <Timeline items={experience.cards} />
      </div>
    </>
  )
}
