import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { SAMPLE_CONTENT } from "./fixtures.mjs"
import { buildJsonLd } from "./jsonLd.mjs"
import { buildRoutes } from "./routes.mjs"
import { SISTER_SITE_URL, SITE_URL } from "./site.mjs"

const routes = buildRoutes(SAMPLE_CONTENT)
const graph = buildJsonLd(SAMPLE_CONTENT, routes)["@graph"]
const ofType = (nodes, type) => nodes.filter((node) => node["@type"] === type)
const personId = `${SITE_URL}/#person`

describe("buildJsonLd", () => {
  it("splits the name, links the employer through the bio, and lists the lab and schools as affiliations", () => {
    const [person] = ofType(graph, "Person")
    assert.equal(person.givenName, "Ada")
    assert.equal(person.familyName, "Lovelace")
    assert.deepEqual(person.worksFor, { "@type": "Organization", name: "Analytical Engine Society", url: "https://example.org/society" })
    assert.deepEqual(person.affiliation, [
      { "@type": "Organization", name: "Engine Lab", url: "https://example.org/lab" },
      { "@type": "EducationalOrganization", name: "University of London" },
      { "@type": "EducationalOrganization", name: "Royal Society" }
    ])
    assert.deepEqual(person.sameAs, ["https://github.com/ada", "https://x.com/ada", SISTER_SITE_URL])
    assert.equal(person.description, "Analyst at Analytical Engine Society.")
  })

  it("describes the site once, authored and published by the person", () => {
    const sites = ofType(graph, "WebSite")
    assert.equal(sites.length, 1)
    assert.deepEqual(sites[0].author, { "@id": personId })
    assert.deepEqual(sites[0].publisher, { "@id": personId })
  })

  it("uses the PDF link as the article url, lists the other links, and references the person by id", () => {
    const [notes] = ofType(graph, "ScholarlyArticle")
    assert.equal(notes.url, "https://example.org/notes.pdf")
    assert.equal(notes["@id"], notes.url)
    assert.deepEqual(notes.subjectOf, [{ "@type": "WebPage", name: "Code", url: "https://example.org/code" }])
    assert.deepEqual(notes.publication, { "@type": "PublicationEvent", name: "Scientific Memoirs 1843" })
    assert.deepEqual(notes.author, [{ "@id": personId }, { "@type": "Person", name: "Luigi Menabrea" }])
  })

  it("anchors a paper without links on the publications page and marks it under review", () => {
    const [, draft] = ofType(graph, "ScholarlyArticle")
    assert.equal(draft.url, `${SITE_URL}/publications/#publications-draft-notes`)
    assert.equal(draft.creativeWorkStatus, "Under review")
    assert.equal(draft.subjectOf, undefined)
    assert.equal(draft.publication, undefined)
  })

  it("keeps the person and articles on a section route and swaps only the page node", () => {
    const sectionGraph = buildJsonLd(SAMPLE_CONTENT, routes, routes[2])["@graph"]
    assert.deepEqual(
      sectionGraph.filter((node) => node["@type"] !== "WebPage"),
      graph.filter((node) => node["@type"] !== "ProfilePage")
    )
    const page = sectionGraph.find((node) => node["@type"] === "WebPage")
    assert.equal(page["@id"], `${SITE_URL}/research/`)
    assert.equal(page.name, "Research | Ada Lovelace")
    assert.deepEqual(page.about, { "@id": personId })
  })
})
