import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

export function MeshGradient() {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 20%, rgba(59, 130, 246, 0.12), transparent),
            radial-gradient(ellipse 50% 40% at 80% 30%, rgba(139, 92, 246, 0.10), transparent),
            radial-gradient(ellipse 45% 45% at 50% 80%, rgba(236, 72, 153, 0.08), transparent)
          `,
        }}
      />
    )
  }

  return (
    <div
      className={cn(
        "fixed inset-0 -z-10 pointer-events-none",
        "mesh-gradient-animated"
      )}
    />
  )
}
