import { cn } from "@/lib/utils"

type AnimationPreset = "fade-up" | "fade-left" | "fade-right" | "scale" | "blur" | "scrub"

interface AnimatedSectionProps {
  children: React.ReactNode
  preset?: AnimationPreset
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  rootMargin?: string
}

export function AnimatedSection({
  children,
  className,
}: AnimatedSectionProps) {
  return <div className={cn(className)}>{children}</div>
}
