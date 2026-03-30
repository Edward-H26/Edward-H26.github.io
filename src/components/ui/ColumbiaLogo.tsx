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
      height={size}
      className={`object-contain ${className}`}
    />
  )
}
