import { PROFILE } from "@/data/content"
import { InstitutionLogos } from "@/components/ui/InstitutionLogos"
import { SocialLinks } from "@/components/ui/SocialLinks"
import { ProfileAvatar } from "@/components/ui/ProfileAvatar"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className = "" }: SidebarProps) {
  return (
    <aside className={`w-72 fixed left-0 top-16 h-[calc(100vh-4rem)] p-8 glass-sidebar overflow-y-auto ${className}`}>
      <div className="profile-stack flex w-full flex-col items-center gap-6">
        <div className="profile-identity-group flex w-full max-w-[13rem] flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-xl animate-pulse-slow" />
            <ProfileAvatar
              sizeClassName="w-40 h-40"
              frameClassName="relative border-4 border-white/80 shadow-xl"
              loading="eager"
            />
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-xl font-semibold leading-tight text-gray-900">
              {PROFILE.name}
            </h1>

            <p className="text-sm leading-tight text-gray-600">
              {PROFILE.title}
            </p>
          </div>
        </div>

        <InstitutionLogos />

        <SocialLinks className="profile-social-group flex w-full max-w-[10rem] flex-wrap justify-center gap-4" />
      </div>
    </aside>
  )
}
