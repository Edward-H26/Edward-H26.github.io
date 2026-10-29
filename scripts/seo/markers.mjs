// The generated blocks live between HTML comment markers in index.html, so the generator can
// replace them on every run without touching the hand-written parts of the file.

/** Markers around the generated metadata inside <head>. */
export const HEAD_MARKERS = ["<!-- seo:head -->", "<!-- /seo:head -->"]

/** Markers around the static profile inside the root element. */
export const BODY_MARKERS = ["<!-- seo:body -->", "<!-- /seo:body -->"]

/** Indentation of the lines inside each block, matching where the markers sit in index.html. */
export const HEAD_INDENT = "    "
export const BODY_INDENT = "      "

/** The text between two markers; throws when either marker is missing. */
export function extractBetween(html, [start, end]) {
  const from = html.indexOf(start)
  const to = html.indexOf(end)
  if (from < 0 || to < from) throw new Error(`Markers ${start} and ${end} were not found`)
  return html.slice(from + start.length, to)
}

/** Replaces the text between two markers with the indented replacement, keeping the markers. */
export function replaceBetween(html, [start, end], replacement, indent) {
  const from = html.indexOf(start)
  const to = html.indexOf(end)
  if (from < 0 || to < from) throw new Error(`Markers ${start} and ${end} were not found`)
  const block = replacement
    .split("\n")
    .map((line) => indent + line)
    .join("\n")
  return `${html.slice(0, from + start.length)}\n${block}\n${indent}${html.slice(to)}`
}
