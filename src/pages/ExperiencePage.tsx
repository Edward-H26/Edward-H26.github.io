import { Timeline } from "@/components/ui/Timeline"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { SECTIONS } from "@/data/content"

export function ExperiencePage() {
  const experience = SECTIONS.experience

  return (
    <div>
      <SectionHeader heading={experience.heading} subheading={experience.subheading} />
      <Timeline items={experience.cards} />
    </div>
  )
}
