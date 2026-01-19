import { useReducedMotion } from "@/hooks/useReducedMotion"

export function AuroraBackground() {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-50 to-sky-100" />
    )
  }

  return (
    <div className="aurora-container fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora-layer aurora-layer-1" />
      <div className="aurora-layer aurora-layer-2" />
      <div className="aurora-layer aurora-layer-3" />
    </div>
  )
}
