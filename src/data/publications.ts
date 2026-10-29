import type { ContentCard, ContentSection } from "./types"

/** Authoring shape of a paper. The citation bullet is derived, so it is never written by hand. */
type Publication = Required<Pick<ContentCard, "title" | "authors" | "venue">> & Pick<ContentCard, "badge" | "image" | "links" | "note">

// The citation bullet feeds the SEO pages, llms.txt, and the tests, so it is derived from the
// structured fields rather than written twice.
function toCard(entry: Publication, index: number): ContentCard {
  return {
    ...entry,
    bullets: [`[${index + 1}] ${entry.authors.join(", ")}. ${entry.title}. ${entry.venue}.`],
  }
}

const PAPERS: readonly Publication[] = [
  {
    title: "AC3S: Adaptive Conditioning for 3D-Aware Synthetic Data Generation",
    authors: ["Eric Ji", "Qiran Hu", "Wufei Ma", "Sarthak Jain", "Yingying Li", "Minh N. Do", "Yaoyao Liu"],
    venue: "European Conference on Computer Vision (ECCV) 2026",
    badge: "ECCV",
    image: {
      src: "/images/papers/ac3s.webp",
      width: 1200,
      height: 675,
      alt: "AC3S pipeline: visual prompt extractor, adaptive modulator, image generator, and multi-agent VLM",
    },
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2606.31204" },
      { label: "Code", url: "https://ac3s.cvmlgroup.web.illinois.edu/" },
      { label: "Video", url: "https://youtu.be/3jOJaT2a8iQ" },
      { label: "BibTeX", url: "https://arxiv.org/bibtex/2606.31204" },
    ],
  },
  {
    title: "REVA: Reusable Evidence View Aggregation for Context-Efficient RAG Serving",
    authors: ["Tuan Nguyen", "Qiran Hu", "Banruo Liu", "Khoa D. Doan", "Kok-Seng Wong", "Fan Lai"],
    venue: "IEEE International Conference on Data Mining (ICDM) 2026",
    badge: "ICDM",
    image: {
      src: "/images/papers/reva.webp",
      width: 1200,
      height: 675,
      alt: "The REVA system: past requests leave reusable word scores in a word-score store, and a new request materializes per-document views from them",
    },
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2609.11209" },
      { label: "Code", url: "https://github.com/UIUC-MLSys/REVA" },
      { label: "BibTeX", url: "https://arxiv.org/bibtex/2609.11209" },
    ],
  },
  {
    title: "ACDN: Agent-Aware Content Delivery Network",
    authors: ["Tuan Nguyen", "Qiran Hu", "Dibyadeep Saha", "Banruo Liu", "Khoa D. Doan", "Kok-Seng Wong", "Fan Lai"],
    venue: "Under review",
    badge: "Under review",
    image: { src: "/images/papers/acdn.webp", width: 1200, height: 675, alt: "No public figure yet; this paper is under review" },
  },
  {
    title: "SV4D 3.0: Single-Step 3D-Aware Diffusion for Multi-View-Consistent 4D Scene Generation",
    authors: ["Qiran Hu", "Wei Cao", "Yaoyao Liu"],
    venue: "Under review",
    badge: "Under review",
    image: { src: "/images/papers/sv4d.webp", width: 1200, height: 675, alt: "No public figure yet; this paper is under review" },
  },
  {
    title: "AISim: Using LLM-Simulation as Epistemic Scaffolds for Early Stage Qualitative Research Design",
    authors: ["Hangyue Zhang", "Qiran Hu", "Ziyi Zhang", "Hyanghee Park", "Yun Huang"],
    venue: "Under review",
    badge: "Under review",
    image: { src: "/images/papers/aisim.webp", width: 1200, height: 675, alt: "No public figure yet; this paper is under review" },
  },
  {
    title: "AlphaWiSE: Adaptive Weight Interpolation for Continual Multimodal Representation Learning",
    authors: ["Sarthak Jain", "Qiran Hu", "Zhen Zhu", "Yaoyao Liu"],
    venue: "Under review",
    badge: "Under review",
    image: { src: "/images/papers/alphawise.webp", width: 1200, height: 675, alt: "No public figure yet; this paper is under review" },
  },
]

/** Papers in display order; a paper's position in PAPERS is its citation number. */
export const PUBLICATIONS: ContentSection = {
  id: "publications",
  heading: "Publications",
  subheading: "Papers",
  cards: PAPERS.map(toCard),
}
