import { useRef, useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  scale?: number
  perspective?: number
}

export function TiltCard({
  children,
  className,
  maxTilt = 8,
  scale = 1.02,
  perspective = 1000,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  })
  const [shine, setShine] = useState({ x: 50, y: 50 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || prefersReducedMotion) return

      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const mouseX = e.clientX - centerX
        const mouseY = e.clientY - centerY

        const rotateX = (mouseY / (rect.height / 2)) * -maxTilt
        const rotateY = (mouseX / (rect.width / 2)) * maxTilt

        const shineX = ((e.clientX - rect.left) / rect.width) * 100
        const shineY = ((e.clientY - rect.top) / rect.height) * 100

        setTransform({ rotateX, rotateY, scale })
        setShine({ x: shineX, y: shineY })
      })
    },
    [maxTilt, scale, prefersReducedMotion]
  )

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 })
    setShine({ x: 50, y: 50 })
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (prefersReducedMotion) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ perspective }}
      animate={transform}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
        }}
      />
      {children}
    </motion.div>
  )
}
