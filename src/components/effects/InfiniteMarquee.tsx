import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface InfiniteMarqueeProps {
  items: string[]
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
  className?: string
  itemClassName?: string
  separator?: React.ReactNode
}

export function InfiniteMarquee({
  items,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className,
  itemClassName,
  separator = <span className="mx-4 text-gray-300">•</span>,
}: InfiniteMarqueeProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={cn("flex flex-wrap gap-4 justify-center", className)}>
        {items.map((item, i) => (
          <span
            key={i}
            className={cn(
              "text-lg font-medium text-gray-600",
              itemClassName
            )}
          >
            {item}
          </span>
        ))}
      </div>
    )
  }

  const duplicatedItems = [...items, ...items]

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "flex items-center animate-marquee",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {duplicatedItems.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span
              className={cn(
                "text-lg font-medium text-gray-600 whitespace-nowrap",
                itemClassName
              )}
            >
              {item}
            </span>
            {i < duplicatedItems.length - 1 && separator}
          </div>
        ))}
      </div>
    </div>
  )
}
