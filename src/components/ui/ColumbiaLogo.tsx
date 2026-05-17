interface ColumbiaLogoProps {
  size?: number
  className?: string
}

export function ColumbiaLogo({ size = 40, className = "" }: ColumbiaLogoProps) {
  return (
    <img
      src="/images/columbia-logo.jpeg"
      alt="Columbia University"
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  )
}
