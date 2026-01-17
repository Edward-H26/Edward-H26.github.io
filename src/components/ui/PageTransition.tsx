import { motion } from "framer-motion"

interface PageTransitionProps {
  children: React.ReactNode
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

const pageTransition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.3,
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}
