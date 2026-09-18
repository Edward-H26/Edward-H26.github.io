import { useLayoutEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { Rocket } from "lucide-react"
import type { ContentCard } from "@/data/content"
import { ContentBullets } from "@/components/ui/ContentBullets"
import { ContentLinks } from "@/components/ui/ContentLinks"
import { DateRange } from "@/components/ui/DateRange"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { isCurrentDateRange } from "@/utils/cards"

interface TimelineProps {
  items: ContentCard[]
}

// The line is 2px wide at left 15px and the dots are 12px wide at left 10px, so both centre on x = 16px.
const LINE_CLASS = "absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-200"

export function Timeline({ items }: TimelineProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [lineHeight, setLineHeight] = useState(0)

  useLayoutEffect(() => {
    const line = lineRef.current
    if (!line) return
    const measure = () => setLineHeight(line.getBoundingClientRect().height)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(line)
    return () => observer.disconnect()
  }, [])

  // The rocket sits where the viewport's 65% mark crosses the timeline, like the Memoria pilot section.
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.65", "end 0.65"] })
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const rocketY = useTransform(progress, [0, 1], [0, lineHeight])

  return (
    <div ref={containerRef} className="relative">
      <div ref={lineRef} className={LINE_CLASS}>
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-accent to-accent/60"
            style={{ scaleY: progress }}
          />
        )}
      </div>

      {!prefersReducedMotion && (
        <motion.div aria-hidden className="pointer-events-none absolute left-4 top-2 z-10" style={{ y: rocketY, x: "-50%" }}>
          <span className="relative block -translate-y-1/2">
            <span className="absolute left-1/2 -top-3 h-7 w-7 -translate-x-1/2 rounded-full bg-accent/35 blur-md" />
            <Rocket className="relative h-5 w-5 rotate-[135deg] text-accent" strokeWidth={2} fill="white" />
          </span>
        </motion.div>
      )}

      <div className="space-y-8">
        {items.map((item, index) => {
          const isPresent = isCurrentDateRange(item.date)

          return (
            <div key={index} className="relative pl-12">
              <div
                className={`absolute left-2.5 top-2 w-3 h-3 rounded-full border-2 ${
                  isPresent
                    ? "bg-accent border-accent animate-pulse-slow"
                    : "bg-white border-gray-300"
                }`}
              />

              <div className="card">
                <div className="mb-3">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    {item.location && (
                      <span className="text-sm text-gray-500 flex-shrink-0 text-right">
                        {item.location}
                      </span>
                    )}
                  </div>
                  {(item.subtitle || item.date) && (
                    <div className="flex justify-between items-start gap-4 mt-0.5">
                      {item.subtitle && (
                        <p className="text-sm text-gray-600">
                          {item.subtitle}
                        </p>
                      )}
                      {item.date && <DateRange date={item.date} className="flex-shrink-0 text-right" />}
                    </div>
                  )}
                </div>

                <ContentBullets bullets={item.bullets} />

                <ContentLinks links={item.links} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
