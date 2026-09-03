import { PROFILE } from "@/data/content"
import { cn } from "@/utils/cn"

type ProfileAvatarProps = {
  sizeClassName: string
  frameClassName?: string
  loading?: "eager" | "lazy"
}

export function ProfileAvatar({
  sizeClassName,
  frameClassName = "",
  loading = "lazy",
}: ProfileAvatarProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-[#6a6766]",
        sizeClassName,
        frameClassName,
      )}
    >
      <img
        src={PROFILE.photo}
        alt={PROFILE.name}
        loading={loading}
        decoding="async"
        draggable={false}
        className="block h-full w-full rounded-full object-cover object-center select-none"
      />
    </div>
  )
}
