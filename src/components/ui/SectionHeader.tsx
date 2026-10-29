interface SectionHeaderProps {
  heading: string
  subheading?: string
}

/** Page heading and optional subheading at the top of every section page. */
export function SectionHeader({ heading, subheading }: SectionHeaderProps) {
  return (
    <>
      <h1 className="section-title">{heading}</h1>
      {subheading ? <p className="section-subtitle">{subheading}</p> : null}
    </>
  )
}
