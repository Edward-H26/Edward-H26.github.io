interface ContentBulletsProps {
  bullets: string[]
  className?: string
}

export function ContentBullets({
  bullets,
  className = "space-y-2 text-sm text-gray-600",
}: ContentBulletsProps) {
  if (bullets.length === 0) return null

  return (
    <ul className={className}>
      {bullets.map((bullet, index) => (
        <li key={`${bullet}-${index}`} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-[0.55em] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-dark"
          />
          <span className="min-w-0 flex-1">{bullet}</span>
        </li>
      ))}
    </ul>
  )
}
