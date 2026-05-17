import { Github, Linkedin, Mail } from "lucide-react"
import { PROFILE } from "@/data/content"
import { XLogo } from "@/components/ui/XLogo"

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
  return (
    <div className={className}>
      <a
        href={PROFILE.social.github}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
        aria-label="GitHub"
      >
        <Github size={size} />
      </a>
      <a
        href={PROFILE.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
        aria-label="LinkedIn"
      >
        <Linkedin size={size} />
      </a>
      <a
        href={`mailto:${PROFILE.email}`}
        className={linkClassName}
        aria-label="Email"
      >
        <Mail size={size} />
      </a>
      <a
        href={PROFILE.social.x}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
        aria-label="X"
      >
        <XLogo size={size} />
      </a>
    </div>
  )
}
