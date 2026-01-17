import { PageTransition } from "@/components/ui/PageTransition"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { SECTIONS } from "@/data/content"

export function ProjectsPage() {
  const projects = SECTIONS.projects

  return (
    <PageTransition>
      <div>
        <h1 className="section-title">{projects.heading}</h1>
        <p className="section-subtitle">{projects.subheading}</p>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.cards.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
