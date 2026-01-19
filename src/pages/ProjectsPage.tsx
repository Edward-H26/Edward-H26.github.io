import { PageTransition } from "@/components/ui/PageTransition"
import { BentoGrid } from "@/components/ui/BentoGrid"
import { BentoItem } from "@/components/ui/BentoItem"
import { AnimatedSection } from "@/components/effects/AnimatedSection"
import { ExternalLink, Github } from "lucide-react"
import { SECTIONS } from "@/data/content"

export function ProjectsPage() {
  const projects = SECTIONS.projects

  const getColSpan = (index: number): 1 | 2 => {
    if (index === 0) return 2
    return 1
  }

  return (
    <PageTransition>
      <div>
        <AnimatedSection preset="fade-up">
          <h1 className="section-title">{projects.heading}</h1>
          <p className="section-subtitle">{projects.subheading}</p>
        </AnimatedSection>

        <BentoGrid className="lg:grid-cols-2">
          {projects.cards.map((project, index) => {
            const githubLink = project.links?.find((l) => l.label.toLowerCase() === "github")
            const otherLinks = project.links?.filter((l) => l.label.toLowerCase() !== "github") || []
            const colSpan = getColSpan(index)

            return (
              <BentoItem
                key={index}
                colSpan={colSpan}
                rowSpan={index === 0 ? 2 : 1}
                className={index === 0 ? "flex flex-col justify-between" : ""}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <p className="text-sm text-gray-500 mt-1">
                          {project.subtitle}
                        </p>
                      )}
                    </div>
                    {project.date && (
                      <div className="text-xs text-gray-400 flex-shrink-0 bg-gray-100/80 px-2 py-1 rounded-full">
                        {project.date}
                      </div>
                    )}
                  </div>

                  {project.bullets.length > 0 && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {index === 0 ? project.bullets.join(" ") : project.bullets[0]}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {githubLink && (
                    <a
                      href={githubLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Github size={14} />
                      GitHub
                    </a>
                  )}
                  {otherLinks.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
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
    </PageTransition>
  )
}
