import type { ContentSection } from "./types"

/** Research projects; the first card is featured at double size on the projects grid. */
export const PROJECTS: ContentSection = {
  id: "projects",
  heading: "Projects",
  subheading: "Research Projects",
  cards: [
    {
      title: "Long-Form Video-Language and Audio-Visual Social Understanding",
      subtitle: "Undergraduate Research Assistant, University of Illinois Urbana-Champaign",
      location: "Champaign, IL",
      date: "2025.12 - 2026.05",
      bullets: [
        "Trained streaming video-language models with temporal transformer blocks for long-form video understanding beyond 30-minute sequences, boosting zero-shot accuracy by 17.4%.",
        "Designed context fluidity pipelines to fuse facial action units, body pose, and prosody through cross-modal attention and infer social intent and conversational role from raw recordings, achieving 89.1% accuracy on speaker-role classification.",
        "Built end-to-end annotation pipelines for full-length clinical sessions with automatic transcription and labeling, increasing speaker-role inversion accuracy to 90.0%.",
      ],
    },
    {
      title: "Multi-agent Research Synthesis Engine",
      subtitle: "Undergraduate Research Assistant",
      location: "Champaign, IL",
      date: "2025.11 - 2026.05",
      bullets: [
        "Orchestrated eight specialized agents across a 12-step workflow for automated literature synthesis to cover planning, retrieval, drafting, reflection, and safety review in a single loop with LLM-as-judge evaluation, achieving 95.5% accuracy on deep research pipelines.",
        "Developed concurrent multi-source retrieval across Semantic Scholar and Tavily with production-grade fallback handling for API failures, minimizing query latency by 40.2%.",
        "Built customized Model Context Protocol servers to centralize governed tool access behind unified interfaces over academic databases, code repositories, and document stores, minimizing serving latency by 87.5%.",
      ],
      links: [{ label: "Project Page", url: "https://salt-lab-human-ai-assignment-3-buildi-srcuistreamlit-app-zweknl.streamlit.app/" }],
    },
    {
      title: "Realistic Neural Style Transfer Architecture",
      subtitle: "Undergraduate Research Assistant",
      location: "Champaign, IL",
      date: "2025.01 - 2025.08",
      bullets: [
        "Proposed style transfer frameworks to maintain photorealistic results under highly abstract styles with VGG perceptual losses and edge-preserving constraints, improving SSIM by 77.0% and MS-SSIM by 49.0% compared to TensorFlow's NST.",
        "Proposed multi-layer Gram matrix losses with adaptive layer weighting to suppress texture and chromatic artifacts, boosting SSIM by 4.4x and MS-SSIM by 6.4x compared to ChatGPT-4o.",
      ],
      links: [{ label: "GitHub", url: "https://github.com/Edward-H26/Realistic-Neural-Style-Transfer-Architecture" }],
    },
    {
      title: "Anime Statistics and Analysis Platform, ASAP",
      subtitle: "Undergraduate Research Assistant",
      location: "Champaign, IL",
      date: "2025.02 - 2025.06",
      bullets: [
        "Deployed interactive R Shiny analytics platforms to surface anime popularity trends and market opportunities with live Jikan REST API data and predictive analysis on shinyapps.io.",
      ],
      links: [{ label: "GitHub", url: "https://github.com/Edward-H26/Anime-Statistics-and-Analysis-Platform-ASAP" }],
    },
  ],
}
