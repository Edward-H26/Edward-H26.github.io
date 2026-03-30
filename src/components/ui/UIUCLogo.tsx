interface UIUCLogoProps {
  size?: number
  className?: string
}

export function UIUCLogo({ size = 40, className = "" }: UIUCLogoProps) {
  return (
    <img
      src="https://brand.illinois.edu/wp-content/uploads/2024/02/Block-I-orange-blue-background.png"
      alt="University of Illinois Urbana-Champaign"
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  )
}
