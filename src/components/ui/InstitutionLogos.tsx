import { ColumbiaLogo } from "@/components/ui/ColumbiaLogo"
import { UIUCLogo } from "@/components/ui/UIUCLogo"

type InstitutionLogosProps = {
  variant?: "sidebar" | "mobile"
}

export function InstitutionLogos({ variant = "sidebar" }: InstitutionLogosProps) {
  if (variant === "mobile") {
    return (
      <div className="mt-1 flex w-full max-w-[12rem] flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <ColumbiaLogo size={72} className="h-[72px] w-[72px] rounded-xl shadow-sm" />
          <span className="text-center text-sm leading-5 text-gray-500">
            Columbia University
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <UIUCLogo size={72} className="h-[72px] w-[72px] rounded-xl shadow-sm" />
          <span className="text-center text-sm leading-5 text-gray-500">
            University of Illinois<br />Urbana-Champaign
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="text-sm text-gray-500 flex flex-col items-center mt-2 gap-4">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-lg overflow-hidden mb-1">
          <ColumbiaLogo size={80} className="h-20 w-20" />
        </div>
        <span className="text-center">Columbia University</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-lg overflow-hidden mb-1">
          <UIUCLogo size={80} className="h-20 w-20" />
        </div>
        <span className="text-center">University of Illinois<br />Urbana-Champaign</span>
      </div>
    </div>
  )
}
