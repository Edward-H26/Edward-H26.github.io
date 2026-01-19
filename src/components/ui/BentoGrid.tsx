import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <motion.div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  )
}
