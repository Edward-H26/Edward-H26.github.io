import { Megaphone } from "lucide-react"

interface AnnouncementBoxProps {
  text: string
}

export function AnnouncementBox({ text }: AnnouncementBoxProps) {
  return (
    <div className="announcement-box">
      <div className="flex items-start gap-3">
        <Megaphone className="flex-shrink-0 w-5 h-5 text-accent-dark mt-0.5" />
        <p className="text-sm text-gray-700 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  )
}
