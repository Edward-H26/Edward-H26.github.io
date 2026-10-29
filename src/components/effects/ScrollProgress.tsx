import { motion, useScroll, useSpring } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { SCROLL_SPRING } from "@/utils/motion"

/** Thin bar on the right edge that fills with the page's scroll progress; absent under reduced motion. */
export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, SCROLL_SPRING)

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
