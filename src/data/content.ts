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
}

export type ContentSection = {
  id: string
  heading: string
  subheading?: string
  cards: ContentCard[]
}

export type NavItem = {
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
  email: "qiranhu8@gmail.com",
  phone: "+1 (347)-957-9176",
  photo: "/images/profile.png",
  social: {
    github: "https://github.com/Edward-H26",
    linkedin: "https://www.linkedin.com/in/qiranhu/",
    x: "https://x.com/QiranHu",
  },
}

export const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/publications", label: "Publications" },
  { path: "/research", label: "Research" },
  { path: "/experience", label: "Experience" },
  { path: "/projects", label: "Projects" },
  { path: "/info", label: "Info" },
]

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

export const RESEARCH_INTERESTS = [
  "Agentic Systems and Tool Use",
  "Multi Agent Architectures and Coordination",
  "Multimodal Language Models",
  "World Models for 3D Environments",
  "Spatial Intelligence and 3D Reasoning",
  "Generative Video and Audio Models",
  "Embodied AI and Simulation",
  "Human AI Interaction and Interface Prototyping",
  "Evaluation and Safety for Agentic Systems",
  "Alignment, Interpretability, and Model Behavior",
  "Large Scale Training and Data Systems",
]

export const ANNOUNCEMENT = {
  text: "I am actively looking for research collaborations in multimodal learning, 3D-aware generative modeling, and agentic AI systems. Feel free to reach out if you are interested in working together!",
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
        bullets: [
          "Develop 3D-consistent generative models for world understanding and embodied AI, and implement diffusion-based approaches for spatially coherent scene synthesis with applications in interactive simulation.",
          "Investigate real-time 3D reconstruction methods for interactive experiences and integrate neural rendering with depth estimation for embodied agent perception systems.",
          "Train large-scale vision transformers on TB-level image datasets using a high-performance computing cluster through distributed training at the National Center for Supercomputing Applications (NCSA), optimizing spatial tokenization and enforcing multi-view consistency for 3D-aware diffusion-based scene generation."
        ],
        links: [
          { label: "Lab", url: "https://vision.ischool.illinois.edu/people/" }
        ]
      },
      {
        title: "UIUC Social Computing System Lab",
        subtitle: "Undergraduate Research Assistant - Advised by Professor Yun Huang",
        bullets: [
          "Architect streaming video-language models with temporal transformer blocks for long-form video understanding beyond 30-minute sequences with competitive zero-shot accuracy.",
          "Build joint audio-visual perception pipelines for human-centric social understanding, fusing facial action units, body pose dynamics, and acoustic prosody through cross-modal attention to predict social intent and conversational role in clinical sessions.",
          "Design a context fluidity framework for personalized AI adaptation, advancing from static prompt engineering toward dynamic context engineering that models individual communication preferences and emotional states across conversation sessions.",
        ],
        links: [
          { label: "Lab", url: "https://socialcomputing.web.illinois.edu/" }
        ]
      }
    ]
  },
  publications: {
    id: "publications",
    heading: "Publications",
    subheading: "Papers",
    cards: [
      {
        title: "AC3S: Adaptive Conditioning for 3D-Aware Synthetic Data Generation",
        bullets: [
          "[1] Eric Ji, Qiran Hu, Wufei Ma, Sarthak Jain, Yingying Li, Minh N. Do, Yaoyao Liu. AC3S: Adaptive Conditioning for 3D-Aware Synthetic Data Generation. Under Review at European Conference on Computer Vision (ECCV)."
        ]
      },
      {
        title: "Crowdsourced Open-Source Research: A Research Paradigm Probe",
        bullets: [
          "[2] Hangyue Zhang, Qiran Hu, Ziyi Zhang, Yun Huang. Crowdsourced Open-Source Research: A Research Paradigm Probe. Under Review at ACM Conference on Computer-Supported Cooperative Work and Social Computing (CSCW)."
        ]
      },
      {
        title: "Context Under Budget: A Controlled Benchmark for Post-Retrieval Compression in Retrieval-Augmented Generation",
        bullets: [
          "[3] Tuan Minh Nguyen, Qiran Hu, Banruo Liu, Khoa D Doan, Kok-Seng Wong, Fan Lai. Context Under Budget: A Controlled Benchmark for Post-Retrieval Compression in Retrieval-Augmented Generation. Under Review at Conference on Empirical Methods in Natural Language Processing (EMNLP)."
        ]
      },
      {
        title: "AlphaWiseFT: Adaptive Weight Interpolation for Continual Multimodal Representation Learning",
        bullets: [
          "[4] Sarthak Jain, Qiran Hu, Zhen Zhu, Yaoyao Liu. AlphaWiseFT: Adaptive Weight Interpolation for Continual Multimodal Representation Learning. Under Review at Transactions on Machine Learning Research (TMLR)."
        ]
      },
    ]
  },
  experience: {
    id: "experience",
    heading: "Experience",
    subheading: "Professional and Leadership Experience",
    cards: [
      {
        title: "Computer Vision and Machine Learning Group",
        subtitle: "Undergraduate Research Assistant",
        location: "Champaign, IL",
        date: "2025.05-Present",
        bullets: [
          "Designed a consistency-trajectory distillation framework that compresses multi-step 3D-aware diffusion teachers into single-step student samplers conditioned on 3D pose and depth.",
          "Built a parameter-efficient continual-learning pipeline for billion-parameter large multimodal models, extending the partial-retraining methodology with Fisher-aware adapter routing.",
          "Generalized weight-space interpolation from Euclidean linear combinations to Fisher-Rao geodesic interpolation across continual checkpoints.",
          "Conducted experiments on real-time 3D reconstruction and visual-inertial odometry for embodied agent perception systems by evaluating spatial intelligence metrics for world model applications."
        ]
      },
      {
        title: "UIUC Student Affairs, WRC Department",
        subtitle: "Data Analyst",
        location: "Champaign, IL",
        date: "2024.08-2024.12",
        bullets: [
          "Conducted rigorous statistical analysis of student performance metrics and survey responses among 19,800 students and implemented a comprehensive data analysis framework for the program.",
          "Leveraged complex institutional datasets to generate actionable insights by enhancing strategic planning processes and contributing to a 6.5% improvement in resource allocation for student success programs.",
          "Designed and implemented comprehensive program evaluation frameworks for key educational initiatives by utilizing mixed-methods research to analyze effectiveness."
        ]
      },
      {
        title: "CS 107 Data Science Discovery, University of Illinois at Urbana-Champaign",
        subtitle: "Teaching Assistant",
        location: "IL, United States",
        date: "2023.08-Present",
        bullets: [
          "Facilitated weekly in-person/online office hours and lab sections to provide technical assistance for over 2,000 students.",
          "Authored instructional content for DISCOVERY's Guides explaining data science concepts through applied Python examples.",
          "Designed advanced problem sets, exam questions, test suites, and autograder scripts for DISCOVERY's Mastery Platform."
        ],
        links: [
          { label: "Guides", url: "https://discovery.cs.illinois.edu/guides/" },
          { label: "Mastery", url: "https://mastery.cs.illinois.edu/" }
        ]
      },
      {
        title: "Student Government, University of Illinois at Urbana-Champaign",
        subtitle: "iSchool Student Representative",
        location: "IL, United States",
        date: "2022.09-2023.09",
        bullets: [
          "Supervised iSchool community forums to handle student concerns with adherence to predetermined guidelines.",
          "Facilitated with the university and prospective students and parents during campus tours, answering questions, and providing insight.",
          "Secured approval for program modifications to existing and new activities from students' feedback."
        ]
      }
    ]
  },
  projects: {
    id: "projects",
    heading: "Projects",
    subheading: "Projects and Skills",
    cards: [
      {
        title: "Multi-modal Generative Models for Large-scale Continual Learning",
        subtitle: "Undergraduate Research Assistant",
        date: "2026.02-Present",
        bullets: [
          "Selected for the NVIDIA Academic Grant Program Award with 32,000 A100 GPU-hours allocated on the Brev cloud platform to advance multimodal generative models that continuously incorporate new knowledge across text, image, and 3D data without catastrophic forgetting of previously learned cross-modal alignment.",
          "Scaled multimodal continual-learning experiments across audio, image, and text modalities through distributed training on the National Artificial Intelligence Research Resource (NAIRR), profiling throughput and memory trade-offs to enable post-hoc weight-space fusion.",
          "Optimized parameter-efficient post-hoc fusion framework that learns to compose frozen checkpoints from different continual-learning strategies."
        ],
        links: [
          { label: "NVIDIA Grant", url: "https://ischool.illinois.edu/news-events/news/2026/04/liu-receives-support-ai-project-through-nvidia-academic-grant-program" }
        ]
      },
      {
        title: "Multi-agent HCI Research Synthesis Engine",
        subtitle: "Systems Architect",
        date: "2025.11-Present",
        bullets: [
          "Architected an 8-agent orchestration system for HCI literature synthesis, implementing specialized agents of Planner, Researcher, Writer, Critic, SafetyGuardian, ReflexionEngine, LLMJudge, and Evaluation across a 12-step reasoning workflow, achieving 0.955 overall evaluation score, 0.925 on relevance, safety, and clarity.",
          "Designed Model Context Protocol integration for standardized tool interfaces, enabling seamless connection between LLM agents and external data sources, including academic databases, code repositories, and document management systems.",
          "Constructed parallel tool-calling infrastructure integrating Semantic Scholar API and Tavily web search with ThreadPoolExecutor, reducing query latency 40% (8.2s to 4.9s) and adding production-grade fallback handling for API failures."
        ],
        links: [
          { label: "Demo", url: "https://salt-lab-human-ai-assignment-3-buildi-srcuistreamlit-app-zweknl.streamlit.app/" }
        ]
      },
      {
        title: "Node Optimized Orchestration Design for Educational Intelligence Architecture",
        subtitle: "Full Stack Developer",
        date: "2025.08-Present",
        bullets: [
          "Built a K-12 intelligent tutoring platform integrating multi-agent orchestration with memory-enhanced GraphRAG and designed an adaptive learning system that personalizes responses beyond static Q&A.",
          "Implemented a self-evolving long-term memory module that retrieves contextually relevant prior interactions, addressing the recency bias of FIFO memory structures used in standard RAG systems.",
          "Deployed to 2 partner institutions and iterated through 6 development cycles incorporating user feedback to refine interface design and response quality based on student engagement data."
        ],
        links: [
          { label: "GitHub", url: "https://github.com/SALT-Lab-Human-AI/project-check-point-1-NOODEIA" }
        ]
      },
      {
        title: "Realistic Neural Style Transfer Architecture",
        subtitle: "Independent Researcher",
        date: "2025.01-2025.08",
        bullets: [
          "Proposed a multi-scale neural style transfer architecture for transferring abstract art styles onto photographic content, combining VGG-based perceptual losses with edge-preserving structural constraints to retain global content geometry.",
          "Reduced texture and chromatic distortion artifacts common in patch-based and single-layer loss formulations through a multi-layer Gram matrix loss with adaptive layer weighting."
        ],
        links: [
          { label: "GitHub", url: "https://github.com/Edward-H26/Realistic-Neural-Style-Transfer-Architecture" }
        ]
      },
      {
        title: "Anime Statistics and Analysis Platform",
        subtitle: "Project Lead",
        date: "2025.02-2025.06",
        bullets: [
          "Built interactive analytics platform using anime data API for popularity trend visualization and predictive analysis of market opportunities."
        ],
        links: [
          { label: "GitHub", url: "https://github.com/Edward-H26/Anime-Statistics-and-Analysis-Platform-ASAP" }
        ]
      }
    ]
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
          "Spanish (Elementary)"
        ]
      },
      {
        title: "Certifications and Honors",
        bullets: [
          "Neo4j Certified Professional",
          "Neo4j Graph Data Science Certification",
          "UIUC Dean's List - 2023 Spring, 2024 Fall, 2025 Spring, 2025 Fall, 2026 Spring",
          "UIUC James Scholar"
        ],
        links: [
          { label: "Neo4j Professional", url: "https://graphacademy.neo4j.com/c/2e386da7-2b30-4575-9fd0-b0b0918a6fe0/" },
          { label: "Neo4j GDS", url: "https://graphacademy.neo4j.com/c/6559f827-9dca-4199-bc9d-8be10fd74891/" }
        ]
      },
      {
        title: "Education",
        bullets: [
          "Columbia University, New York City, NY",
          "MS in Data Science",
          "Fu Foundation School of Engineering and Applied Science",
          "2026.08 - 2028.05"
        ]
      },
      {
        title: "Education",
        bullets: [
          "University of Illinois at Urbana-Champaign, Champaign, IL",
          "BS in Data Science and Information Science",
          "Minors: Computer Science and Statistics",
          "Siebel School of Computing and Data Science",
          "Core Courses: Intro to Generative AI for Hum, Applied Machine Learning, Computational Photography, Linear Algebra with Computational Applications, Modeling and Learning in Data Science, Statistics Programming Methods, Data Science Programming Methods, Calculus for Business, and Statistics and Probability",
          "2022.08 - 2026.05"
        ]
      }
    ]
  }
}

