import { useRef, useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  as?: "button" | "a"
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  as = "button",
  href,
  target,
  rel,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const rafRef = useRef<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const [position, setPosition] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || prefersReducedMotion) return

      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength
        const rotateX = deltaY * 0.1
        const rotateY = deltaX * -0.1

        setPosition({ x: deltaX, y: deltaY, rotateX, rotateY })
      })
    },
    [strength, prefersReducedMotion]
  )

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setPosition({ x: 0, y: 0, rotateX: 0, rotateY: 0 })
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (prefersReducedMotion) {
    const StaticComponent = as === "a" ? "a" : "button"
    return (
      <StaticComponent
        className={cn("inline-block", className)}
        onClick={onClick}
        {...(as === "a" && { href, target, rel })}
      >
        {children}
      </StaticComponent>
    )
  }

  const Component = motion[as]

  const props = {
    ref: ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement>,
    className: cn("inline-block", className),
    animate: position,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 0.5,
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    ...(as === "a" && { href, target, rel }),
  }

  return <Component {...props}>{children}</Component>
}
