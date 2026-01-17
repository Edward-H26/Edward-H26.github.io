interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "accent"
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "badge",
    accent: "badge bg-accent-light text-accent",
  }

  return <span className={variants[variant]}>{children}</span>
}
