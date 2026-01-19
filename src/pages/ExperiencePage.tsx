import { PageTransition } from "@/components/ui/PageTransition"
import { Timeline } from "@/components/ui/Timeline"
import { AnimatedSection } from "@/components/effects/AnimatedSection"
import { SECTIONS } from "@/data/content"

export function ExperiencePage() {
  const experience = SECTIONS.experience

  return (
    <PageTransition>
      <div>
        <AnimatedSection preset="fade-up">
          <h1 className="section-title">{experience.heading}</h1>
          <p className="section-subtitle">{experience.subheading}</p>
        </AnimatedSection>

        <AnimatedSection preset="fade-up" delay={0.1}>
          <Timeline items={experience.cards} />
        </AnimatedSection>
      </div>
    </PageTransition>
  )
}
