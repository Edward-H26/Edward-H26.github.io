import { useLayoutEffect, useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"
import type { ContentCard } from "@/data"
import { TimelineCard } from "@/components/experience/TimelineCard"
import { TimelineRocket } from "@/components/experience/TimelineRocket"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { isCurrentDateRange } from "@/utils/cards"
import { SCROLL_SPRING } from "@/utils/motion"

interface TimelineProps {
  items: readonly ContentCard[]
}

// Each dot is 12px wide at left 10px and top 8px inside its item, so its centre sits 14px below the
// item's top edge and 16px from the left, where the 2px line at left 15px also centres.
const DOT_CENTER = 14

// Progress is where this fraction of the viewport height crosses the line, like the Memoria pilot
// section.
const VIEWPORT_MARK = 0.65

// Spring velocities this small are the spring's dying wobble, not the reader scrolling.
const HEADING_THRESHOLD = 0.002

// The exhaust stretches with scroll speed, to a little over twice its resting length at most.
const FLAME_STRETCH_RATE = 0.9
const FLAME_MAX_STRETCH = 1.1

// Three decimals keep the scroll offset string stable across sub-pixel layout changes.
const roundFraction = (value: number) => Math.round(value * 1000) / 1000

/** Experience timeline: the line through the cards' dots fills and a rocket flies along it as the reader scrolls. */
export function Timeline({ items }: TimelineProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [stops, setStops] = useState<number[]>([])
  const [endFraction, setEndFraction] = useState(VIEWPORT_MARK)
  const [passed, setPassed] = useState(0)
  const [heading, setHeading] = useState<"down" | "up">("down")

  // Dot centres measured from the container top, re-measured whenever the cards or the page reflow.
  // On a short page the last dot never reaches the viewport mark, so the end offset stretches down
  // to wherever that dot sits when the page is scrolled to the bottom.
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
      setEndFraction(roundFraction(Math.min(1, Math.max(VIEWPORT_MARK, lastDotAtBottom))))
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
  // of flying past it.
  const { scrollYProgress } = useScroll({ target: lineRef, offset: [`start ${VIEWPORT_MARK}`, `end ${endFraction}`] })
  const progress = useSpring(scrollYProgress, SCROLL_SPRING)
  const rocketTop = useTransform(progress, (value) => `${value * 100}%`)
  const speed = useVelocity(progress)
  const flameScale = useTransform(speed, (value) => 1 + Math.min(Math.abs(value) * FLAME_STRETCH_RATE, FLAME_MAX_STRETCH))

  // The rocket turns around when the reader scrolls back up; a rocket at rest keeps the heading it
  // arrived with.
  useMotionValueEvent(speed, "change", (value) => {
    if (value > HEADING_THRESHOLD) setHeading("down")
    else if (value < -HEADING_THRESHOLD) setHeading("up")
  })

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
            <TimelineRocket top={rocketTop} flameScale={flameScale} heading={heading} />
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
                  lit || isPresent ? "border-accent bg-accent shadow-[0_0_0_4px_rgba(255,95,5,0.18)]" : "border-gray-300 bg-white"
                } ${isPresent ? "animate-pulse-slow" : ""}`}
              />

              <TimelineCard item={item} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
