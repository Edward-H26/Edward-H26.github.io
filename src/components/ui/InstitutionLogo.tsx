import { ColumbiaLogo } from "@/components/ui/ColumbiaLogo"
import { UIUCLogo } from "@/components/ui/UIUCLogo"

type InstitutionLogoProps = {
  school: string
  className?: string
}

const LOGO_FRAME_CLASS =
  "flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100"

const LOGO_IMAGE_CLASS = "h-[72px] w-[72px] rounded-xl"

export function InstitutionLogo({ school, className = "" }: InstitutionLogoProps) {
  const isColumbia = school.includes("Columbia")
  const isIllinois = school.includes("Illinois")

  if (!isColumbia && !isIllinois) {
    return null
  }

  return (
    <div className={`${LOGO_FRAME_CLASS} ${className}`}>
      {isColumbia ? (
        <ColumbiaLogo size={72} className={LOGO_IMAGE_CLASS} />
      ) : (
        <UIUCLogo size={72} className={`${LOGO_IMAGE_CLASS} scale-[1.18]`} />
      )}
    </div>
  )
}