export const SKILLS_CATEGORIES = {
  "Programming Languages": ["Python", "C++", "Java", "R", "Ruby", "Kotlin", "PHP"],
  "AI/ML Frameworks": ["PyTorch", "OpenCV", "LangChain", "LangGraph", "JAX", "TensorFlow", "LangSmith"],
  "Large Model Training": ["Distributed Training", "SFT", "CUDA", "PEFT", "HPC"],
  "3D and Vision": ["Diffusion Models", "World Models", "3D Reconstruction", "Depth Estimation", "3D-Aware Generation"],
  "Multi-agent and Agentic AI": ["Agent Orchestration", "GraphRAG", "Long-Term Memory", "MCP", "Tool Calling", "Function Chaining"],
  "Full-stack Development": ["React.js", "Next.js", "Vue.js", "Angular.js", "Node.js", "TypeScript", "JavaScript", "HTML5", "Tailwind CSS"],
  "Databases": ["PostgreSQL", "Neo4j", "MongoDB"],
  "Infrastructure": ["Docker", "AWS", "Kubernetes", "Cloud DevOps"],
  "Design and Office Tools": ["Figma", "Canva", "Microsoft Office Suite", "Adobe Creative Suite"],
  "Other Tools": ["Unity", "SAS", "Arduino UNO"],
}

export const PROFESSIONAL_SKILLS = [
  "Python",
  "C++",
  "Java",
  "R",
  "Ruby",
  "PyTorch",
  "OpenCV",
  "LangChain",
  "LangGraph",
  "Distributed Training",
  "SFT",
  "CUDA",
  "Diffusion Models",
  "World Models",
  "3D-Aware Generation",
  "Agent Orchestration",
  "GraphRAG",
  "Long-Term Memory",
  "React.js",
  "Next.js",
  "Vue.js",
  "Angular.js",
  "Node.js",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "Tailwind CSS",
  "PostgreSQL",
  "Neo4j",
  "MongoDB",
  "Docker",
  "AWS",
  "Figma",
  "Canva",
  "Unity",
]
