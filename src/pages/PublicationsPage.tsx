import { motion } from "framer-motion"
import { PageTransition } from "@/components/ui/PageTransition"
import { PublicationCard } from "@/components/ui/PublicationCard"
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

export function PublicationsPage() {
  const publications = SECTIONS.publications

  return (
    <PageTransition>
      <div>
        <AnimatedSection preset="fade-up">
          <h1 className="section-title">{publications.heading}</h1>
          <p className="section-subtitle">{publications.subheading}</p>
        </AnimatedSection>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {publications.cards.map((publication, index) => (
            <motion.div key={index} variants={itemVariants}>
              <PublicationCard publication={publication} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  )
}
