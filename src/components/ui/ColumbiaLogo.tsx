interface ColumbiaLogoProps {
  size?: number
  className?: string
}

export function ColumbiaLogo({ size = 40, className = "" }: ColumbiaLogoProps) {
  return (
    <img
      src="/images/columbia-logo.png"
      alt="Columbia Engineering"
      width={size}
      className={`bg-white rounded p-1 ${className}`}
    />
  )
}
