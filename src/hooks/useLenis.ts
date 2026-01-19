import { useEffect, useRef } from "react"
import { useReducedMotion } from "./useReducedMotion"

interface LenisOptions {
  duration?: number
  easing?: (t: number) => number
  smoothWheel?: boolean
  wheelMultiplier?: number
}

export function useLenis(options: LenisOptions = {}) {
  const lenisRef = useRef<unknown>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const initLenis = async () => {
      try {
        const Lenis = (await import("@studio-freight/lenis")).default

        const lenis = new Lenis({
          duration: options.duration ?? 1.2,
          easing: options.easing ?? ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
          smoothWheel: options.smoothWheel ?? true,
          wheelMultiplier: options.wheelMultiplier ?? 1,
        })

        lenisRef.current = lenis

        const raf = (time: number) => {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
          lenis.destroy()
        }
      } catch {
        return
      }
    }

    const cleanup = initLenis()

    return () => {
      cleanup.then((cleanupFn) => cleanupFn?.())
    }
  }, [options, prefersReducedMotion])

  return lenisRef
}
