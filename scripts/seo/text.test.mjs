import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { cardIds, cardMeta, escapeHtml, segmentsToHtml, segmentsToMarkdown, segmentsToText, slug, splitName, truncate } from "./text.mjs"

describe("escapeHtml", () => {
  it("escapes the characters that break markup and coerces other values to text", () => {
    assert.equal(escapeHtml(`a & b < c > d "e"`), "a &amp; b &lt; c &gt; d &quot;e&quot;")
    assert.equal(escapeHtml(42), "42")
  })
})

describe("segments", () => {
  const segments = [{ text: "See " }, { text: "the <lab>", href: "https://example.org/?a=1&b=2" }, { text: "." }]

  it("renders the same segments as plain text, escaped html, and markdown", () => {
    assert.equal(segmentsToText(segments), "See the <lab>.")
    assert.equal(segmentsToHtml(segments), 'See <a href="https://example.org/?a=1&amp;b=2">the &lt;lab&gt;</a>.')
    assert.equal(segmentsToMarkdown(segments), "See [the <lab>](https://example.org/?a=1&b=2).")
  })
})

describe("slug", () => {
  it("lowercases, collapses runs of punctuation and spaces, and trims hyphens", () => {
    assert.equal(slug("SV4D 3.0: Single-Step (4D) Generation!"), "sv4d-3-0-single-step-4d-generation")
    assert.equal(slug("  Hello  "), "hello")
  })
})

describe("truncate", () => {
  it("keeps text within the limit and cuts longer text at a word boundary with an ellipsis", () => {
    assert.equal(truncate("short", 10), "short")
    assert.equal(truncate("exactly ten", 11), "exactly ten")
    assert.equal(truncate("alpha beta gamma delta", 12), "alpha beta…")
    assert.equal(truncate("alpha beta gamma delta", 14), "alpha beta…")
    for (const max of [8, 12, 14, 20]) assert.ok(truncate("alpha beta gamma delta", max).length <= max)
  })
})

describe("splitName", () => {
  it("takes the first word as the given name and the rest as the family name", () => {
    assert.deepEqual(splitName("Minh N. Do"), { givenName: "Minh", familyName: "N. Do" })
    assert.deepEqual(splitName("Plato"), { givenName: "Plato", familyName: "" })
  })
})

describe("cardMeta", () => {
  it("joins subtitle, date, and location and drops the missing parts", () => {
    assert.equal(cardMeta({ subtitle: "Role", date: "2025", location: "Paris" }), "Role, 2025, Paris")
    assert.equal(cardMeta({ date: "2025" }), "2025")
    assert.equal(cardMeta({ title: "Languages" }), "")
  })
})

describe("cardIds", () => {
  it("prefixes ids with the section id and numbers repeated titles from 2", () => {
    const section = { id: "info", cards: [{ title: "Education" }, { title: "Education" }, { title: "Languages" }, { title: "Education" }] }
    assert.deepEqual(cardIds(section), ["info-education", "info-education-2", "info-languages", "info-education-3"])
  })
})
