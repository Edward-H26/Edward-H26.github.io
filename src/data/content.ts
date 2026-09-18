export type ContentLink = {
  label: string
  url: string
}

export type ContentCard = {
  title: string
  subtitle?: string
  location?: string
  date?: string
  bullets: string[]
  links?: ContentLink[]
  image?: { src: string; alt: string }
  badge?: string
  authors?: string[]
  venue?: string
  note?: string
}

type Publication = Required<Pick<ContentCard, "title" | "authors" | "venue">> &
  Pick<ContentCard, "badge" | "image" | "links" | "note">

// The citation bullet feeds the SEO pages, llms.txt, and the tests, so it is derived from the
// structured fields rather than written twice.
function publication(entry: Publication, index: number): ContentCard {
  return {
    ...entry,
    bullets: [`[${index + 1}] ${entry.authors.join(", ")}. ${entry.title}. ${entry.venue}.`],
  }
}

const PUBLICATIONS: Publication[] = [
  {
    title: "AC3S: Adaptive Conditioning for 3D-Aware Synthetic Data Generation",
    authors: ["Eric Ji", "Qiran Hu", "Wufei Ma", "Sarthak Jain", "Yingying Li", "Minh N. Do", "Yaoyao Liu"],
    venue: "European Conference on Computer Vision (ECCV), 2026",
    badge: "ECCV",
    image: { src: "/images/papers/ac3s.webp", alt: "AC3S pipeline: visual prompt extractor, adaptive modulator, image generator, and multi-agent VLM" },
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
    venue: "IEEE International Conference on Data Mining (ICDM), 2026",
    badge: "ICDM",
    image: { src: "/images/papers/reva.webp", alt: "Three charts from the paper: online overhead per query across five compressors, F1 change over global truncation on four QA datasets, and the share of queries that re-access a stored document" },
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2609.11209" },
      { label: "Code", url: "https://github.com/UIUC-MLSys/REVA" },
      { label: "BibTeX", url: "https://arxiv.org/bibtex/2609.11209" },
    ],
  },
  {
    title: "ACDN: Agent-Aware Content Delivery Network",
    authors: ["Tuan Nguyen", "Qiran Hu", "Dibyadeep Saha", "Banruo Liu", "Khoa D. Doan", "Kok-Seng Wong", "Fan Lai"],
    venue: "Under Review",
    badge: "Under Review",
    image: { src: "/images/papers/acdn.webp", alt: "No public figure yet; this paper is under review" },
  },
  {
    title: "SV4D 3.0: Single-Step 3D-Aware Diffusion for Multi-View-Consistent 4D Scene Generation",
    authors: ["Qiran Hu", "Wei Cao", "Yaoyao Liu"],
    venue: "Under Review",
    badge: "Under Review",
    image: { src: "/images/papers/sv4d.webp", alt: "No public figure yet; this paper is under review" },
  },
  {
    title: "AISim: Using LLM-Simulation as Epistemic Scaffolds for Early Stage Qualitative Research Design",
    authors: ["Hangyue Zhang", "Qiran Hu", "Ziyi Zhang", "Hyanghee Park", "Yun Huang"],
    venue: "Under Review",
    badge: "Under Review",
    image: { src: "/images/papers/aisim.webp", alt: "No public figure yet; this paper is under review" },
  },
  {
    title: "AlphaWiSE: Adaptive Weight Interpolation for Continual Multimodal Representation Learning",
    authors: ["Sarthak Jain", "Qiran Hu", "Zhen Zhu", "Yaoyao Liu"],
    venue: "Under Review",
    badge: "Under Review",
    image: { src: "/images/papers/alphawise.webp", alt: "No public figure yet; this paper is under review" },
  },
]

type ContentSection = {
  id: string
  heading: string
  subheading?: string
  cards: ContentCard[]
}

type NavItem = {
  path: string
  label: string
}

export type BioSegment = {
  text: string
  href?: string
}

export const PROFILE = {
  name: "Qiran Hu",
  title: "Research Assistant",
  affiliation: "University of Illinois Urbana-Champaign",
  email: "qh2332@columbia.edu",
  phone: "+1 (347)-957-9176",
  photo: "/images/profile-1024.jpg",
  social: {
    github: "https://github.com/Edward-H26",
    linkedin: "https://www.linkedin.com/in/qiranhu/",
    x: "https://x.com/QiranHu",
    scholar: "https://scholar.google.com/citations?user=4jv03f4AAAAJ&hl=en",
  },
}

