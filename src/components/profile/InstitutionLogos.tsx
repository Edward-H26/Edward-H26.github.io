import { InstitutionLogo } from "@/components/profile/InstitutionLogo"

type InstitutionLogosProps = {
  variant?: "sidebar" | "mobile"
}

// The longer school name breaks onto two lines so both labels fit the narrow sidebar.
const INSTITUTIONS = [
  { school: "Columbia University", label: <>Columbia University</> },
  {
    school: "University of Illinois Urbana-Champaign",
    label: (
      <>
        University of Illinois
        <br />
        Urbana-Champaign
      </>
    ),
  },
]

// The sidebar sets the label text style once on the wrapper; the mobile menu sets it per label.
const VARIANT_CLASSES = {
  sidebar: {
    container: "flex w-full max-w-[13rem] flex-col items-center gap-6 text-sm text-gray-500",
    label: "text-center leading-tight",
  },
  mobile: {
    container: "flex w-full max-w-[13rem] flex-col items-center gap-6",
    label: "text-center text-sm leading-tight text-gray-500",
  },
} as const

/** Both school logos with their names, stacked, for the sidebar or the mobile menu. */
export function InstitutionLogos({ variant = "sidebar" }: InstitutionLogosProps) {
  const classes = VARIANT_CLASSES[variant]

  return (
    <div className={classes.container}>
      {INSTITUTIONS.map(({ school, label }) => (
        <div key={school} className="flex w-full flex-col items-center gap-3">
          <InstitutionLogo school={school} />
          <span className={classes.label}>{label}</span>
        </div>
      ))}
    </div>
  )
}
