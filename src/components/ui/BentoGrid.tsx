import { cn } from "@/utils/cn"

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

/** Responsive grid for BentoItem cards; the caller can override the column classes. */
export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]", className)}>{children}</div>
  )
}
