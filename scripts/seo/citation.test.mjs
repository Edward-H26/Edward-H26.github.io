import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parseCitation } from "./citation.mjs"

describe("parseCitation", () => {
  it("ignores a period inside the title that is not followed by a space", () => {
    const parsed = parseCitation(
      "[4] Qiran Hu, Wei Cao, Yaoyao Liu. SV4D 3.0: Single-Step 3D-Aware Diffusion. Under review.",
      "SV4D 3.0: Single-Step 3D-Aware Diffusion"
    )
    assert.deepEqual(parsed, {
      authors: ["Qiran Hu", "Wei Cao", "Yaoyao Liu"],
      title: "SV4D 3.0: Single-Step 3D-Aware Diffusion",
      venue: "Under review"
    })
  })

  it("keeps an exclamation mark that ends the title", () => {
    assert.deepEqual(parseCitation("[1] Ann Lee. Scale Is Enough! NeurIPS 2026.", "Scale Is Enough!"), {
      authors: ["Ann Lee"],
      title: "Scale Is Enough!",
      venue: "NeurIPS 2026"
    })
  })

  it("returns an empty venue when the citation ends with the title", () => {
    assert.deepEqual(parseCitation("[2] Ann Lee. Title Only.", "Title Only"), { authors: ["Ann Lee"], title: "Title Only", venue: "" })
  })

  it("returns no authors when the title opens an unnumbered citation", () => {
    assert.deepEqual(parseCitation("Title First. Venue 2026.", "Title First"), { authors: [], title: "Title First", venue: "Venue 2026" })
  })

  it("accepts a serial comma before and", () => {
    assert.deepEqual(parseCitation("[3] Ann Lee, Bo Li, and Qiran Hu. Short Paper. Workshop 2026.", "Short Paper").authors, [
      "Ann Lee",
      "Bo Li",
      "Qiran Hu"
    ])
  })
})
