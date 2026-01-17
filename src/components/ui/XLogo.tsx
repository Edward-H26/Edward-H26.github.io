type XLogoProps = {
  size?: number
  className?: string
}

export function XLogo({ size = 20, className = "" }: XLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 300 271"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
    </svg>
  )
}
