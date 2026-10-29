import type { ContentSection } from "./types"

/**
 * Personal information. The Info page picks cards by title ("Languages", "Certifications and
 * Honors", "Education") and shows the first bullet of each Education card as the school name.
 */
export const INFO: ContentSection = {
  id: "info",
  heading: "Info",
  subheading: "Personal Information",
  cards: [
    {
      title: "Languages",
      bullets: ["Chinese (native)", "English (native)", "Spanish (limited working proficiency)"],
    },
    {
      title: "Certifications and Honors",
      bullets: ["Neo4j Certified Professional", "Neo4j Graph Data Science Certification"],
      links: [
        { label: "Neo4j Professional", url: "https://graphacademy.neo4j.com/c/2e386da7-2b30-4575-9fd0-b0b0918a6fe0/" },
        { label: "Neo4j GDS", url: "https://graphacademy.neo4j.com/c/6559f827-9dca-4199-bc9d-8be10fd74891/" },
      ],
    },
    {
      title: "Education",
      bullets: [
        "Columbia University, New York, NY",
        "M.S. in Data Science",
        "Fu Foundation School of Engineering and Applied Science",
        "Courses: High Performance Machine Learning, Algorithms, Continual Learning and Memory Models, Computer Systems",
        "2026.08 - Expected 2028.05",
      ],
    },
    {
      title: "Education",
      bullets: [
        "University of Illinois Urbana-Champaign, Champaign, IL",
        "B.S. in Data Science and Information Science",
        "Minors: Computer Science and Statistics",
        "Siebel School of Computing and Data Science",
        "Honors: Dean's List and James Scholar",
        "Courses: Applied Machine Learning, Generative AI for Human-AI Collaboration, Advanced AI Web-App Development, Graph Databases, Data Visualization, Computational Photography, Linear Algebra with Computational Applications",
        "2022.08 - 2026.05",
      ],
    },
  ],
}
