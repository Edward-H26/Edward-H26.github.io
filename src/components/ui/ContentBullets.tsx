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
        <li key={`${bullet}-${index}`} className="flex gap-2">
          <span className="text-accent-dark mt-1.5 flex-shrink-0">
            &bull;
          </span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  )
}
