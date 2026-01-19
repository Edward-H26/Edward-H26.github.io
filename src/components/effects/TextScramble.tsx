import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface TextScrambleProps {
  text: string
  trigger?: boolean
  speed?: number
  className?: string
  scrambleChars?: string
}

export function TextScramble({
  text,
  trigger = true,
  speed = 30,
  className,
  scrambleChars = "!<>-_\\/[]{}—=+*^?#________",
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const prefersReducedMotion = useReducedMotion()
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!trigger || prefersReducedMotion || hasAnimated.current) {
      setDisplayText(text)
      return
    }

    hasAnimated.current = true
    let iteration = 0
    const chars = scrambleChars.split("")

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (i < iteration) return char
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      )

      if (iteration >= text.length) {
        clearInterval(interval)
        setDisplayText(text)
      }

      iteration += 1 / 3
    }, speed)

    return () => clearInterval(interval)
  }, [text, trigger, speed, scrambleChars, prefersReducedMotion])

  useEffect(() => {
    if (!trigger) {
      hasAnimated.current = false
    }
  }, [trigger])

  return (
    <span className={cn("font-mono", className)}>
      {displayText}
    </span>
  )
}
