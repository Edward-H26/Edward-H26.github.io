import type { ContentCard } from "@/data"
import { InstitutionLogo } from "@/components/profile/InstitutionLogo"

interface EducationCardProps {
  card: ContentCard
}

/** An Education card of the Info section: the school logo, the school name, then the other lines. */
export function EducationCard({ card }: EducationCardProps) {
  const [school, ...details] = card.bullets

  return (
    <div className="card">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-7">
        <InstitutionLogo school={school} />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{school}</h3>
          {details.map((line, index) => (
            <p key={index} className="text-sm text-gray-600 mt-1">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
