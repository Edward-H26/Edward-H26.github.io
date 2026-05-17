interface SectionHeaderProps {
  heading: string
  subheading?: string
}

export function SectionHeader({ heading, subheading }: SectionHeaderProps) {
  return (
    <>
      <h1 className="section-title">{heading}</h1>
      {subheading ? <p className="section-subtitle">{subheading}</p> : null}
    </>
  )
}
