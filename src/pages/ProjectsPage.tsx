import { BentoGrid } from "@/components/ui/BentoGrid"
import { BentoItem } from "@/components/ui/BentoItem"
import { ContentBullets } from "@/components/ui/ContentBullets"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { ExternalLink, GithubIcon } from "lucide-react"
import { SECTIONS } from "@/data/content"
import { splitLinksByLabel } from "@/utils/content"

export function ProjectsPage() {
  const projects = SECTIONS.projects

  const getColSpan = (index: number): 1 | 2 => {
    if (index === 0) return 2
    return 1
  }

  return (
    <>
      <div>
        <SectionHeader heading={projects.heading} subheading={projects.subheading} />

        <BentoGrid className="lg:grid-cols-2">
          {projects.cards.map((project, index) => {
            const { primary: githubLink, secondary: otherLinks } = splitLinksByLabel(project.links, "github")
            const colSpan = getColSpan(index)

            return (
              <BentoItem
                key={index}
                colSpan={colSpan}
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
                      {project.date && (
                        <div className="text-xs text-gray-400 flex-shrink-0 bg-gray-100/80 px-2 py-1 rounded-full ml-auto">
                          {project.date}
                        </div>
                      )}
                    </div>
                  </div>

                  <ContentBullets
                    bullets={project.bullets}
                    className="space-y-2 text-sm text-gray-600 leading-relaxed"
                  />
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                  {githubLink && (
                    <a
                      href={githubLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-chip bg-gray-900 text-white hover:bg-gray-700"
                    >
                      <GithubIcon size={12} />
                      GitHub
                    </a>
                  )}
                  {otherLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-chip"
                    >
                      {link.label}
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              </BentoItem>
            )
          })}
        </BentoGrid>
      </div>
    </>
  )
}
