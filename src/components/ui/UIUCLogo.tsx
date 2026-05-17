interface UIUCLogoProps {
  size?: number
  className?: string
}

export function UIUCLogo({ size = 40, className = "" }: UIUCLogoProps) {
  return (
    <img
      src="/images/uiuc-logo.jpeg"
      alt="University of Illinois Urbana-Champaign"
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  )
}
