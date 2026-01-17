import { PageTransition } from "@/components/ui/PageTransition"
import { AnnouncementBox } from "@/components/ui/AnnouncementBox"
import { Badge } from "@/components/ui/Badge"
import { BIO, RESEARCH_INTERESTS, ANNOUNCEMENT } from "@/data/content"

export function HomePage() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <section>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {BIO}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Research Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {RESEARCH_INTERESTS.map((interest, index) => (
              <Badge key={index} variant="accent">
                {interest}
              </Badge>
            ))}
          </div>
        </section>

        <section>
          <AnnouncementBox text={ANNOUNCEMENT.text} />
        </section>
      </div>
    </PageTransition>
  )
}
