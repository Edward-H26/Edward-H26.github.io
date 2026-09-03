import { ColumbiaLogo } from "@/components/logos/ColumbiaLogo"
import { UIUCLogo } from "@/components/logos/UIUCLogo"

type InstitutionLogoProps = {
  school: string
}

const LOGO_FRAME_CLASS =
  "flex h-[72px] w-[72px] translate-x-0.5 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100"

const LOGO_IMAGE_CLASS = "h-[72px] w-[72px] rounded-xl object-contain"

export function InstitutionLogo({ school }: InstitutionLogoProps) {
  const isColumbia = school.includes("Columbia")
  const isIllinois = school.includes("Illinois")

  if (!isColumbia && !isIllinois) {
    return null
  }

  return (
    <div className={LOGO_FRAME_CLASS}>
      {isColumbia ? (
        <ColumbiaLogo size={72} className={LOGO_IMAGE_CLASS} />
      ) : (
        <UIUCLogo size={72} className={LOGO_IMAGE_CLASS} />
      )}
    </div>
  )
}
