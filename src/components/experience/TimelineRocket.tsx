import type { CSSProperties } from "react"
import { motion, type MotionValue } from "framer-motion"
import { Rocket } from "lucide-react"

// Horizontal drift of the three exhaust sparks, in pixels from the flame.
const SPARKS = ["-7px", "6px", "-2px"]

interface TimelineRocketProps {
  top: MotionValue<string>
  flameScale: MotionValue<number>
  heading: "down" | "up"
}

/** The rocket that rides the timeline line, nose first in its direction of travel, with its exhaust. */
export function TimelineRocket({ top, flameScale, heading }: TimelineRocketProps) {
  return (
    <motion.div aria-hidden className="pointer-events-none absolute left-1/2 z-10" style={{ top, x: "-50%", y: "-50%" }}>
      {/* The nose points up inside this box and the exhaust hangs below it, so rotating the
          box by 180 degrees turns the whole rocket around without moving its centre. */}
      <motion.span
        className="relative block h-7 w-7"
        animate={{ rotate: heading === "down" ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
      >
        <span className="absolute inset-0 rounded-full bg-accent/25 blur-md" />
        {/* x lives in the motion style because framer's transform replaces Tailwind's. */}
        <motion.span className="rocket-flame" style={{ x: "-50%", scaleY: flameScale }}>
          <span className="rocket-flame-core" />
        </motion.span>
        {SPARKS.map((dx, index) => (
          <span key={dx} className="rocket-spark" style={{ "--dx": dx, animationDelay: `${index * 0.3}s` } as CSSProperties} />
        ))}
        <Rocket
          className="absolute left-1/2 top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 -rotate-45 text-accent"
          strokeWidth={2}
          fill="white"
        />
      </motion.span>
    </motion.div>
  )
}
