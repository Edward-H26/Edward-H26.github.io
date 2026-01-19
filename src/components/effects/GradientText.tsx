import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/useReducedMotion"

type GradientVariant = "default" | "shimmer" | "subtle"

interface GradientTextProps {
  children: React.ReactNode
  animate?: boolean
  variant?: GradientVariant
  className?: string
  from?: string
  via?: string
  to?: string
}

export function GradientText({
  children,
  animate = true,
  variant = "default",
  className,
  from = "from-blue-500",
  via = "via-purple-500",
  to = "to-pink-500",
}: GradientTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = animate && !prefersReducedMotion

  if (variant === "shimmer") {
    return (
      <span
        className={cn(
          shouldAnimate ? "text-shimmer" : "text-gradient-subtle",
          className
        )}
      >
        {children}
      </span>
    )
  }

  if (variant === "subtle") {
    return (
      <span className={cn("text-gradient-subtle", className)}>
        {children}
      </span>
    )
  }

  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        from,
        via,
        to,
        shouldAnimate && "animate-gradient-x bg-[length:200%_auto]",
        className
      )}
    >
      {children}
    </span>
  )
}
