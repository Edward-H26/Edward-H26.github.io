import type { NewsItem } from "./types"

/** News lines on the home page, newest first. */
export const NEWS: readonly NewsItem[] = [
  {
    date: "September 2026",
    segments: [
      { text: "I am honored to join " },
      { text: "IBM Research", href: "https://research.ibm.com/" },
      { text: " as a Research Intern advised by Dr. Dhaval Patel to work on Causal Diagnosis and Intervention Evaluation for " },
      { text: "AssetOpsBench", href: "https://github.com/IBM/AssetOpsBench" },
      { text: "." },
    ],
  },
  {
    date: "September 2026",
    segments: [
      { text: "I am honored to present our poster " },
      { text: "AC3S: Adaptive Conditioning for 3D-Aware Synthetic Data Generation", href: "https://arxiv.org/abs/2606.31204" },
      { text: " at the " },
      { text: "European Conference on Computer Vision (ECCV) 2026", href: "https://eccv.ecva.net/Conferences/2026" },
      { text: " in " },
      { text: "Malmö, Sweden", href: "https://eccv.ecva.net/Conferences/2026/Venues" },
      { text: ", " },
      { text: "ExHall #107 on September 12" },
      { text: "." },
    ],
  },
  {
    date: "August 2026",
    segments: [
      { text: "Our paper " },
      { text: "REVA: Reusable Evidence View Aggregation for Context-Efficient RAG Serving", href: "https://arxiv.org/abs/2609.11209" },
      { text: " is accepted to the " },
      { text: "IEEE International Conference on Data Mining (ICDM) 2026", href: "https://www.datamining.org/" },
      { text: "." },
    ],
  },
  {
    date: "June 2026",
    segments: [
      { text: "Our paper " },
      { text: "AC3S: Adaptive Conditioning for 3D-Aware Synthetic Data Generation", href: "https://arxiv.org/abs/2606.31204" },
      { text: " is accepted to the " },
      { text: "European Conference on Computer Vision (ECCV) 2026", href: "https://eccv.ecva.net/Conferences/2026" },
      { text: "." },
    ],
  },
]
