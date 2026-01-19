import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface HorizontalScrollProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  scrollMultiplier?: number
}

export function HorizontalScroll({
  children,
  className,
  containerClassName,
  scrollMultiplier = 75,
}: HorizontalScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${scrollMultiplier}%`]
  )

  if (prefersReducedMotion) {
    return (
      <section className={cn("overflow-x-auto", containerClassName)}>
        <div className={cn("flex gap-8 px-8", className)}>
          {children}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={targetRef}
      className={cn("relative h-[300vh]", containerClassName)}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          className={cn("flex gap-8 pl-8", className)}
          style={{ x }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}
