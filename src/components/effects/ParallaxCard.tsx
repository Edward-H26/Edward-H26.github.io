import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface ParallaxCardProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down"
}

export function ParallaxCard({
  children,
  className,
  speed = 0.5,
  direction = "up",
}: ParallaxCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const yRange = direction === "up"
    ? [100 * speed, -100 * speed]
    : [-100 * speed, 100 * speed]

  const y = useTransform(scrollYProgress, [0, 1], yRange)

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={cn("overflow-hidden", className)}>
        {children}
      </div>
    )
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}
