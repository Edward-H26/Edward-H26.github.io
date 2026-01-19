import { useRef } from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/useReducedMotion"

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

const presetVariants: Record<AnimationPreset, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 }
  },
  "fade-left": {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 }
  },
  "fade-right": {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: { opacity: 1, filter: "blur(0px)" }
  },
  scrub: {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0 }
  }
}

export function AnimatedSection({
  children,
  preset = "fade-up",
  delay = 0,
  duration = 0.4,
  className,
  threshold = 0.2,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      variants={presetVariants[preset]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
