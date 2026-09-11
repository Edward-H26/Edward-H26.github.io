import { PROFILE } from "@/data/content"
import { EmailMark, GitHubMark, LinkedInMark, ScholarMark, XMark } from "@/components/logos/BrandIcons"

type SocialLinksProps = {
  size?: number
  className?: string
  linkClassName?: string
}

const DEFAULT_LINK_CLASS =
  "p-2.5 rounded-full bg-orange-100 backdrop-blur-sm text-gray-600 hover:text-accent-dark hover:shadow-md hover:scale-110 transition-all duration-200"

export function SocialLinks({
  size = 20,
  className = "flex justify-center gap-4",
  linkClassName = DEFAULT_LINK_CLASS,
}: SocialLinksProps) {
  const links = [
    { label: "Google Scholar", href: PROFILE.social.scholar, Icon: ScholarMark },
    { label: "GitHub", href: PROFILE.social.github, Icon: GitHubMark },
    { label: "LinkedIn", href: PROFILE.social.linkedin, Icon: LinkedInMark },
    { label: "Email", href: `mailto:${PROFILE.email}`, Icon: EmailMark },
    { label: "X", href: PROFILE.social.x, Icon: XMark },
  ]

  return (
    <div className={className}>
      {links.map(({ label, href, Icon }) => {
        const external = !href.startsWith("mailto:")
        return (
          <a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={linkClassName}
            aria-label={label}
          >
            <Icon size={size} />
          </a>
        )
      })}
    </div>
  )
}
