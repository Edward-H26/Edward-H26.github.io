import { cn } from "@/lib/utils"

interface BentoItemProps {
  children: React.ReactNode
  className?: string
  colSpan?: 1 | 2 | 3 | 4
  rowSpan?: 1 | 2
}

const colSpanClasses = {
  1: "",
  2: "md:col-span-2",
  3: "md:col-span-2 lg:col-span-3",
  4: "md:col-span-2 lg:col-span-4",
}

const rowSpanClasses = {
  1: "",
  2: "row-span-2",
}

export function BentoItem({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
}: BentoItemProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 p-6 transition-shadow duration-300 h-full",
        "hover:shadow-xl hover:shadow-accent/5 hover:border-accent/20",
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  )
}
