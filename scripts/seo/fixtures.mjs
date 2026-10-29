// Minimal site content for the unit tests, shaped like src/data/index.ts but small enough to
// reason about by hand. The real content is covered by scripts/seo.test.mjs.
export const SAMPLE_CONTENT = {
  PROFILE: {
    name: "Ada Lovelace",
    title: "Analyst",
    affiliation: "Analytical Engine Society",
    email: "ada@example.org",
    phone: "+1 (555) 010-0000",
    photo: "/images/ada.jpg",
    social: { github: "https://github.com/ada", x: "https://x.com/ada" }
  },
  NAV_ITEMS: [
    { path: "/", label: "Home" },
    { path: "/publications", label: "Publications" },
    { path: "/research", label: "Research" },
    { path: "/info", label: "Info" },
    { path: "/talks", label: "Talks" }
  ],
  HOME_BIO: [[{ text: "Analyst at " }, { text: "Analytical Engine Society", href: "https://example.org/society" }, { text: "." }]],
  ANNOUNCEMENT: { text: "Open to collaborations." },
  NEWS: [{ date: "May 2026", segments: [{ text: "Paper accepted." }] }],
  RESEARCH_INTERESTS: ["Computing", "Mathematics"],
  SECTIONS: {
    research: {
      id: "research",
      heading: "Research",
      subheading: "Labs",
      cards: [
        {
          title: "Engine Lab",
          subtitle: "Member",
          location: "London",
          date: "1843 - Present",
          bullets: ["Wrote the first program."],
          links: [{ label: "Lab", url: "https://example.org/lab" }]
        }
      ]
    },
    publications: {
      id: "publications",
      heading: "Publications",
      subheading: "Papers",
      cards: [
        {
          title: "Notes on the Analytical Engine",
          bullets: ["[1] Ada Lovelace, Luigi Menabrea. Notes on the Analytical Engine. Scientific Memoirs 1843."],
          links: [
            { label: "PDF", url: "https://example.org/notes.pdf" },
            { label: "Code", url: "https://example.org/code" }
          ]
        },
        { title: "Draft Notes", bullets: ["[2] Ada Lovelace. Draft Notes. Under review."] }
      ]
    },
    info: {
      id: "info",
      heading: "Info",
      cards: [
        { title: "Education", bullets: ["University of London, London", "B.A."] },
        { title: "Education", bullets: ["Royal Society, London"] }
      ]
    }
  },
  SKILLS_CATEGORIES: { Languages: ["Ada", "Fortran"] }
}
