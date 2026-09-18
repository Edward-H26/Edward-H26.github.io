import { useLayoutEffect, useRef, useState, type CSSProperties } from "react"
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"
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

// Each dot is 12px wide at left 10px and top 8px inside its item, so its centre sits 14px below the
// item's top edge and 16px from the left, where the 2px line at left 15px also centres.
const DOT_CENTER = 14
const SPARKS = ["-7px", "6px", "-2px"]

export function Timeline({ items }: TimelineProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [stops, setStops] = useState<number[]>([])
  const [endFraction, setEndFraction] = useState(0.65)
  const [passed, setPassed] = useState(0)

  // Dot centres measured from the container top, re-measured whenever the cards or the page reflow.
  // On a short page the last dot never reaches the viewport's 65% mark, so the end offset stretches
  // down to wherever that dot sits when the page is scrolled to the bottom.
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    const measure = () => {
      const centres = itemRefs.current.flatMap((item) => (item ? [item.offsetTop + DOT_CENTER] : []))
      setStops((previous) => (previous.join() === centres.join() ? previous : centres))
      if (centres.length === 0) return
      const containerTop = container.getBoundingClientRect().top + window.scrollY
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const lastDotAtBottom = (containerTop + centres[centres.length - 1] - maxScroll) / window.innerHeight
      setEndFraction(Math.round(Math.min(1, Math.max(0.65, lastDotAtBottom)) * 1000) / 1000)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    observer.observe(document.body)
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [items.length])

  const lineTop = stops[0] ?? 0
  const lineHeight = stops.length > 1 ? stops[stops.length - 1] - stops[0] : 0

  // The line runs from the first stop to the last one, so the rocket parks at the final dot instead
  // of flying past it. Progress is where the viewport's 65% mark crosses that line, like the Memoria
  // pilot section.
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 0.65", `end ${endFraction}`] })
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const rocketTop = useTransform(progress, (value) => `${value * 100}%`)
  const speed = useVelocity(progress)
  const flameScale = useTransform(speed, (value) => 1 + Math.min(Math.abs(value) * 0.9, 1.1))

  useMotionValueEvent(progress, "change", (value) => {
    const rocketY = lineTop + value * lineHeight
    setPassed(stops.filter((stop) => stop <= rocketY + 1).length)
  })

  const animated = !prefersReducedMotion && lineHeight > 0

  return (
    <div ref={containerRef} className="relative">
      <div ref={lineRef} className="absolute left-[15px] w-0.5 bg-gray-200" style={{ top: lineTop, height: lineHeight }}>
        {animated && (
          <>
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-accent to-accent/60 shadow-[0_0_8px_rgba(255,95,5,0.45)]"
              style={{ scaleY: progress }}
            />
            <motion.div aria-hidden className="pointer-events-none absolute left-1/2 z-10" style={{ top: rocketTop, x: "-50%", y: "-50%" }}>
              <span className="relative block h-8 w-8">
                <span className="absolute inset-0 rounded-full bg-accent/30 blur-md" />
                <motion.span className="rocket-flame" style={{ scaleY: flameScale }}>
                  <span className="rocket-flame-core" />
                </motion.span>
                {SPARKS.map((dx, index) => (
                  <span key={dx} className="rocket-spark" style={{ "--dx": dx, animationDelay: `${index * 0.3}s` } as CSSProperties} />
                ))}
                <Rocket className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-[135deg] text-accent" strokeWidth={2} fill="white" />
              </span>
            </motion.div>
          </>
        )}
      </div>

      <div className="space-y-8">
        {items.map((item, index) => {
          const isPresent = isCurrentDateRange(item.date)
          const lit = animated && index < passed

          return (
            <div
              key={index}
              ref={(element) => {
                itemRefs.current[index] = element
              }}
              className="relative pl-12"
            >
              <div
                className={`absolute left-2.5 top-2 h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                  lit || isPresent
                    ? "border-accent bg-accent shadow-[0_0_0_4px_rgba(255,95,5,0.18)]"
                    : "border-gray-300 bg-white"
                } ${isPresent ? "animate-pulse-slow" : ""}`}
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
