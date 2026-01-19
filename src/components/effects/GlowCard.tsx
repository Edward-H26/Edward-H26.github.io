import { useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(59, 130, 246, 0.15)"
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || prefersReducedMotion) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current.style.setProperty("--glow-x", `${x}%`)
    cardRef.current.style.setProperty("--glow-y", `${y}%`)
  }, [prefersReducedMotion])

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.setProperty("--glow-x", "50%")
    cardRef.current.style.setProperty("--glow-y", "50%")
  }, [])

  if (prefersReducedMotion) {
    return (
      <div className={cn("relative", className)}>
        {children}
      </div>
    )
  }

  return (
    <div
      ref={cardRef}
      className={cn("glow-card", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ "--glow-color": glowColor } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
