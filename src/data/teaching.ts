import type { ContentSection } from "./types"

/** Teaching roles. */
export const TEACHING: ContentSection = {
  id: "teaching",
  heading: "Teaching",
  subheading: "Courses and Mentoring",
  cards: [
    {
      title: "CS 107 Data Science Discovery, University of Illinois Urbana-Champaign",
      subtitle: "Teaching Assistant",
      location: "Champaign, IL",
      date: "2023.08 - 2026.05",
      bullets: [
        "Led weekly lab sections and office hours for in-person and online sessions, mentoring 1,200 students every semester through data science foundations in Python, statistical inference, data wrangling, and machine learning.",
        "Authored DISCOVERY Guides on the course website to provide detailed explanations with applied Python and statistics walkthroughs.",
        "Designed problem sets, exam questions, test suites, and autograder scripts to deliver instant, consistent feedback to 1,200 students every semester on Mastery Platform.",
      ],
      links: [
        { label: "Guides", url: "https://discovery.cs.illinois.edu/guides/" },
        { label: "Mastery", url: "https://mastery.cs.illinois.edu/" },
      ],
    },
  ],
}