// The navigation bar shows NAV_MAIN and tucks NAV_MORE behind a "More" menu. NAV_ITEMS is every
// route in order, which is what the router, the mobile menu, and the SEO generator walk.
export const NAV_MAIN: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/publications", label: "Publications" },
  { path: "/research", label: "Research" },
  { path: "/experience", label: "Experience" },
  { path: "/projects", label: "Projects" },
  { path: "/teaching", label: "Teaching" },
  { path: "/info", label: "Info" },
]

export const NAV_MORE: NavItem[] = [
  { path: "/service", label: "Service" },
]

export const NAV_ITEMS: NavItem[] = [...NAV_MAIN, ...NAV_MORE]

export const HOME_BIO: BioSegment[][] = [
  [
    { text: "I am a current student in " },
    {
      text: "Fu Foundation School of Engineering and Applied Science",
      href: "https://www.engineering.columbia.edu/about",
    },
    { text: " at " },
    {
      text: "Columbia University",
      href: "https://www.columbia.edu/",
    },
    { text: "." },
  ],
  [
    { text: "I am a research assistant in " },
    {
      text: "Computer Vision and Machine Learning Group",
      href: "https://vision.ischool.illinois.edu/index.html",
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
      text: "I am an applied AI researcher and full-stack software engineer creating new ways for people to interact with AI. I push the frontier of agentic experiences through rapid internal experiments. My research spans self-evolving multi-agent orchestration, dynamic context engineering for long-term memory, 3D-aware generative modeling, multimodal reasoning, and the next generation of human-AI interfaces.",
    },
  ],
]

type NewsItem = {
  date: string
  segments: BioSegment[]
}

export const NEWS: NewsItem[] = [
  {
    date: "September 2026",
    segments: [
      { text: "I presented our " },
      { text: "AC3S poster", href: "https://eccv.ecva.net/virtual/2026/poster/5183" },
      { text: " at " },
      { text: "ECCV 2026", href: "https://eccv.ecva.net/Conferences/2026" },
      { text: " in " },
      { text: "Malmö, Sweden", href: "https://eccv.ecva.net/Conferences/2026/Venues" },
      { text: ", " },
      { text: "ExHall #107 on September 12", href: "https://eccv.ecva.net/virtual/2026/poster/5183" },
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
      { text: "European Conference on Computer Vision (ECCV) 2026", href: "https://eccv.ecva.net/" },
      { text: "." },
    ],
  },
]

export const RESEARCH_INTERESTS = [
  "3D and 4D Aware Generative Models",
  "World Models and Spatial Intelligence",
  "Novel View Synthesis and Multi View Geometry",
  "Continual and Multimodal Representation Learning",
  "Multi Agent Orchestration and Agent Harnesses",
  "Long Horizon Agent Memory and Context Engineering",
  "Context Efficient Retrieval Augmented Generation",
  "Long Form Video Language and Audio Visual Understanding",
  "Foundation Model Training and Post Training",
  "Quantization, Kernel Optimization, and Efficient Inference",
  "Human AI Interaction and Agent Evaluation",
]

export const ANNOUNCEMENT = {
  text: "I am actively looking for research collaborations in 3D and 4D aware generative modeling, continual multimodal learning, and agentic AI systems with long-horizon memory. Feel free to reach out if you are interested in working together!",
}

