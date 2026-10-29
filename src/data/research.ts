import type { ContentSection } from "./types"

/** Research positions, newest first. */
export const RESEARCH: ContentSection = {
  id: "research",
  heading: "Research",
  subheading: "Labs and Experience",
  cards: [
    {
      title: "Computer Vision and Machine Learning Group, University of Illinois Urbana-Champaign",
      subtitle: "Undergraduate Research Assistant (Advisor: Prof. Yaoyao Liu)",
      location: "Champaign, IL",
      date: "2025.05 - Present",
      bullets: [
        "Develop adaptive conditioning methods for 3D-aware synthetic data generation to enhance world model understanding and embodied agent performance in interactive simulations with geometry-conditioned diffusion approaches, reducing FID by 32.8% on ImageNet and enhancing pose accuracy by 4.2x on PASCAL3D+.",
        "Scale foundation model training across TB-level datasets on National Center for Supercomputing Applications (NCSA) HPC clusters to enforce multi-view consistency with 4-bit NF4 quantization and low-level custom kernels, improving pose accuracy by 11.3% on PASCAL3D+ and reducing generation latency by 78.7% at p95.",
        "Build camera-controlled novel view synthesis in video generation to advance real-time perception for SLAM, visual odometry, and 3D reconstruction, decreasing LPIPS by 21.0% on GSO and FV4D by 52.0% on OmniObject3D compared to SV4D 2.0.",
      ],
      links: [{ label: "Lab", url: "https://vision.ischool.illinois.edu/people/" }],
    },
    {
      title: "Multi-modal Generative Models for Continual Learning, University of Illinois Urbana-Champaign",
      subtitle: "Undergraduate Research Assistant (Advisor: Prof. Yaoyao Liu)",
      location: "Champaign, IL",
      date: "2026.02 - 2026.08",
      bullets: [
        "Selected for NVIDIA Academic Grant Program Award, AMD University Program, and Lambda Research Grant to streamline class-incremental learning in multimodal foundation models across audio, image, and text without catastrophic forgetting or cross-modal alignment drift, increasing R@1 by 27.6% on AudioSet.",
        "Implemented post-hoc tensor-level weight interpolation for multimodal retrieval on National Artificial Intelligence Research Resource (NAIRR) HPC clusters, training 499 sigmoid-parameterized coefficients instead of 182M parameters and increasing R@1 by 33.5% on AudioSet.",
        "Optimized checkpoint fusion pipelines to compose frozen continual-learning checkpoints into one deployable model without additional inference latency, boosting last-task accuracy by 40.9% on UrbanSound8K.",
      ],
      links: [
        {
          label: "NVIDIA Grant",
          url: "https://ischool.illinois.edu/news-events/news/2026/04/liu-receives-support-ai-project-through-nvidia-academic-grant-program",
        },
      ],
    },
    {
      title: "REVA: Reusable Evidence View Aggregation for Context-Efficient RAG Serving",
      subtitle: "Undergraduate Research Assistant, University of Illinois Urbana-Champaign (Advisor: Prof. Fan Lai)",
      location: "Champaign, IL",
      date: "2026.02 - 2026.06",
      bullets: [
        "Proposed attention-based scoring for post-retrieval context compression in retrieval-augmented generation (RAG) to reuse generator attention traces across queries and update scores offline, achieving a 91.6% cache hit rate on HotpotQA.",
        "Built reusable evidence views keyed to unique documents to scale compression cost with documents rather than query volume, improving F1 by 13.2% on Natural Questions and decreasing online compression overhead by 6.1x at under 40 ms per request.",
        "Optimized online serving to keep context compression off the GPU critical path for high-volume production RAG traffic under strict per-request latency targets, minimizing compression latency by 99.3% compared to EXIT and 99.8% compared to FaviComp.",
      ],
      links: [{ label: "IEEE ICDM 2026", url: "https://arxiv.org/abs/2609.11209" }],
    },
  ],
}
