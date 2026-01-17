import { Github, Linkedin, Twitter } from "lucide-react"
import { PROFILE } from "@/data/content"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className = "" }: SidebarProps) {
  return (
    <aside className={`w-72 fixed left-0 top-16 h-[calc(100vh-4rem)] p-8 border-r border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 overflow-y-auto ${className}`}>
      <div className="flex flex-col items-center">
        <img
          src={PROFILE.photo}
          alt={PROFILE.name}
          className="w-40 h-40 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-lg"
        />

        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 text-center">
          {PROFILE.name}
        </h1>

        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-1">
          {PROFILE.title}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {PROFILE.affiliation}
        </p>

        <a
          href={`mailto:${PROFILE.email}`}
          className="text-sm text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent-dark transition-colors mt-2"
        >
          {PROFILE.email}
        </a>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <a
          href={PROFILE.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent-dark hover:shadow-md transition-all"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <a
          href={PROFILE.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent-dark hover:shadow-md transition-all"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <a
          href={PROFILE.social.x}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent-dark hover:shadow-md transition-all"
          aria-label="X"
        >
          <Twitter size={20} />
        </a>
      </div>
    </aside>
  )
}
