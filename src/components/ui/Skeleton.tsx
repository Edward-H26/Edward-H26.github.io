import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface SkeletonProps {
  className?: string
  variant?: "text" | "circular" | "rectangular"
  width?: string | number
  height?: string | number
  animation?: "pulse" | "wave" | "none"
}

export function Skeleton({
  className,
  variant = "rectangular",
  width,
  height,
  animation = "pulse",
}: SkeletonProps) {
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = !prefersReducedMotion && animation !== "none"

  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  }

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "skeleton-wave",
    none: "",
  }

  return (
    <div
      className={cn(
        "bg-gray-200/80",
        variantClasses[variant],
        shouldAnimate && animationClasses[animation],
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  )
}

interface SkeletonTextProps {
  lines?: number
  className?: string
  lastLineWidth?: string
}

export function SkeletonText({
  lines = 3,
  className,
  lastLineWidth = "60%",
}: SkeletonTextProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height={16}
          width={i === lines - 1 ? lastLineWidth : "100%"}
        />
      ))}
    </div>
  )
}

interface SkeletonCardProps {
  className?: string
  hasImage?: boolean
}

export function SkeletonCard({ className, hasImage = true }: SkeletonCardProps) {
  return (
    <div className={cn("glass rounded-xl p-4 space-y-4", className)}>
      {hasImage && <Skeleton className="w-full h-48" />}
      <Skeleton variant="text" height={24} className="w-3/4" />
      <SkeletonText lines={2} />
      <div className="flex gap-2">
        <Skeleton height={32} className="w-20" />
        <Skeleton height={32} className="w-20" />
      </div>
    </div>
  )
}
