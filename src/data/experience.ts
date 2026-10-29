import type { ContentSection } from "./types"

/** Professional roles, newest first; a date ending in "Present" marks the current one on the timeline. */
export const EXPERIENCE: ContentSection = {
  id: "experience",
  heading: "Experience",
  subheading: "Professional Experience",
  cards: [
    {
      title: "IBM Research",
      subtitle: "Research Intern (Advisor: Dr. Dhaval Patel)",
      location: "New York, NY",
      date: "2026.09 - Present",
      bullets: [
        "Lead Model Context Protocol (MCP) server architecture for AssetOpsBench, granting large language model (LLM) agents typed access to failure-mode knowledge graphs, root-cause ranking, and intervention estimation via deterministic Neo4j queries with provenance.",
        "Create fault-diagnosis reinforcement learning (RL) environments for multi-step LLM agents over predictive-maintenance telemetry from 100 machines to benchmark evidence gathering and repairs under hidden ground truth, look-alike faults, and partial observations.",
        "Conduct extensive experiments on four LLM agents under one model and action budget, raising Top-1 diagnosis accuracy by 88.0% compared to a Plan-Execute agent, and profile inference with PyTorch Profiler and Nsight on H100 GPUs, cutting latency by 52.7%.",
      ],
      links: [{ label: "AssetOpsBench", url: "https://github.com/IBM/AssetOpsBench" }],
    },
    {
      title: "Memoria",
      subtitle: "Technical Lead",
      location: "Champaign, IL",
      date: "2026.01 - 2026.08",
      bullets: [
        "Spearheaded end-to-end agentic workflow deployments across MCP servers, sub-agents, and agent skills with multi-agent orchestration, permission-aware tool calling, and policy guardrails, accelerating product delivery by 4.0x compared to traditional approaches.",
        "Managed production operations for agentic workflows with logging, evaluation harnesses, and monthly iteration cycles in partnership with client stakeholders, saving 75% of per-client deployment time through a reusable Deployment Kit.",
        "Integrated self-evolving per-user memory across sessions and cost-aware model routing into enterprise agent workflows, saving 96.0% in token cost compared to GPT-5.1.",
      ],
      links: [{ label: "Website", url: "https://miramemoria.com/" }],
    },
    {
      title: "Two by Two Learning Center",
      subtitle: "Full Stack Developer",
      location: "Champaign, IL",
      date: "2025.08 - 2026.08",
      bullets: [
        "Launched NOODEIA, a multi-agent tutoring platform for K-12 students who are falling behind their grade levels, to plan, critique, and monitor each learner with long-horizon memory, boosting user confidence by 2.4x in counterbalanced within-subjects studies.",
        "Implemented self-evolving long-term memory architectures on Neo4j to retrieve contextually relevant prior interactions, accelerating memory queries by 3.6x compared to recency-biased FIFO memory architectures on PostgreSQL.",
        "Deployed complexity-aware model selection across planner, retrieval, solver, and critic stages to score each request and reserve frontier-tier inference for priority calls, eliminating 89.9% of monthly serving cost compared to GPT-4o.",
      ],
      links: [{ label: "Website", url: "https://noodiea.onrender.com/" }],
    },
    {
      title: "WRC, University of Illinois Urbana-Champaign",
      subtitle: "Data Analyst",
      location: "Champaign, IL",
      date: "2024.08 - 2024.12",
      bullets: [
        "Built paired pre/post analytics pipelines over survey data from 9,935 incoming students to better allocate program resources in the upcoming years, increasing correct responses among the next cohort by 14.0% with 61.9% fewer ambiguous responses.",
        "Conducted A/B tests on two consent scenarios stratified across five gender-identity subgroups to locate where misconceptions persisted after each workshop, increasing accuracy on consent comprehension by 19.5%.",
        "Proposed scenario-based learning modules for underrepresented subgroups by coding open-ended bystander responses into five-theme taxonomies, minimizing spread in direct-intervention rates by 5.6x.",
      ],
    },
  ],
}
