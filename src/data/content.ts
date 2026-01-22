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

export const PROFILE = {
  name: "Qiran Hu",
  title: "Undergraduate Research Assistant",
  affiliation: "University of Illinois Urbana-Champaign",
  email: "qiranhu8@gmail.com",
  phone: "+1 (347)-957-9176",
  photo: "/images/profile.jpg",
  social: {
    github: "https://github.com/Edward-H26",
    linkedin: "https://www.linkedin.com/in/qiranhu/",
    x: "https://x.com/eduardohuuu",
  },
}

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
  text: "I am actively looking for research opportunities and collaborations in agentic system and computer vision. Feel free to reach out if you are interested in working together!",
  highlight: true,
}

export const SECTIONS: Record<string, ContentSection> = {
  research: {
    id: "research",
    heading: "Research",
    subheading: "Labs and Experience",
    cards: [
      {
        title: "UIUC Computer Vision and Machine Learning Group",
        subtitle: "Undergraduate Researcher (National Center for Supercomputing Applications (NCSA) affiliated)",
        bullets: [
          "Develop 3D-consistent generative models for world understanding and embodied AI, and implement diffusion-based approaches for spatially coherent scene synthesis with applications in interactive simulation.",
          "Investigate real-time 3D reconstruction methods for interactive experiences and integrate neural rendering with depth estimation for embodied agent perception systems",
          "Train large-scale vision transformers on TB-level image datasets using a high-performance computing cluster in parallel at National Artificial Intelligence Research Resource (NAIRR) Pilot and experiment with spatial tokenization and multi-view consistency for 3D scene generation."
        ],
        links: [
          { label: "Lab", url: "https://vision.ischool.illinois.edu/people/" }
        ]
      },
      {
        title: "UIUC Social Computing System Lab",
        subtitle: "Undergraduate Researcher",
        bullets: [
          "Implement the SOAP.AI clinical video analysis platform using multimodal LLM pipelines for automated note generation and develop affective signal extraction through facial expressions and body language from therapist-patient interactions to assist clinical documentation and therapeutic assessment.",
          "Design a context fluidity framework for personalized AI adaptation, advancing from static prompt engineering toward dynamic context engineering that models individual communication preferences and emotional states across conversation sessions.",
          "Experiment with multimodal generation pipelines by applying supervised fine-tuning and prompt optimization techniques, including few-shot learning and chain-of-thought prompting for domain-specific model adaptation."
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
        title: "3D DST V2",
        bullets: [
          "[1] Eric Ji, Yaoyao Liu, Wufei Ma, and Qiran Hu. (2025). 3D DST V2: Enhancing Generating Images with 3D Annotations Using Diffusion Models. Submitted to International Conference on Machine Learning (ICML 2026)."
        ]
      },
      {
        title: "Realistic Neural Style Transfer Architecture",
        bullets: [
          "[2] Qiran Hu. (2025). Advancing Traditional Neural Style Transfer: Realistic Neural Style Transfer Architecture That Addresses Limitations With Abstract Art Styles And Photographic Input. Submitted to The IEEE International Conference on Image Processing (ICIP 2026)."
        ]
      },
    ]
  },
  experience: {
    id: "experience",
    heading: "Experience",
    subheading: "Professional Work Experience",
    cards: [
      {
        title: "Computer Vision and Machine Learning Group",
        subtitle: "Undergraduate Research Assistant",
        location: "Champaign, IL",
        date: "2025.05-Present",
        bullets: [
          "Advance text-to-3D generation research building on \"Generating Images with 3D Annotations Using Diffusion Models\" (ICLR 2024), addressing multi-view consistency failures through improved depth estimation and 3D-aware diffusion conditioning.",
          "Conduct experiments on real-time 3D reconstruction and visual-inertial odometry for embodied agent perception and evaluating spatial intelligence metrics for world model applications.",
          "Targeting submission to the International Conference on Machine Learning (ICML 2026) with novel contributions to 3D-consistent image generation and spatial representation learning."
        ]
      },
      {
        title: "UIUC Student Affairs, WRC Department",
        subtitle: "Data Analyst",
        location: "Champaign, IL",
        date: "2024.08-2024.12",
        bullets: [
          "Conducted rigorous statistical analysis of student performance metrics and survey responses among 19800 students and implemented a comprehensive data analysis framework for the program.",
          "Leveraged complex institutional datasets to generate actionable insights by enhancing strategic planning processes and contributing to a 6.5% improvement in resource allocation for student success programs.",
          "Designed and implemented comprehensive program evaluation frameworks for key educational initiatives by utilizing mixed-methods research to analyze effectiveness."
        ]
      },
      {
        title: "CPC Brooklyn Community Center",
        subtitle: "Data Engineer",
        location: "Brooklyn, NY",
        date: "2023.06-2023.08",
        bullets: [
          "Analyzed over 4GB of workforce management data to identify customer usage patterns and conducted exploratory data analysis.",
          "Streamlined complex workflows by breaking them down into manageable components for easier implementation and maintenance."
        ]
      },
      {
        title: "CS 107 Data Science Discovery, University of Illinois at Urbana-Champaign",
        subtitle: "Teaching Assistant",
        location: "IL, United States",
        date: "2023.08-Present",
        bullets: [
          "Facilitated weekly in-person/online office hours and lab sections to provide technical assistance for over 2000 students.",
          "Created informative and intriguing content for DISCOVERY's Guides to explain data science concepts through practical applications of Python.",
          "Developed difficult homework assignments, exam questions, test suites, and autograder scripts for DISCOVERY's Mastery Platform."
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
          "Obtained approval for modifications to existing and new activities from students' feedback."
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
        title: "Multi-agent HCI Research Synthesis Engine",
        subtitle: "Systems Architect",
        date: "2025.11-Present",
        bullets: [
          "Architected an 8-agent orchestration system for HCI literature synthesis, implementing specialized agents of Planner, Researcher, Writer, Critic, SafetyGuardian, ReflexionEngine, LLMJudge, and Evaluation across a 12-step reasoning workflow, achieving 0.955 overall evaluation score, 0.925 on relevance, safety, and clarity.",
          "Designed Model Context Protocol integration for standardized tool interfaces, enabling seamless connection between LLM agents and external data sources, including academic databases, code repositories, and document management systems.",
          "Constructed parallel tool-calling infrastructure integrating Semantic Scholar API and Tavily web search with ThreadPoolExecutor, reducing query latency by 40% from 8.2s to 4.9s production-ready approaches during API failures and other issues."
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
          "Implemented a multi-agent workflow featuring a self-evolving Long-Term Memory Architecture that mimics human memory processes to enable personalized and accurate responses, overcoming limitations of traditional FIFO memory structures and ensuring critical information is retained and utilized effectively.",
          "Deployed to 2 partner institutions and iterated through 6 development cycles incorporating user feedback to refine interface design and response quality based on student engagement data."
        ],
        links: [
          { label: "GitHub", url: "https://github.com/SALT-Lab-Human-AI/project-check-point-1-NOODEIA" }
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
          { label: "Demo", url: "https://qiranhu.shinyapps.io/AnimeStatisticsandAnalysisPlatform/" }
        ]
      },
      {
        title: "Realistic Neural Style Transfer Architecture",
        subtitle: "Independent Researcher",
        date: "2025.01-2025.08",
        bullets: [
          "Proposed a refined neural style transfer architecture, particularly when applying abstract art styles to photographic content, which emphasizes preserving the global structure and edges of the content image, transferring the high-level artistic tone and color distribution of the style image, and reducing distortions common in patch-based or single-layer loss models."
        ],
        links: [
          { label: "GitHub", url: "https://github.com/Edward-H26/Realistic-Neural-Style-Transfer-Architecture" }
        ]
      },
      {
        title: "Technology and System of Spatial-Temporal Multi-Modal Large Language Model",
        subtitle: "Project Researcher, Chinese Academy of Sciences",
        date: "2024.06-2024.08",
        bullets: [
          "Designed data modeling algorithm for heterogeneous spatial-temporal data from multi-sensor sources, transforming multimodal understanding into unified global modeling framework with improved efficiency.",
          "Participated in the research of ST-XFormer, the Spatial-Temporal Transformer system, including the extraction of semantic events from spatial-temporal data sequences, the feature alignment methods for spatial-temporal data, the spatial-temporal-based logical calculus methods and semantic reasoning methods."
        ]
      },
      {
        title: "A Spatial-Temporal Awareness Data-Oriented Model for Emergency Crowd Evacuation Route Planning",
        subtitle: "Project Researcher, Chinese Academy of Sciences",
        date: "2024.05-2024.06",
        bullets: [
          "Developed an emergency evacuation framework that integrates spatio-temporal perception data, streamlined the entire process of decision-making for the global optimal path planning by incorporating the real-time dynamic spatio-temporal perception data provided by drones.",
          "Proposed and compared multiple algorithms, including the Individual-based Search Method (IBSM), the Global Optimal Sparse Route Planning Query Method (GOSRPQM), and the Improved GOSRPQM algorithm (IGOSRPQM) that incorporates pruning strategies and refinement operations. Implemented and verified these algorithms using tools such as Python and PostgreSQL on real road network data (San Joaquin County, New York, Beijing).",
          "Revealed technical solution that shortened the global evacuation time by 40%, providing a reliable technical approach and overall solution for large-scale emergency evacuations under resource constraints."
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
        title: "Technical Skills",
        bullets: [
          "Languages: Python, C++, Java, Go, R, Ruby, Kotlin, PHP",
          "AI/ML Frameworks: PyTorch, JAX, TensorFlow, OpenCV, LangChain, LangGraph, LangSmith",
          "Large Model Training: Distributed Training, RLHF, SFT, CUDA",
          "Computer Vision & 3D: Diffusion Models, NeRF, Spatial Representations, World Models, 3D Annotation Systems",
          "Multi-agent Systems: MCP (Model Context Protocol), Tool Calling, Function Chaining, Agent Orchestration, Multi-turn Reasoning",
          "Full-stack Development: React.js, Next.js, Vue.js, Angular.js, Node.js, TypeScript, JavaScript, HTML5, Tailwind CSS",
          "Databases: PostgreSQL, Neo4j, MongoDB",
          "Infrastructure: Docker, Kubernetes, AWS, Cloud DevOps",
          "Design and Office Tools: Figma, Canva, Microsoft Office Suites, Adobe Creative Suite",
          "Other Tools: Unity, SAS, Arduino UNO"
        ]
      },
      {
        title: "Languages",
        bullets: [
          "Chinese (Native)",
          "English (Proficient)",
          "Spanish (Elementary)"
        ]
      },
      {
        title: "Certifications and Honors",
        bullets: [
          "Neo4j Certified Professional",
          "Neo4j Graph Data Science Certification",
          "UIUC Dean's List - 2023 Spring, 2024 Fall",
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
          "University of Illinois at Urbana-Champaign, Champaign, IL",
          "BS in Data Science and Information Science",
          "Minors: Computer Science and Statistics",
          "2022.08 - 2026.05"
        ]
      }
    ]
  }
}

export const SKILLS_CATEGORIES = {
  "Programming Languages": ["Python", "C++", "Java", "Go", "R", "Ruby", "Kotlin", "PHP"],
  "AI/ML Frameworks": ["PyTorch", "OpenCV", "LangChain", "LangGraph", "JAX", "TensorFlow", "LangSmith"],
  "Large Model Training": ["Distributed Training", "SFT", "RLHF", "CUDA"],
  "3D & Vision": ["Diffusion Models", "World Models", "NeRF", "Spatial Representations", "3D Annotation Systems"],
  "Multi-agent & Agentic AI": ["Agent Orchestration", "Memory Systems", "Multi-turn Reasoning", "MCP", "Tool Calling", "Function Chaining"],
  "Full-stack Development": ["React.js", "Next.js", "Vue.js", "Angular.js", "Node.js", "TypeScript", "JavaScript", "HTML5", "Tailwind CSS"],
  "Databases": ["PostgreSQL", "Neo4j", "MongoDB"],
  "Infrastructure": ["Docker", "AWS", "Kubernetes", "Cloud DevOps"],
  "Design and Office Tools": ["Figma", "Canva", "Microsoft Office Suites", "Adobe Creative Suite"],
  "Other Tools": ["Unity", "SAS", "Arduino UNO"],
}

export const PROFESSIONAL_SKILLS = [
  "Python",
  "C++",
  "Java",
  "Go",
  "R",
  "Ruby",
  "PyTorch",
  "OpenCV",
  "LangChain",
  "LangGraph",
  "Distributed Training",
  "SFT",
  "Diffusion Models",
  "World Models",
  "Agent Orchestration",
  "Memory Systems",
  "Multi-turn Reasoning",
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
