import type { BioSegment } from "./types"

/** Biography paragraphs on the home page; each inner array is one paragraph of text runs and links. */
export const HOME_BIO: readonly (readonly BioSegment[])[] = [
  [
    { text: "I am a current M.S. student in " },
    {
      text: "Fu Foundation School of Engineering and Applied Science",
      href: "https://www.engineering.columbia.edu/",
    },
    { text: " at " },
    {
      text: "Columbia University",
      href: "https://www.columbia.edu/",
    },
    { text: "." },
  ],
  [
    { text: "I am a research assistant in the " },
    {
      text: "Computer Vision and Machine Learning Group",
      href: "https://vision.ischool.illinois.edu/people/",
    },
    { text: " at " },
    {
      text: "University of Illinois Urbana-Champaign",
      href: "https://www.illinois.edu/",
    },
    { text: ". I am also affiliated with the " },
    {
      text: "National Center for Supercomputing Applications",
      href: "https://www.ncsa.illinois.edu/",
    },
    { text: " and " },
    {
      text: "National Artificial Intelligence Research Resource Pilot",
      href: "https://nairrpilot.org/",
    },
    { text: "." },
  ],
  [
    { text: "Previously, I received my B.S. in Data Science and Information Science with minors in Computer Science and Statistics at " },
    {
      text: "University of Illinois Urbana-Champaign",
      href: "https://www.illinois.edu/",
    },
    { text: "." },
  ],
  [
    {
      text: "I am an applied AI researcher and full-stack software engineer creating new ways for people to interact with AI. I push the frontier of agentic experiences through rapid internal experiments. My research spans recursive self-evolving multi-agent orchestration, dynamic context engineering for long-term memory, 3D-aware generative modeling, multimodal reasoning, and the next generation of human-AI interfaces.",
    },
  ],
]

/** Call for collaborations shown under the research interests on the home page. */
export const ANNOUNCEMENT = {
  text: "I am actively looking for research collaborations in 3D and 4D aware generative modeling, continual multimodal learning, and agentic AI systems with long-horizon memory. Feel free to reach out if you are interested in working together!",
} as const
