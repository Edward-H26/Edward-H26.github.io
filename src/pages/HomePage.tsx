import { motion } from "framer-motion"
import { PageTransition } from "@/components/ui/PageTransition"
import { AnnouncementBox } from "@/components/ui/AnnouncementBox"
import { Badge } from "@/components/ui/Badge"
import { TextReveal } from "@/components/effects/TextReveal"
import { RESEARCH_INTERESTS, ANNOUNCEMENT } from "@/data/content"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export function HomePage() {
  return (
    <PageTransition>
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section variants={itemVariants}>
          <div className="mb-6">
            <TextReveal
              text="Advancing Human-Centered Intelligence"
              variant="word"
              className="text-3xl font-bold text-gray-900 block"
              staggerDelay={0.08}
            />
            <motion.span
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="block h-1.5 rounded-full mt-3 max-w-sm origin-left relative hero-underline"
            />
          </div>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
            <motion.p variants={itemVariants} className="m-0">
              I am an undergraduate research assistant in{" "}
              <a href="https://vision.ischool.illinois.edu/index.html" className="font-medium hover:no-underline">
                Computer Vision and Machine Learning Group
              </a>{" "}
              at{" "}
              <a href="https://www.illinois.edu/" className="font-medium hover:no-underline">
                University of Illinois Urbana-Champaign
              </a>
              . I am also affiliated with the{" "}
              <a href="https://www.ncsa.illinois.edu/" className="font-medium hover:no-underline">
                National Center for Supercomputing Applications
              </a>{" "}
              and{" "}
              <a href="https://nairrpilot.org/" className="font-medium hover:no-underline">
                National Artificial Intelligence Research Resource Pilot
              </a>
              .
            </motion.p>
            <motion.p variants={itemVariants} className="m-0">
              Previously, I received my B.S. in Data Science and Information
              Science at{" "}
              <a href="https://www.illinois.edu/" className="font-medium hover:no-underline">
                University of Illinois Urbana-Champaign
              </a>
              .
            </motion.p>
            <motion.p variants={itemVariants} className="m-0">
              I am an applied AI researcher and full-stack software engineer
              working at the intersection of multi-agent systems and computer
              vision to build AI that understands, reasons, and coordinates
              actions in complex visual environments. My research interests
              include self-evolving multi-agent architectures, context-aware
              memory systems, multimodal AI reasoning abilities, novel human-AI
              interfaces, generative world models, spatial intelligence, and
              evaluation for agentic systems.
            </motion.p>
          </div>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Research Interests
          </h2>
          <motion.div
            className="flex flex-wrap gap-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {RESEARCH_INTERESTS.map((interest, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Badge variant="accent">
                  {interest}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section variants={itemVariants}>
          <AnnouncementBox text={ANNOUNCEMENT.text} />
        </motion.section>
      </motion.div>
    </PageTransition>
  )
}
