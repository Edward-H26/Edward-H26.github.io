interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "accent" | "pro"
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "badge",
    accent: "badge bg-blue-100 text-primary",
    pro: "badge-pro",
  }

  return <span className={variants[variant]}>{children}</span>
}
