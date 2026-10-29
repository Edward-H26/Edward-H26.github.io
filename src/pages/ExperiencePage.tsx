import { Timeline } from "@/components/experience/Timeline"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { SECTIONS } from "@/data"

/** Experience: the professional roles on the scroll-driven Timeline. */
export function ExperiencePage() {
  const experience = SECTIONS.experience

  return (
    <div>
      <SectionHeader heading={experience.heading} subheading={experience.subheading} />
      <Timeline items={experience.cards} />
    </div>
  )
}
