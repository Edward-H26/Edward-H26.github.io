import type { ContentCard } from "@/data/content"

interface PublicationCardProps {
  publication: ContentCard
  index: number
}

export function PublicationCard({ publication, index }: PublicationCardProps) {
  const isSubmitted = publication.bullets[0]?.toLowerCase().includes("submitted")

  return (
    <div className="card">
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            isSubmitted
              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
              : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
          }`}
        >
          {index + 1}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {publication.title}
            </h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                isSubmitted
                  ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                  : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
              }`}
            >
              {isSubmitted ? "Submitted" : "Published"}
            </span>
          </div>

          {publication.bullets.map((citation, citationIndex) => (
            <p key={citationIndex} className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {citation}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
