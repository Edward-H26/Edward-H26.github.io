import type { ContentCard } from "@/data/content"
import { ContentBullets } from "@/components/ui/ContentBullets"
import { ContentLinks } from "@/components/ui/ContentLinks"
import { isCurrentDateRange } from "@/utils/content"

interface TimelineProps {
  items: ContentCard[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200" />

      <div className="space-y-8">
        {items.map((item, index) => {
          const isPresent = isCurrentDateRange(item.date)

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
                <div className="mb-3">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    {item.location && (
                      <span className="text-sm text-gray-500 flex-shrink-0 text-right">
                        {item.location}
                      </span>
                    )}
                  </div>
                  {(item.subtitle || item.date) && (
                    <div className="flex justify-between items-start gap-4 mt-0.5">
                      {item.subtitle && (
                        <p className="text-sm text-gray-600">
                          {item.subtitle}
                        </p>
                      )}
                      {item.date && (
                        <span className={`text-sm font-medium flex-shrink-0 text-right ${isPresent ? "text-accent-dark" : "text-gray-500"}`}>
                          {item.date}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <ContentBullets bullets={item.bullets} />

                <ContentLinks links={item.links} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
