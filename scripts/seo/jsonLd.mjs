import { parseCitation } from "./citation.mjs"
import { routeUrl } from "./routes.mjs"
import { SISTER_SITE_URL, SITE_DESCRIPTION, SITE_URL } from "./site.mjs"
import { cardIds, segmentsToText, splitName } from "./text.mjs"

/** The href of the bio segment whose text is exactly `text`, if that segment is a link. */
function findHref(paragraphs, text) {
  return paragraphs.flat().find((segment) => segment.text === text && segment.href)?.href
}

/**
 * A ScholarlyArticle for one publication card. The arXiv, paper, or PDF link is the article's
 * URL; without any link the card's anchor on the publications page stands in.
 * @param {import("../../src/data/index.js").ContentCard} card
 */
function buildArticle(card, cardId, profile, personId) {
  const { authors, title, venue } = parseCitation(card.bullets[0] ?? "", card.title)
  const links = card.links ?? []
  const primary = links.find((link) => /arxiv|paper|pdf/i.test(link.label)) ?? links[0]
  const url = primary?.url ?? `${routeUrl("/publications")}#${cardId}`
  const related = links.filter((link) => link !== primary).map((link) => ({ "@type": "WebPage", name: link.label, url: link.url }))
  const status = /under review/i.test(venue)
    ? { creativeWorkStatus: "Under review" }
    : venue
      ? { publication: { "@type": "PublicationEvent", name: venue } }
      : {}
  return {
    "@type": "ScholarlyArticle",
    "@id": url,
    headline: title,
    name: title,
    url,
    author: authors.map((name) => (name === profile.name ? { "@id": personId } : { "@type": "Person", name })),
    ...(related.length ? { subjectOf: related } : {}),
    ...status
  }
}

/**
 * The schema.org graph of a route: the Person, the WebSite, the page itself (a ProfilePage on the
 * home route that lists the other routes, otherwise a WebPage), and one ScholarlyArticle per paper.
 * @param {import("./content.mjs").SiteContent} content
 * @param {import("./routes.mjs").Route[]} routes every route, home first
 * @param {import("./routes.mjs").Route} [route] the route being described, home by default
 */
export function buildJsonLd(content, routes, route = routes[0]) {
  const { PROFILE, HOME_BIO, RESEARCH_INTERESTS, SECTIONS } = content
  const personId = `${SITE_URL}/#person`
  const websiteId = `${SITE_URL}/#website`
  const { givenName, familyName } = splitName(PROFILE.name)
  const lab = SECTIONS.research.cards[0]
  const schools = SECTIONS.info.cards
    .filter((card) => card.title === "Education")
    .map((card) => ({ "@type": "EducationalOrganization", name: card.bullets[0].split(",")[0] }))
  const home = routes[0]
  const page =
    route.path === "/"
      ? {
          "@type": "ProfilePage",
          "@id": `${SITE_URL}/#profilepage`,
          url: `${SITE_URL}/`,
          name: home.title,
          description: home.description,
          inLanguage: "en",
          isPartOf: { "@id": websiteId },
          mainEntity: { "@id": personId },
          hasPart: routes.slice(1).map((other) => ({
            "@type": "WebPage",
            "@id": routeUrl(other.path),
            url: routeUrl(other.path),
            name: other.title,
            description: other.description,
            isPartOf: { "@id": websiteId }
          }))
        }
      : {
          "@type": "WebPage",
          "@id": routeUrl(route.path),
          url: routeUrl(route.path),
          name: route.title,
          description: route.description,
          inLanguage: "en",
          isPartOf: { "@id": websiteId },
          about: { "@id": personId }
        }
  const publicationIds = cardIds(SECTIONS.publications)
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: PROFILE.name,
        givenName,
        familyName,
        jobTitle: PROFILE.title,
        description: HOME_BIO.map(segmentsToText).join(" "),
        email: `mailto:${PROFILE.email}`,
        telephone: PROFILE.phone,
        url: `${SITE_URL}/`,
        image: `${SITE_URL}${PROFILE.photo}`,
        worksFor: { "@type": "Organization", name: PROFILE.affiliation, url: findHref(HOME_BIO, PROFILE.affiliation) },
        affiliation: [{ "@type": "Organization", name: lab.title, url: lab.links?.[0]?.url }, ...schools],
        sameAs: [...Object.values(PROFILE.social), SISTER_SITE_URL],
        knowsAbout: RESEARCH_INTERESTS
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${SITE_URL}/`,
        name: PROFILE.name,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        author: { "@id": personId },
        publisher: { "@id": personId }
      },
      page,
      ...SECTIONS.publications.cards.map((card, index) => buildArticle(card, publicationIds[index], PROFILE, personId))
    ]
  }
}
