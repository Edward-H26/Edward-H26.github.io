import { useReducedMotion } from "@/hooks/useReducedMotion"

export function LiquidGlassFilters() {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return null
  }

  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
      }}
    >
      <defs>
        <filter id="liquid-glass-refraction" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="3"
            seed="42"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="liquid-glass-refraction-hover" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="4"
            seed="42"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}
