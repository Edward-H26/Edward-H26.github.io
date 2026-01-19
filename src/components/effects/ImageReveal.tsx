import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

interface ImageRevealProps {
  src: string
  alt: string
  className?: string
  direction?: "left" | "right" | "top" | "bottom"
  duration?: number
}

export function ImageReveal({
  src,
  alt,
  className,
  direction = "left",
  duration = 0.8,
}: ImageRevealProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const prefersReducedMotion = useReducedMotion()

  const getClipPath = () => {
    switch (direction) {
      case "left":
        return {
          hidden: "inset(0 100% 0 0)",
          visible: "inset(0 0% 0 0)",
        }
      case "right":
        return {
          hidden: "inset(0 0 0 100%)",
          visible: "inset(0 0 0 0%)",
        }
      case "top":
        return {
          hidden: "inset(0 0 100% 0)",
          visible: "inset(0 0 0% 0)",
        }
      case "bottom":
        return {
          hidden: "inset(100% 0 0 0)",
          visible: "inset(0% 0 0 0)",
        }
    }
  }

  const clipPaths = getClipPath()

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={cn("overflow-hidden", className)}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ opacity: isVisible ? 1 : 0 }}
        />
      </div>
    )
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ clipPath: clipPaths.hidden, scale: 1.1 }}
        animate={
          isVisible
            ? { clipPath: clipPaths.visible, scale: 1 }
            : { clipPath: clipPaths.hidden, scale: 1.1 }
        }
        transition={{
          duration,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />
    </div>
  )
}
