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
    title: "SV4D 3.0: Single-Step 3D-Aware Diffusion for Multi-View-Consistent 4D Scene Generation",
    authors: ["Qiran Hu", "Wei Cao", "Yaoyao Liu"],
    venue: "Under Review",
    badge: "Under Review",
    image: { src: "/images/papers/sv4d.webp", alt: "No public figure yet; this paper is under review" },
  },
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
          "Architect adaptive conditioning methods for 3D-aware synthetic data generation to enhance world model understanding and embodied agent performance in interactive simulations with geometry-conditioned diffusion approaches, reducing FID by 32.8% and increasing pose accuracy by 4.2x on PASCAL3D+.",
          "Conduct large-scale foundation model training across TB-level datasets on the National Center for Supercomputing Applications (NCSA) HPC clusters to enforce multi-view consistency with 4-bit NF4 quantization and low-level custom kernels, improving pose accuracy by 11.3% on PASCAL3D+ and reducing generation latency by 78.7% at p95.",
          "Design camera-controlled novel view synthesis on video generation pipelines to improve real-time perception for SLAM, visual odometry, and 3D reconstruction, reducing LPIPS by 21.0% on GSO and FV4D by 52.0% on OmniObject3D.",
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
          "Selected for the NVIDIA Academic Grant Program Award to improve multimodal foundation models in class-incremental learning across audio, image, and text without catastrophic forgetting and cross-modal alignment drift, increasing R@1 by 27.6% on AudioSet.",
          "Advance post-hoc tensor-level weight-interpolation methods to improve multimodal retrieval through National Artificial Intelligence Research Resource (NAIRR) HPC clusters, reducing trainable parameters from 182M to 499 sigmoid-parameterized coefficients and increasing R@1 by 33.5% on AudioSet.",
          "Improve checkpoint fusion pipelines that merge separately trained checkpoints into a single model with no additional inference time, increasing last-task accuracy by 40.9% on UrbanSound8K.",
        ],
        links: [
          { label: "NVIDIA Grant", url: "https://ischool.illinois.edu/news-events/news/2026/04/liu-receives-support-ai-project-through-nvidia-academic-grant-program" },
        ],
      },
      {
        title: "Long-Form Video-Language and Audio-Visual Social Understanding",
        subtitle: "Undergraduate Research Assistant, University of Illinois Urbana-Champaign",
        location: "Champaign, IL",
        date: "2025.12-2026.05",
        bullets: [
          "Trained streaming video-language models with temporal transformer blocks for long-form video understanding beyond 30-minute sequences, increasing zero-shot accuracy by 17.4%.",
          "Designed context fluidity pipelines that fused facial action units, body pose, and prosody through cross-modal attention to infer social intent and conversational role from raw recordings, achieving 89.1% accuracy on speaker-role classification.",
          "Built video annotation pipelines for long clinical sessions with automatic transcription and detailed labeling, achieving 90.0% accuracy on role-inversion recovery.",
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
          "Build end-to-end agentic workflow deployments for medium-sized businesses to deliver customized MCP servers, sub-agents, and agent skills that automate manual handoffs across each client's systems, reducing delivery time by 4.0x compared to traditional approaches.",
          "Improve self-evolving memory architectures for enterprise workflows to provide persistent per-user context without retraining, reducing token cost by 99.0%.",
          "Build production logging, monitoring, and evaluation infrastructure for system performance, user behavior, and cost.",
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
          "Launched NOODEIA to help K-12 students who are falling behind grade level with multi-agent tutoring systems that plan, critique, and monitor each individual user with long-horizon memory through GraphRAG, increasing learner confidence by 2.4x in counterbalanced within-subjects studies.",
          "Advanced recency-biased FIFO memory architecture with self-evolving long-term memory that retrieves contextually relevant interactions, reducing memory query latency by 3.6x compared to PostgreSQL.",
          "Deployed complexity-aware model selection mechanisms across the planner, retrieval, solver, and critic stages that score each request and reserve frontier-tier inference for priority calls, reducing monthly serving cost by 89.9% compared to GPT-4o.",
        ],
        links: [
          { label: "Website", url: "https://noodiea.onrender.com/" },
        ],
      },
      {
        title: "University of Illinois Urbana-Champaign Women's Resources Center",
        subtitle: "Data Analyst",
        location: "Champaign, IL",
        date: "2024.08-2024.12",
        bullets: [
          "Built paired pre/post analytics pipelines over survey data from 9,935 incoming students to measure seven learning outcomes for university-wide consent-education programs, increasing correct-response rates by 14.0% and reducing ambiguous responses by 61.9%.",
          "Conducted A/B tests on two consent scenarios stratified across five gender-identity subgroups to locate where misconceptions persisted after the workshop, achieving 19.5% improvement on consent comprehension.",
          "Proposed scenario-based learning modules for underrepresented subgroups by coding open-ended bystander responses into five-theme taxonomies, decreasing spread by 5.6x in direct-intervention rates.",
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
        title: "REVA: Reusable Evidence View Aggregation for Context-Efficient RAG Serving",
        subtitle: "Undergraduate Research Assistant",
        location: "Champaign, IL",
        date: "2026.02-2026.09",
        bullets: [
          "Proposed attention-based scoring for post-retrieval RAG context compression to reuse the generator's own attention traces across queries with a document-keyed score store built offline, achieving a 92.0% cache hit rate on HotpotQA.",
          "Developed word-unit scoring with original-order rendering for budgeted evidence materialization to preserve document structure under compression, increasing F1 by 13.2% on Natural Questions and reducing compression overhead by 93.6%.",
          "Optimized the online path of score lookup, quota allocation, and budget repair for interactive RAG serving, reducing compression latency by 98.9% compared to EXIT and 99.7% compared to FaviComp.",
        ],
      },
      {
        title: "Multi-agent Research Synthesis Engine",
        subtitle: "Undergraduate Research Assistant",
        location: "Champaign, IL",
        date: "2025.11-2026.05",
        bullets: [
          "Orchestrated eight specialized agents across a 12-step workflow for automated literature synthesis to cover planning, retrieval, drafting, reflection, and safety review in a single loop with LLM-as-judge evaluation, achieving 95.5% accuracy on deep research pipelines.",
          "Optimized Semantic Scholar and Tavily tool calls for multi-source literature retrieval to reduce latency on the critical path with a bounded thread pool and typed fallbacks, reducing query time by 40.2%.",
          "Built Model Context Protocol servers for agent tool access to centralize governed tool integration behind one typed interface over academic databases, code repositories, and document stores, reducing integration latency by 87.5% across eight agents.",
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
          "Architected style transfer frameworks for maintaining photorealistic results under highly abstract styles with VGG perceptual losses and edge-preserving constraints, improving SSIM by 77.0% and MS-SSIM by 49.0% compared to TensorFlow's NST.",
          "Proposed multi-layer Gram matrix losses with adaptive layer weighting to suppress texture and chromatic artifacts, increasing SSIM by 4.4x and MS-SSIM by 6.4x compared to ChatGPT-4o.",
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
          "Authored DISCOVERY Guides on the course website for self-serve concept review to provide every cohort the same worked explanations with applied Python and statistics walkthroughs.",
          "Designed problem sets, exam questions, test suites, and autograder scripts to deliver instant, consistent feedback to 1,200 students every semester on the course's mastery-learning platform.",
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
          "Open-source OnePromptClaudeCode under the MIT License for agentic software development to replace manual configuration with 95 agent skills, 14 specialized sub-agents, 10 MCP servers, and policy guardrails in one agent harness spanning planning, tool execution, review, and shipping.",
          "Design three-tier capability routers for the agent harness to optimize tokens, latency, and cost on every turn, with keyword matching and session-memory recall ahead of a 4.5 s model reasoning pass, resolving intent in 120 ms and running 37.5x faster than routing every prompt through the model.",
          "Improve the agent harness runtime for secure agent execution with four lifecycle hooks that gate every tool call before it runs, applying pattern-based deny rules to destructive commands, a pinned reasoning environment, and idempotent install modes with timestamped backups, reducing router latency by 92.7%.",
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
          "UIUC Dean's List",
          "UIUC James Scholar",
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
          "Courses: High Performance Machine Learning",
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
