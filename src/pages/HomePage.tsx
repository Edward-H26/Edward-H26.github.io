import { AnnouncementBox } from "@/components/ui/AnnouncementBox"
import { Badge } from "@/components/ui/Badge"
import { RichText } from "@/components/ui/RichText"
import { HOME_BIO, RESEARCH_INTERESTS, ANNOUNCEMENT } from "@/data/content"

export function HomePage() {
  return (
    <>
      <div className="space-y-8">
        <section>
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900 block">
              Advancing Human-Centered Intelligence
            </span>
          </div>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
            {HOME_BIO.map((segments, index) => (
              <RichText key={index} segments={segments} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
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
    </>
  )
}
