import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { BODY_MARKERS, HEAD_MARKERS, extractBetween, replaceBetween } from "./markers.mjs"

describe("markers", () => {
  it("extracts the text between markers and throws when they are missing or reversed", () => {
    assert.equal(extractBetween("<a><!-- seo:head -->inner<!-- /seo:head --></a>", HEAD_MARKERS), "inner")
    assert.throws(() => extractBetween("<!-- /seo:head --><!-- seo:head -->", HEAD_MARKERS), /Markers/)
    assert.throws(() => extractBetween("nothing", BODY_MARKERS), /Markers/)
  })

  it("reads back exactly what replaceBetween wrote", () => {
    const html = replaceBetween("<div>\n  <!-- seo:body -->\n  old\n  <!-- /seo:body -->\n</div>", BODY_MARKERS, "x\ny", "  ")
    assert.equal(extractBetween(html, BODY_MARKERS), "\n  x\n  y\n  ")
  })
})
