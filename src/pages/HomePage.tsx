import { AnnouncementBox } from "@/components/ui/AnnouncementBox"
import { Badge } from "@/components/ui/Badge"
import { RESEARCH_INTERESTS, ANNOUNCEMENT } from "@/data/content"

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
            <p className="m-0">
              I am an undergraduate research assistant in{" "}
              <a href="https://vision.ischool.illinois.edu/index.html" className="font-medium text-blue-500 hover:text-blue-600 hover:no-underline">
                Computer Vision and Machine Learning Group
              </a>{" "}
              at{" "}
              <a href="https://www.illinois.edu/" className="font-medium text-blue-500 hover:text-blue-600 hover:no-underline">
                University of Illinois Urbana-Champaign
              </a>
              . I am also affiliated with the{" "}
              <a href="https://www.ncsa.illinois.edu/" className="font-medium text-blue-500 hover:text-blue-600 hover:no-underline">
                National Center for Supercomputing Applications
              </a>{" "}
              and{" "}
              <a href="https://nairrpilot.org/" className="font-medium text-blue-500 hover:text-blue-600 hover:no-underline">
                National Artificial Intelligence Research Resource Pilot
              </a>
              .
            </p>
            <p className="m-0">
              Previously, I received my B.S. in Data Science and Information
              Science with minors in Computer Science and Statistics at{" "}
              <a href="https://www.illinois.edu/" className="font-medium text-blue-500 hover:text-blue-600 hover:no-underline">
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
    </>
  )
}
