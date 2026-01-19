import { motion } from "framer-motion"
import { PageTransition } from "@/components/ui/PageTransition"
import { Card } from "@/components/ui/Card"
import { AnimatedSection } from "@/components/effects/AnimatedSection"
import { SECTIONS } from "@/data/content"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export function ResearchPage() {
  const research = SECTIONS.research

  return (
    <PageTransition>
      <div>
        <AnimatedSection preset="fade-up">
          <h1 className="section-title">{research.heading}</h1>
          <p className="section-subtitle">{research.subheading}</p>
        </AnimatedSection>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {research.cards.map((card, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card card={card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  )
}
