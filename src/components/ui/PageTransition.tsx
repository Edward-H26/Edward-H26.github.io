import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useNavigationSource, type NavigationSource } from "@/contexts/NavigationContext"

interface PageTransitionProps {
  children: React.ReactNode
}

const SCROLL_EASING = [0.645, 0.045, 0.355, 1] as const
const CLICK_EASING = [0.4, 0, 0.2, 1] as const

const getPageVariants = (source: NavigationSource) => {
  if (source === "scroll-down") {
    return {
      initial: {
        opacity: 0,
        y: 20,
        willChange: "opacity, transform",
      },
      animate: {
        opacity: 1,
        y: 0,
        willChange: "auto",
        transition: {
          duration: 0.3,
          ease: SCROLL_EASING,
        },
      },
      exit: {
        opacity: 0,
        y: -20,
        willChange: "opacity, transform",
        transition: {
          duration: 0.3,
          ease: SCROLL_EASING,
        },
      },
    }
  }

  if (source === "scroll-up") {
    return {
      initial: {
        opacity: 0,
        y: -20,
        willChange: "opacity, transform",
      },
      animate: {
        opacity: 1,
        y: 0,
        willChange: "auto",
        transition: {
          duration: 0.3,
          ease: SCROLL_EASING,
        },
      },
      exit: {
        opacity: 0,
        y: 20,
        willChange: "opacity, transform",
        transition: {
          duration: 0.3,
          ease: SCROLL_EASING,
        },
      },
    }
  }

  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.25, ease: CLICK_EASING },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.15, ease: [0.4, 0, 1, 1] },
    },
  }
}

const reducedMotionVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
}

export function PageTransition({ children }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion()
  const { source } = useNavigationSource()

  const variants = prefersReducedMotion ? reducedMotionVariants : getPageVariants(source)

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ transform: "translateZ(0)" }}
    >
      {children}
    </motion.div>
  )
}
