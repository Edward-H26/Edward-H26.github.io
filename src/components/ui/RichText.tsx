import type { BioSegment } from "@/data/content"
import { getSegmentKey } from "@/utils/content"

interface RichTextProps {
  segments: BioSegment[]
  inline?: boolean
}

export function RichText({ segments, inline = false }: RichTextProps) {
  const Wrapper = inline ? "span" : "p"

  return (
    <Wrapper className="m-0">
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
    </Wrapper>
  )
}
