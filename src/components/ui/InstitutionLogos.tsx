import { InstitutionLogo } from "@/components/ui/InstitutionLogo"

type InstitutionLogosProps = {
  variant?: "sidebar" | "mobile"
}

export function InstitutionLogos({ variant = "sidebar" }: InstitutionLogosProps) {
  if (variant === "mobile") {
    return (
      <div className="flex w-full max-w-[12rem] flex-col items-center gap-5">
        <div className="institution-logo-group flex flex-col items-center gap-2">
          <InstitutionLogo school="Columbia University" />
          <span className="text-center text-sm leading-5 text-gray-500">
            Columbia University
          </span>
        </div>

        <div className="institution-logo-group flex flex-col items-center gap-2">
          <InstitutionLogo school="University of Illinois Urbana-Champaign" />
          <span className="text-center text-sm leading-5 text-gray-500">
            University of Illinois<br />Urbana-Champaign
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="text-sm text-gray-500 flex flex-col items-center gap-5">
      <div className="institution-logo-group flex flex-col items-center gap-2">
        <InstitutionLogo school="Columbia University" />
        <span className="text-center">Columbia University</span>
      </div>
      <div className="institution-logo-group flex flex-col items-center gap-2">
        <InstitutionLogo school="University of Illinois Urbana-Champaign" />
        <span className="text-center">University of Illinois<br />Urbana-Champaign</span>
      </div>
    </div>
  )
}
