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
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
        {project.title}
      </h3>

      {project.subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {project.subtitle}
        </p>
      )}

      {project.bullets.length > 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
          {project.bullets[0]}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        {githubLink && (
          <a
            href={githubLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
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
