import { ExternalLink } from "lucide-react"
import type { ContentCard } from "@/data/content"

interface TimelineProps {
  items: ContentCard[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200" />

      <div className="space-y-8">
        {items.map((item, index) => {
          const isPresent = item.date?.includes("Present")

          return (
            <div key={index} className="relative pl-12">
              <div
                className={`absolute left-2.5 top-2 w-3 h-3 rounded-full border-2 ${
                  isPresent
                    ? "bg-accent border-accent animate-pulse-slow"
                    : "bg-white border-gray-300"
                }`}
              />

              <div className="card">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-sm text-accent-dark mt-0.5">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                  {(item.location || item.date) && (
                    <div className="text-sm text-gray-500 text-right flex-shrink-0">
                      {item.location && <div>{item.location}</div>}
                      {item.date && (
                        <div className={`font-medium ${isPresent ? "text-accent-dark" : ""}`}>
                          {item.date}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {item.bullets.length > 0 && (
                  <ul className="space-y-2 text-sm text-gray-600">
                    {item.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex gap-2">
                        <span className="text-accent-dark mt-1.5 flex-shrink-0">
                          &bull;
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {item.links && item.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.links.map((link, linkIndex) => (
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
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
