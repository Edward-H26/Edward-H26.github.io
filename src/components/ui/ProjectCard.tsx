import { ExternalLink, Github } from "lucide-react"
import type { ContentCard } from "@/data/content"

interface ProjectCardProps {
  project: ContentCard
}

export function ProjectCard({ project }: ProjectCardProps) {
  const githubLink = project.links?.find((l) => l.label.toLowerCase() === "github")
  const otherLinks = project.links?.filter((l) => l.label.toLowerCase() !== "github") || []

  return (
    <div className="card group">
      <div className="flex items-start justify-between gap-4">
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
          <div className="text-sm text-gray-500 text-right flex-shrink-0">
            {project.date}
          </div>
        )}
      </div>

      {project.bullets.length > 0 && (
        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
          {project.bullets[0]}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        {githubLink && (
          <a
            href={githubLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <Github size={14} />
            GitHub
          </a>
        )}
        {otherLinks.map((link, index) => (
          <a
            key={index}
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
    </div>
  )
}
