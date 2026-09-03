import { InstitutionLogo } from "@/components/ui/InstitutionLogo"

type InstitutionLogosProps = {
  variant?: "sidebar" | "mobile"
}

export function InstitutionLogos({ variant = "sidebar" }: InstitutionLogosProps) {
  if (variant === "mobile") {
    return (
      <div className="flex w-full max-w-[13rem] flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center gap-3">
          <InstitutionLogo school="Columbia University" />
          <span className="text-center text-sm leading-tight text-gray-500">
            Columbia University
          </span>
        </div>

        <div className="flex w-full flex-col items-center gap-3">
          <InstitutionLogo school="University of Illinois Urbana-Champaign" />
          <span className="text-center text-sm leading-tight text-gray-500">
            University of Illinois<br />Urbana-Champaign
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-[13rem] flex-col items-center gap-6 text-sm text-gray-500">
      <div className="flex w-full flex-col items-center gap-3">
        <InstitutionLogo school="Columbia University" />
        <span className="text-center leading-tight">Columbia University</span>
      </div>
      <div className="flex w-full flex-col items-center gap-3">
        <InstitutionLogo school="University of Illinois Urbana-Champaign" />
        <span className="text-center leading-tight">University of Illinois<br />Urbana-Champaign</span>
      </div>
    </div>
  )
}
