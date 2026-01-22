import { Github, Linkedin } from "lucide-react"
import { PROFILE } from "@/data/content"
import { XLogo } from "@/components/ui/XLogo"
import { UIUCLogo } from "@/components/ui/UIUCLogo"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className = "" }: SidebarProps) {
  return (
    <aside className={`w-72 fixed left-0 top-16 h-[calc(100vh-4rem)] p-8 glass-sidebar overflow-y-auto ${className}`}>
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-xl animate-pulse-slow" />
          <img
            src={PROFILE.photo}
            alt={PROFILE.name}
            className="relative w-40 h-40 rounded-full object-cover border-4 border-white/80 shadow-xl"
          />
        </div>

        <h1 className="text-xl font-semibold text-gray-900 mt-4 text-center">
          {PROFILE.name}
        </h1>

        <p className="text-sm text-gray-600 text-center mt-1">
          {PROFILE.title}
        </p>

        <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-1.5">
          <UIUCLogo size={14} />
          {PROFILE.affiliation}
        </p>

        <a
          href={`mailto:${PROFILE.email}`}
          className="text-sm text-gray-600 hover:text-accent-dark transition-colors mt-2"
        >
          {PROFILE.email}
        </a>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <a
          href={PROFILE.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-orange-50/80 backdrop-blur-sm text-gray-600 hover:text-accent-dark hover:shadow-md hover:scale-110 transition-all duration-200"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <a
          href={PROFILE.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-orange-50/80 backdrop-blur-sm text-gray-600 hover:text-accent-dark hover:shadow-md hover:scale-110 transition-all duration-200"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <a
          href={PROFILE.social.x}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-orange-50/80 backdrop-blur-sm text-gray-600 hover:text-accent-dark hover:shadow-md hover:scale-110 transition-all duration-200"
          aria-label="X"
        >
          <XLogo size={20} />
        </a>
      </div>
    </aside>
  )
}
