import { useReducedMotion as useFramerReducedMotion } from "framer-motion"

/** Whether the reader asked for reduced motion; false until the media query has been read. */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false
}
