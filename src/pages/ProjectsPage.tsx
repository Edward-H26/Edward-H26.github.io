import { BentoGrid } from "@/components/ui/BentoGrid"
import { BentoItem } from "@/components/ui/BentoItem"
import { ContentBullets } from "@/components/ui/ContentBullets"
import { LinkChip } from "@/components/ui/ContentLinks"
import { DateRange } from "@/components/ui/DateRange"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { SECTIONS } from "@/data/content"
import { splitLinksByLabel } from "@/utils/cards"

export function ProjectsPage() {
  const projects = SECTIONS.projects

  return (
    <div>
      <SectionHeader heading={projects.heading} subheading={projects.subheading} />

      <BentoGrid className="lg:grid-cols-2">
        {projects.cards.map((project, index) => {
          const { primary: githubLink, secondary: otherLinks } = splitLinksByLabel(project.links, "github")
          return (
            <BentoItem
              key={index}
              colSpan={index === 0 ? 2 : 1}
              rowSpan={index === 0 ? 2 : 1}
              className="flex flex-col justify-between"
            >
              <div>
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center justify-between gap-4 mt-1">
                    {project.subtitle && (
                      <p className="text-sm text-gray-500">
                        {project.subtitle}
                      </p>
                    )}
                    {project.date && <DateRange date={project.date} className="ml-auto flex-shrink-0" />}
                  </div>
                </div>

                <ContentBullets
                  bullets={project.bullets}
                  className="space-y-2 text-sm text-gray-600 leading-relaxed"
                />
              </div>

              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {githubLink && <LinkChip link={githubLink} />}
                {otherLinks.map((link) => (
                  <LinkChip key={link.url} link={link} />
                ))}
              </div>
            </BentoItem>
          )
        })}
      </BentoGrid>
    </div>
  )
}
