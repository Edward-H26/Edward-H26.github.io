import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useSpring } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface SpotlightCursorProps {
  size?: number
  color?: string
  opacity?: number
}

export function SpotlightCursor({
  size = 400,
  color = "rgba(59, 130, 246, 0.08)",
  opacity = 1,
}: SpotlightCursorProps) {
  const prefersReducedMotion = useReducedMotion()
  const rafRef = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    )
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion || isTouchDevice) return

      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      rafRef.current = requestAnimationFrame(() => {
        x.set(e.clientX - size / 2)
        y.set(e.clientY - size / 2)
      })
    },
    [x, y, size, prefersReducedMotion, isTouchDevice]
  )

  const handleMouseEnter = useCallback(() => {
    if (!prefersReducedMotion && !isTouchDevice) setIsVisible(true)
  }, [prefersReducedMotion, isTouchDevice])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || isTouchDevice) return

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseenter", handleMouseEnter)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, prefersReducedMotion, isTouchDevice])

  if (prefersReducedMotion || isTouchDevice) {
    return null
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        x,
        y,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: isVisible ? opacity : 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? opacity : 0 }}
      transition={{ duration: 0.3 }}
    />
  )
}
