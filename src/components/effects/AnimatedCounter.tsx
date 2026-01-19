import { useEffect, useRef, useState } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  })

  const display = useTransform(spring, (current) => Math.round(current))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      spring.set(value)
    } else if (isInView && prefersReducedMotion) {
      setDisplayValue(value)
    }
  }, [isInView, value, spring, prefersReducedMotion])

  useEffect(() => {
    if (!prefersReducedMotion) {
      const unsubscribe = display.on("change", (v) => setDisplayValue(v))
      return () => unsubscribe()
    }
  }, [display, prefersReducedMotion])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  )
}
