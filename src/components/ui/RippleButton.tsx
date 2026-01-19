import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Ripple {
  id: number
  x: number
  y: number
}

interface RippleButtonProps {
  children: React.ReactNode
  className?: string
  rippleColor?: string
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export function RippleButton({
  children,
  className,
  rippleColor = "rgba(255, 255, 255, 0.4)",
  onClick,
  disabled = false,
  type = "button",
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return

      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()

      setRipples((prev) => [...prev, { id, x, y }])

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
      }, 600)

      onClick?.()
    },
    [disabled, onClick]
  )

  return (
    <button
      type={type}
      className={cn(
        "relative overflow-hidden",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      disabled={disabled}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: rippleColor,
            }}
            initial={{ width: 0, height: 0, opacity: 0.5, x: "-50%", y: "-50%" }}
            animate={{ width: 500, height: 500, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </button>
  )
}
