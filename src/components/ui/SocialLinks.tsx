import { Github, Linkedin, Mail } from "lucide-react"
import { PROFILE } from "@/data/content"
import { XLogo } from "@/components/logos/XLogo"
import { ScholarLogo } from "@/components/logos/ScholarLogo"

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
    { label: "Google Scholar", href: PROFILE.social.scholar, Icon: ScholarLogo },
    { label: "GitHub", href: PROFILE.social.github, Icon: Github },
    { label: "LinkedIn", href: PROFILE.social.linkedin, Icon: Linkedin },
    { label: "Email", href: `mailto:${PROFILE.email}`, Icon: Mail },
    { label: "X", href: PROFILE.social.x, Icon: XLogo },
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
