/**
 * Splits a citation bullet into its parts.
 *
 * Citations look like "[1] A. Author, B. Author. Title. Venue." and a card title may be only a prefix
 * of the full title, so the title is located inside the citation and its terminator is searched
 * from the end of the known title (author initials and abbreviations contain periods too).
 * A closing "." is dropped from the title while "?" and "!" belong to it.
 * @param {string} citation
 * @param {string} title the card title, returned unchanged when the citation does not contain it
 * @returns {{ authors: string[], title: string, venue: string }}
 */
export function parseCitation(citation, title) {
  const body = citation.replace(/^\[\d+\]\s*/, "")
  const start = body.indexOf(title)
  if (start < 0) return { authors: [], title, venue: "" }
  const rest = body.slice(start)
  const terminator = /[.?!](?=\s|$)/g
  terminator.lastIndex = Math.max(0, title.length - 1)
  const hit = terminator.exec(rest)
  const fullTitle = hit ? rest.slice(0, hit[0] === "." ? hit.index : hit.index + 1) : rest
  const venue = hit
    ? rest
        .slice(hit.index + 1)
        .trim()
        .replace(/\.\s*$/, "")
    : ""
  const authors = body
    .slice(0, start)
    .replace(/\.\s*$/, "")
    .split(/\s*,\s*(?:and\s+|&\s*)?|\s+and\s+|\s*&\s*/)
    .map((author) => author.trim().replace(/\s+et\s+al\.?$/i, ""))
    .filter((author) => author && !/^et\s+al\.?$/i.test(author))
  return { authors, title: fullTitle, venue }
}
