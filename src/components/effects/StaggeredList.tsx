import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { cn } from "@/lib/utils"

interface StaggeredListProps {
  children: React.ReactNode[]
  staggerDelay?: number
  className?: string
  itemClassName?: string
  threshold?: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export function StaggeredList({
  children,
  staggerDelay = 0.1,
  className,
  itemClassName,
  threshold = 0.1,
}: StaggeredListProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold })

  const customContainerVariants = {
    ...containerVariants,
    visible: {
      ...containerVariants.visible,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={customContainerVariants}
      className={cn(className)}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants} className={itemClassName}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
