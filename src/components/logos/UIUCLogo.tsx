interface UIUCLogoProps {
  size?: number
  className?: string
}

/** University of Illinois Urbana-Champaign logo from public/images, as a square of `size` pixels. */
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
