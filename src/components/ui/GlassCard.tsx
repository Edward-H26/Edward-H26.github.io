import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "elevated" | "subtle"
  hover?: boolean
  children: React.ReactNode
  className?: string
}

const variants = {
  default: "glass",
  elevated: "glass-elevated",
  subtle: "glass-subtle",
}

export function GlassCard({
  variant = "default",
  hover = true,
  children,
  className,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        variants[variant],
        "rounded-xl transition-all duration-300",
        hover && "hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
