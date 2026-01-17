interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "accent"
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "badge",
    accent: "badge bg-accent-light dark:bg-slate-700 text-accent dark:text-accent-dark",
  }

  return <span className={variants[variant]}>{children}</span>
}
