import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface TextRevealProps {
  text: string
  variant?: "word" | "character" | "line"
  className?: string
  delay?: number
  staggerDelay?: number
}

export function TextReveal({
  text,
  variant = "word",
  className,
  delay = 0,
  staggerDelay = 0.05,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay * i,
      },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    hidden: {
      opacity: 0,
      y: 12,
      scale: 0.98,
    },
  }

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>
  }

  if (variant === "character") {
    return (
      <span className={cn("inline-flex flex-wrap", className)}>
        {text.split("").map((char, i) => (
          <span
            key={i}
            className={cn(
              "animate-char-reveal",
              char === " " ? "mr-1" : ""
            )}
            style={{ animationDelay: `${delay + i * staggerDelay}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    )
  }

  if (variant === "line") {
    const lines = text.split("\n")
    return (
      <motion.div
        className={className}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {lines.map((line, index) => (
          <motion.div key={index} variants={child}>
            {line}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  const words = text.split(" ")
  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="mr-1.5">
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
