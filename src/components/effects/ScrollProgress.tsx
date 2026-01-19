import { motion, useScroll, useSpring } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  if (prefersReducedMotion) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-primary to-accent/50 origin-top z-[60]"
      style={{ scaleY }}
    />
  )
}
