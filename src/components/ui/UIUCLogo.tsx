interface UIUCLogoProps {
  size?: number
  className?: string
}

export function UIUCLogo({ size = 16, className = "" }: UIUCLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="University of Illinois Urbana-Champaign"
    >
      <rect x="2" y="2" width="20" height="4" fill="#FF5F05" />
      <rect x="8" y="6" width="8" height="12" fill="#13294B" />
      <rect x="2" y="18" width="20" height="4" fill="#FF5F05" />
    </svg>
  )
}
