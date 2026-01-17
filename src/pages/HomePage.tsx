import { PageTransition } from "@/components/ui/PageTransition"
import { AnnouncementBox } from "@/components/ui/AnnouncementBox"
import { Badge } from "@/components/ui/Badge"
import { RESEARCH_INTERESTS, ANNOUNCEMENT } from "@/data/content"

export function HomePage() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <section>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
            <p className="m-0">
              I am an undergraduate research assistant in{" "}
              <a href="https://vision.ischool.illinois.edu/index.html">
                Computer Vision and Machine Learning Group
              </a>{" "}
              at{" "}
              <a href="https://www.illinois.edu/">
                University of Illinois Urbana-Champaign
              </a>
              . I am also affiliated with the{" "}
              <a href="https://www.ncsa.illinois.edu/">
                National Center for Supercomputing Applications
              </a>{" "}
              and{" "}
              <a href="https://nairrpilot.org/">
                National Artificial Intelligence Research Resource Pilot
              </a>
              .
            </p>
            <p className="m-0">
              Previously, I received my B.S. in Data Science and Information
              Science at{" "}
              <a href="https://www.illinois.edu/">
                University of Illinois Urbana-Champaign
              </a>
              .
            </p>
            <p className="m-0">
              I am an applied AI researcher and full-stack software engineer
              working at the intersection of multi-agent systems and computer
              vision to build AI that understands, reasons, and coordinates
              actions in complex visual environments. My research interests
              include self-evolving multi-agent architectures, context-aware
              memory systems, multimodal AI reasoning abilities, novel human-AI
              interfaces, generative world models, spatial intelligence, and
              evaluation for agentic systems.
            </p>
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
    </PageTransition>
  )
}