export const SECTIONS: Record<string, ContentSection> = {
  research: {
    id: "research",
    heading: "Research",
    subheading: "Labs and Experience",
    cards: [
      {
        title: "UIUC Computer Vision and Machine Learning Group",
        subtitle: "Undergraduate Research Assistant - Advised by Professor Yaoyao Liu",
        location: "Champaign, IL",
        date: "2025.05-Present",
        bullets: [
          "Develop adaptive conditioning methods for 3D-aware synthetic data generation to enhance world model understanding and embodied agent performance in interactive simulations with geometry-conditioned diffusion approaches, reducing FID by 32.8% on ImageNet and enhancing pose accuracy by 4.2x on PASCAL3D+.",
          "Conduct large-scale foundation model training across TB-level datasets on National Center for Supercomputing Applications (NCSA) HPC clusters to enforce multi-view consistency with 4-bit NF4 quantization and low-level custom kernels, improving pose accuracy by 11.3% on PASCAL3D+ and reducing generation latency by 78.7% at p95.",
          "Design camera-controlled novel view synthesis on video generation pipelines to advance real-time perception for SLAM, visual odometry, and 3D reconstruction, decreasing LPIPS by 21.0% on GSO and FV4D by 52.0% on OmniObject3D.",
        ],
        links: [
          { label: "Lab", url: "https://vision.ischool.illinois.edu/people/" },
        ],
      },
      {
        title: "Multimodal Continual Learning Project",
        subtitle: "Undergraduate Research Assistant",
        location: "Champaign, IL",
        date: "2026.02-Present",
        bullets: [
          "Selected for NVIDIA Academic Grant Program Award to streamline multimodal foundation models in class-incremental learning across audio, image, and text without catastrophic forgetting and cross-modal alignment drift, increasing R@1 by 27.6% on AudioSet.",
          "Implement post-hoc tensor-level weight-interpolation methods for multimodal retrieval on National Artificial Intelligence Research Resource (NAIRR) HPC clusters, minimizing trainable parameters from 182M to 499 sigmoid-parameterized coefficients and increasing R@1 by 33.5% on AudioSet.",
          "Optimize checkpoint fusion pipelines to compose frozen checkpoints into one deployable model with no additional inference time, boosting last-task accuracy by 40.9% on UrbanSound8K.",
        ],
        links: [
          { label: "NVIDIA Grant", url: "https://ischool.illinois.edu/news-events/news/2026/04/liu-receives-support-ai-project-through-nvidia-academic-grant-program" },
        ],
      },
      {
        title: "REVA: Reusable Evidence View Aggregation for Context-Efficient RAG Serving",
        subtitle: "Undergraduate Research Assistant, University of Illinois Urbana-Champaign",
        location: "Champaign, IL",
        date: "2026.02-2026.09",
        bullets: [
          "Proposed attention-based scoring for post-retrieval RAG context compression to reuse generator attention traces across queries and update the system offline, achieving a 91.6% cache hit rate on HotpotQA.",
          "Developed reusable evidence views to scale compression cost with unique documents rather than query volume, improving F1 by 13.2% on Natural Questions and decreasing online compression overhead by 6.1x at under 40 ms per request.",
          "Optimized online serving to keep context compression off the GPU critical path for high-volume production RAG traffic under strict per-request latency targets, minimizing compression latency by 99.3% compared to EXIT and 99.8% compared to FaviComp.",
        ],
      },
    ],
  },
  publications: {
    id: "publications",
    heading: "Publications",
    subheading: "Papers",
    cards: PUBLICATIONS.map(publication),
  },
  experience: {
    id: "experience",
    heading: "Experience",
    subheading: "Professional Experience",
    cards: [
      {
        title: "Memoria",
        subtitle: "Founding Technical Lead",
        location: "Champaign, IL",
        date: "2026.01-Present",
        bullets: [
          "Lead end-to-end agentic workflow deployments across MCP servers, sub-agents, and agent skills with multi-agent orchestration, permission-aware tool calling, and policy guardrails, accelerating product delivery by 4.0x compared to traditional approaches.",
          "Manage production operations for deployed workflows with logging, evaluation harnesses, and monthly improvement cycles with client stakeholders, saving 90.5% in serving cost.",
          "Optimize enterprise workflows with self-evolving per-user memory and cost-aware model routing across sessions, saving 96.0% in token cost compared to GPT-4 Turbo.",
        ],
        links: [
          { label: "Website", url: "https://miramemoria.com/" },
        ],
      },
      {
        title: "Two by Two Learning",
        subtitle: "Full Stack Developer",
        location: "Champaign, IL",
        date: "2025.08-2026.08",
        bullets: [
          "Launched NOODEIA to help K-12 students falling behind grade level with multi-agent tutoring systems to plan, critique, and monitor each user with long-horizon memory, boosting user confidence by 2.4x in counterbalanced within-subjects studies.",
          "Designed self-evolving long-term memory architectures to replace recency-biased FIFO memory architectures by retrieving contextually relevant prior interactions, accelerating memory queries by 3.6x compared to PostgreSQL.",
          "Deployed complexity-aware model selection across planner, retrieval, solver, and critic stages to score each request and reserve frontier-tier inference for priority calls, eliminating 89.9% of monthly serving cost compared to GPT-4o.",
        ],
        links: [
          { label: "Website", url: "https://noodiea.onrender.com/" },
        ],
      },
      {
        title: "WRC, University of Illinois Urbana-Champaign",
        subtitle: "Data Analyst",
        location: "Champaign, IL",
        date: "2024.08-2024.12",
        bullets: [
          "Built paired pre/post analytics pipelines over survey data from 9,935 incoming students to better allocate program resources in the upcoming years, increasing correct responses among the next cohort by 14.0% with 61.9% fewer ambiguous responses.",
          "Conducted A/B tests on two consent scenarios stratified across five gender-identity subgroups to locate where misconceptions persisted after each workshop, increasing accuracy on consent comprehension by 19.5%.",
          "Proposed scenario-based learning modules for underrepresented subgroups by coding open-ended bystander responses into five-theme taxonomies, minimizing spread in direct-intervention rates by 5.6x.",
        ],
      },
    ],
  },
  projects: {
    id: "projects",
    heading: "Projects",
    subheading: "Research Projects",
    cards: [
      {
        title: "Long-Form Video-Language and Audio-Visual Social Understanding",
        subtitle: "Undergraduate Research Assistant, University of Illinois Urbana-Champaign",
        location: "Champaign, IL",
        date: "2025.12-2026.05",
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
        date: "2025.11-2026.05",
        bullets: [
          "Orchestrated eight specialized agents across a 12-step workflow for automated literature synthesis to cover planning, retrieval, drafting, reflection, and safety review in a single loop with LLM-as-judge evaluation, achieving 95.5% accuracy on deep research pipelines.",
          "Developed concurrent multi-source retrieval across Semantic Scholar and Tavily with production-grade fallback handling for API failures, minimizing query latency by 40.2%.",
          "Built customized Model Context Protocol servers to centralize governed tool access behind unified interfaces over academic databases, code repositories, and document stores, minimizing serving latency by 87.5%.",
        ],
        links: [
          { label: "Project Page", url: "https://salt-lab-human-ai-assignment-3-buildi-srcuistreamlit-app-zweknl.streamlit.app/" },
        ],
      },
      {
        title: "Realistic Neural Style Transfer Architecture",
        subtitle: "Undergraduate Research Assistant",
        date: "2025.01-2025.08",
        bullets: [
          "Proposed style transfer frameworks to maintain photorealistic results under highly abstract styles with VGG perceptual losses and edge-preserving constraints, improving SSIM by 77.0% and MS-SSIM by 49.0% compared to TensorFlow's NST.",
          "Proposed multi-layer Gram matrix losses with adaptive layer weighting to suppress texture and chromatic artifacts, boosting SSIM by 4.4x and MS-SSIM by 6.4x compared to ChatGPT-4o.",
        ],
        links: [
          { label: "GitHub", url: "https://github.com/Edward-H26/Realistic-Neural-Style-Transfer-Architecture" },
        ],
      },
      {
        title: "Anime Statistics and Analysis Platform, ASAP",
        subtitle: "Undergraduate Research Assistant",
        date: "2025.02-2025.06",
        bullets: [
          "Deployed interactive R Shiny analytics platforms to surface anime popularity trends and market opportunities with live Jikan REST API data and predictive analysis on shinyapps.io.",
        ],
        links: [
          { label: "GitHub", url: "https://github.com/Edward-H26/Anime-Statistics-and-Analysis-Platform-ASAP" },
        ],
      },
    ],
  },
  teaching: {
    id: "teaching",
    heading: "Teaching",
    subheading: "Courses and Mentoring",
    cards: [
      {
        title: "CS 107 Data Science Discovery, University of Illinois Urbana-Champaign",
        subtitle: "Teaching Assistant",
        location: "Champaign, IL",
        date: "2023.08-2026.05",
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
  },
  service: {
    id: "service",
    heading: "Service",
    subheading: "Open Source and Community",
    cards: [
      {
        title: "OnePromptClaudeCode",
        subtitle: "Lead Developer",
        date: "2026.03-Present",
        bullets: [
          "Lead development of an MIT-licensed open-source agent harness for agentic software development, minimizing setup time by 99.5%.",
          "Design three-tier capability routers for the agent harness to optimize tokens, latency, and cost on every turn, with keyword matching and session-memory recall ahead of a 4.5 s model reasoning pass, resolving intent in 120 ms and running 37.5x faster than routing every prompt through the model.",
          "Implement secure agent execution runtime with four lifecycle hooks to gate every tool call before it runs, eliminating 92.7% of router latency.",
        ],
        links: [
          { label: "GitHub", url: "https://github.com/Edward-H26/OnePromptClaudeCode" },
        ],
      },
    ],
  },
  info: {
    id: "info",
    heading: "Info",
    subheading: "Personal Information",
    cards: [
      {
        title: "Languages",
        bullets: [
          "Chinese (Native)",
          "English (Native)",
          "Spanish (Elementary)",
        ],
      },
      {
        title: "Certifications and Honors",
        bullets: [
          "Neo4j Certified Professional",
          "Neo4j Graph Data Science Certification",
        ],
        links: [
          { label: "Neo4j Professional", url: "https://graphacademy.neo4j.com/c/2e386da7-2b30-4575-9fd0-b0b0918a6fe0/" },
          { label: "Neo4j GDS", url: "https://graphacademy.neo4j.com/c/6559f827-9dca-4199-bc9d-8be10fd74891/" },
        ],
      },
      {
        title: "Education",
        bullets: [
          "Columbia University, New York City, NY",
          "M.S. in Data Science",
          "Fu Foundation School of Engineering and Applied Science",
          "Courses: High Performance Machine Learning, Algorithms",
          "2026.08 - 2028.05",
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
  },
}

export const SKILLS_CATEGORIES = {
  "Programming Languages": ["Python", "C++", "C", "Rust", "Go", "Java", "Swift", "Kotlin", "Ruby", "R"],
  "AI/ML Frameworks": ["PyTorch", "CUDA", "JAX", "TensorFlow", "Triton", "TensorRT", "vLLM", "SGLang", "NeMo", "Megatron-LM", "LangGraph", "NCCL", "GPU/TPU/CPU Architecture"],
  "Foundation Model Training": ["Pre-training", "Post-training", "Test-time Training", "Reinforcement Learning", "Continual Learning", "SFT", "RLHF", "RLAIF", "RLVF", "PPO", "DPO", "GRPO", "Reward Modeling", "Model Alignment", "Synthetic Data Generation", "Knowledge Distillation", "Quantization", "Context Compression", "Token Pruning", "Kernel Optimization", "LoRA", "QLoRA", "Distributed Training", "FSDP"],
  "Computer Vision": ["World Models", "Diffusion Models", "Autoregressive Models", "Flow Matching", "3D/4D Generation", "Multi-View Geometry", "3D Reconstruction", "Novel View Synthesis", "Spatial Intelligence", "Visual-Inertial Odometry", "Depth Estimation", "NeRFs", "3D Gaussian Splatting", "OpenCV", "SLAM"],
  "Agentic AI": ["Multi-Agent Orchestration", "Sub-Agent Parallelization", "Computer-Use Agents", "Agent Harness", "Policy Guardrails", "Context Engineering", "Prompt Caching", "MCP", "A2A", "Tool Calling", "Autonomous Workflows", "Long-Horizon Memory", "RAG"],
  "Full-stack Development": ["React", "Vue", "Angular", "JavaScript", "TypeScript", "HTML5", "Tailwind CSS", "FastAPI"],
  "Databases and Infrastructure": ["PostgreSQL", "Neo4j", "MongoDB", "Kafka", "Docker", "Kubernetes", "CI/CD", "AWS", "GCP", "Azure"],
  "Design and Other Tools": ["Figma", "Canva", "Adobe Creative Suite", "Microsoft Office Suite", "Unity"],
}

// Highlighted on the Info page; every entry must also appear in SKILLS_CATEGORIES.
export const PROFESSIONAL_SKILLS = [
  "Python",
  "C++",
  "Rust",
  "Go",
  "PyTorch",
  "CUDA",
  "JAX",
  "TensorFlow",
  "vLLM",
  "SGLang",
  "LangGraph",
  "Megatron-LM",
  "NCCL",
  "GPU/TPU/CPU Architecture",
  "Test-time Training",
  "Reinforcement Learning",
  "SFT",
  "Continual Learning",
  "RLHF",
  "GRPO",
  "Quantization",
  "Context Compression",
  "Token Pruning",
  "Synthetic Data Generation",
  "LoRA",
  "Distributed Training",
  "FSDP",
  "World Models",
  "Diffusion Models",
  "Flow Matching",
  "3D/4D Generation",
  "Novel View Synthesis",
  "Spatial Intelligence",
  "3D Gaussian Splatting",
  "SLAM",
  "Multi-Agent Orchestration",
  "Agent Harness",
  "Context Engineering",
  "MCP",
  "Tool Calling",
  "Long-Horizon Memory",
  "RAG",
  "React",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "Tailwind CSS",
  "FastAPI",
  "PostgreSQL",
  "Neo4j",
  "MongoDB",
  "Kafka",
  "Docker",
  "Kubernetes",
  "Figma",
  "Canva",
]
