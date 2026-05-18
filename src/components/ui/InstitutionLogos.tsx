import { ColumbiaLogo } from "@/components/ui/ColumbiaLogo"
import { UIUCLogo } from "@/components/ui/UIUCLogo"

type InstitutionLogosProps = {
  variant?: "sidebar" | "mobile"
}

export function InstitutionLogos({ variant = "sidebar" }: InstitutionLogosProps) {
  if (variant === "mobile") {
    return (
      <div className="mt-2 flex w-full max-w-[12rem] flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <ColumbiaLogo size={80} className="h-20 w-20 rounded-xl shadow-sm" />
          <span className="text-center text-sm leading-5 text-gray-500">
            Columbia University
          </span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <UIUCLogo size={80} className="h-20 w-20 rounded-xl shadow-sm" />
          <span className="text-center text-sm leading-5 text-gray-500">
            University of Illinois<br />Urbana-Champaign
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="text-sm text-gray-500 flex flex-col items-center mt-3 gap-6">
      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-lg overflow-hidden">
          <ColumbiaLogo size={80} className="h-20 w-20" />
        </div>
        <span className="text-center">Columbia University</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-lg overflow-hidden">
          <UIUCLogo size={80} className="h-20 w-20" />
        </div>
        <span className="text-center">University of Illinois<br />Urbana-Champaign</span>
      </div>
    </div>
  )
}
