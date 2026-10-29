import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { SAMPLE_CONTENT } from "./fixtures.mjs"
import { DESCRIPTION_MAX_LENGTH, buildRoutes, routeUrl } from "./routes.mjs"
import { SITE_DESCRIPTION, SITE_URL } from "./site.mjs"

describe("routeUrl", () => {
  it("keeps the bare origin for home and adds a trailing slash to every other route", () => {
    assert.equal(routeUrl("/"), `${SITE_URL}/`)
    assert.equal(routeUrl("/info"), `${SITE_URL}/info/`)
  })
})

describe("buildRoutes", () => {
  const routes = buildRoutes(SAMPLE_CONTENT)

  it("lists home first and then one route per navigation item that has a section", () => {
    assert.deepEqual(
      routes.map((route) => route.path),
      ["/", "/publications", "/research", "/info"]
    )
  })

  it("titles home with the name and role and reuses the site description", () => {
    assert.deepEqual(routes[0], { path: "/", title: "Ada Lovelace | Analyst", description: SITE_DESCRIPTION })
  })

  it("titles a section with its heading and describes it with its distinct card titles", () => {
    assert.equal(routes[1].title, "Publications | Ada Lovelace")
    assert.equal(
      routes[1].description,
      "Publications of Ada Lovelace, Analyst at Analytical Engine Society: Notes on the Analytical Engine; Draft Notes."
    )
    assert.equal(routes[3].description, "Info of Ada Lovelace, Analyst at Analytical Engine Society: Education.")
  })

  it("cuts a long description to the snippet limit", () => {
    const cards = Array.from({ length: 6 }, (_, index) => ({
      title: `A very long project title number ${index + 1} about something`,
      bullets: []
    }))
    const research = { id: "research", heading: "Research", cards }
    const [route] = buildRoutes({ ...SAMPLE_CONTENT, SECTIONS: { ...SAMPLE_CONTENT.SECTIONS, research } }).filter(
      (entry) => entry.path === "/research"
    )
    assert.ok(route.description.length <= DESCRIPTION_MAX_LENGTH)
    assert.ok(route.description.endsWith("…"))
  })
})
