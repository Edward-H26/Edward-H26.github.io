interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "accent" | "pro"
}

// "pro" marks a highlighted skill; "accent" is used for research interests and languages.
const BADGE_CLASSES = {
  default: "badge",
  accent: "badge bg-blue-100 text-primary",
  pro: "badge-pro",
} as const

/** Rounded pill label. */
export function Badge({ children, variant = "default" }: BadgeProps) {
  return <span className={BADGE_CLASSES[variant]}>{children}</span>
}
