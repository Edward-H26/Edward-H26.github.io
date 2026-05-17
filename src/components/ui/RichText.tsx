import type { BioSegment } from "@/data/content"
import { getSegmentKey } from "@/utils/content"

interface RichTextProps {
  segments: BioSegment[]
}

export function RichText({ segments }: RichTextProps) {
  return (
    <p className="m-0">
      {segments.map((segment, index) => (
        segment.href ? (
          <a
            key={getSegmentKey(segment, index)}
            href={segment.href}
            className="font-medium text-blue-500 hover:text-blue-600 hover:no-underline"
          >
            {segment.text}
          </a>
        ) : (
          <span key={getSegmentKey(segment, index)}>{segment.text}</span>
        )
      ))}
    </p>
  )
}
