import { cn } from "@/utils/cn"

interface DateRangeProps {
  date: string
  className?: string
}

// Every date range on the site (research, experience, projects) renders through this one style.
export function DateRange({ date, className }: DateRangeProps) {
  return <span className={cn("text-sm font-medium tabular-nums text-gray-500", className)}>{date}</span>
}
