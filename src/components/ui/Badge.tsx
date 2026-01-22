interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "accent" | "pro"
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "badge",
    accent: "badge bg-accent-light text-accent-dark",
    pro: "badge-pro",
  }

  return <span className={variants[variant]}>{children}</span>
}
