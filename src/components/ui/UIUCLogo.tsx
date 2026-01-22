interface UIUCLogoProps {
  size?: number
  className?: string
}

export function UIUCLogo({ size = 16, className = "" }: UIUCLogoProps) {
  const aspectRatio = 3.5
  const height = size
  const width = size * aspectRatio

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 140 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="University of Illinois Urbana-Champaign"
    >
      <rect width="140" height="40" fill="#13294B" rx="2" />
      {/* Block I */}
      <rect x="8" y="6" width="18" height="4" fill="#FF5F05" />
      <rect x="12" y="10" width="10" height="20" fill="#FF5F05" />
      <rect x="8" y="30" width="18" height="4" fill="#FF5F05" />
      {/* ILLINOIS text */}
      <text x="32" y="26" fill="white" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="bold">
        ILLINOIS
      </text>
    </svg>
  )
}
