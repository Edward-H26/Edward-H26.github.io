import type { ContentCard } from "@/data"
import { ContentBullets } from "@/components/ui/ContentBullets"
import { ContentLinks } from "@/components/ui/ContentLinks"
import { DateRange } from "@/components/ui/DateRange"

interface TimelineCardProps {
  item: ContentCard
}

/** The card of one timeline entry: title and place on the first row, role and dates on the second. */
export function TimelineCard({ item }: TimelineCardProps) {
  return (
    <div className="card">
      <div className="mb-3">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          {item.location && <span className="text-sm text-gray-500 flex-shrink-0 text-right">{item.location}</span>}
        </div>
        {(item.subtitle || item.date) && (
          <div className="flex justify-between items-start gap-4 mt-0.5">
            {item.subtitle && <p className="text-sm text-gray-600">{item.subtitle}</p>}
            {item.date && <DateRange date={item.date} className="flex-shrink-0 text-right" />}
          </div>
        )}
      </div>

      <ContentBullets bullets={item.bullets} />

      <ContentLinks links={item.links} />
    </div>
  )
}
