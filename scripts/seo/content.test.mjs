import assert from "node:assert/strict"
import { before, describe, it } from "node:test"
import { loadContent } from "./content.mjs"

// The invariants that the data modules document and that the generator and the pages rely on.
describe("site content", () => {
  let content
  before(async () => {
    content = await loadContent()
  })

  it("keys every section by its own id", () => {
    for (const [key, section] of Object.entries(content.SECTIONS)) assert.equal(section.id, key)
  })

  it("has a section for every navigation item except home", () => {
    for (const item of content.NAV_ITEMS) {
      if (item.path !== "/") assert.ok(content.SECTIONS[item.path.slice(1)], item.path)
    }
  })

  it("lists every highlighted skill in a skill category", () => {
    const all = new Set(Object.values(content.SKILLS_CATEGORIES).flat())
    for (const skill of content.PROFESSIONAL_SKILLS) assert.ok(all.has(skill), skill)
  })
})
