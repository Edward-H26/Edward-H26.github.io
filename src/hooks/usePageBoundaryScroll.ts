import { useEffect, useRef, useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const PAGE_ORDER = ["/", "/research", "/experience", "/projects", "/publications", "/info"]

interface UsePageBoundaryScrollOptions {
  enabled?: boolean
  scrollThreshold?: number
  cooldownMs?: number
}

export function usePageBoundaryScroll({
  enabled = true,
  scrollThreshold = 120,
  cooldownMs = 1000,
}: UsePageBoundaryScrollOptions = {}) {
  const navigate = useNavigate()
  const location = useLocation()
  const lastNavigationTime = useRef(0)
  const accumulatedScroll = useRef(0)

  const getNextPage = useCallback((path: string) => {
    const idx = PAGE_ORDER.indexOf(path)
    if (idx === -1) return PAGE_ORDER[0]
    return PAGE_ORDER[(idx + 1) % PAGE_ORDER.length]
  }, [])

  const getPreviousPage = useCallback((path: string) => {
    const idx = PAGE_ORDER.indexOf(path)
    if (idx === -1) return PAGE_ORDER[PAGE_ORDER.length - 1]
    return PAGE_ORDER[(idx - 1 + PAGE_ORDER.length) % PAGE_ORDER.length]
  }, [])

  useEffect(() => {
    if (!enabled) return

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastNavigationTime.current < cooldownMs) return

      const { scrollY } = window
      const { innerHeight } = window
      const { scrollHeight } = document.documentElement
      const isAtBottom = scrollY + innerHeight >= scrollHeight - 10
      const isAtTop = scrollY <= 10

      if (isAtBottom && e.deltaY > 0) {
        accumulatedScroll.current += e.deltaY
        if (accumulatedScroll.current >= scrollThreshold) {
          lastNavigationTime.current = now
          accumulatedScroll.current = 0
          navigate(getNextPage(location.pathname))
        }
      } else if (isAtTop && e.deltaY < 0) {
        accumulatedScroll.current += Math.abs(e.deltaY)
        if (accumulatedScroll.current >= scrollThreshold) {
          lastNavigationTime.current = now
          accumulatedScroll.current = 0
          navigate(getPreviousPage(location.pathname))
        }
      } else {
        accumulatedScroll.current = 0
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [enabled, cooldownMs, scrollThreshold, location.pathname, navigate, getNextPage, getPreviousPage])
}
