import { useRef } from "react"
import { motion, useScroll, useTransform, type Variants } from "framer-motion"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

type AnimationPreset = "fade-up" | "fade-left" | "fade-right" | "scale" | "blur" | "scrub"

interface AnimatedSectionProps {
  children: React.ReactNode
  preset?: AnimationPreset
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  rootMargin?: string
}

const presetVariants: Record<Exclude<AnimationPreset, "scrub">, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, scale: 0.98, y: 8 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
}

function ScrollScrubSection({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"]
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [40, 0])

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedSection({
  children,
  preset = "fade-up",
  delay = 0,
  duration = 0.4,
  className,
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, rootMargin })
  const prefersReducedMotion = useReducedMotion()

  if (preset === "scrub") {
    return (
      <ScrollScrubSection className={className}>
        {children}
      </ScrollScrubSection>
    )
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={presetVariants[preset]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
