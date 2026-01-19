interface PageTransitionProps {
  children: React.ReactNode
  variant?: "default" | "slide" | "fade" | "scale"
}

export function PageTransition({ children }: PageTransitionProps) {
  return <>{children}</>
}
