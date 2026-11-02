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
        "Lead Model Context Protocol (MCP) server architecture for AssetOpsBench that exposes failure-mode knowledge graphs, root-cause ranking, and intervention estimation as typed actions for multi-turn tool-use large language model (LLM) agents via deterministic Neo4j queries with provenance, cutting standing tool context by 98.5% and raising top-1 tool accuracy to 70.0%.",
        "Design fault-diagnosis reinforcement learning (RL) environments over predictive-maintenance telemetry from 100 machines with verifiable, cost-aware rewards, priced observations, partial observability, and reward-hacking checks for multi-step LLM agents, raising top-1 diagnosis accuracy by 88.0% compared to a Plan-Execute agent.",
        "Streamline the environment for RLVR post-training with GRPO on verl via Gymnasium and OpenEnv with seeded reproducible rollouts, degradation schedules, graded abstention, and log-checked verifiers, and profile rollouts at kernel level with PyTorch Profiler and Nsight Systems on H100 GPUs, cutting per-episode inference latency by 52.7% across 761 failure windows.",
      ],
      links: [{ label: "AssetOpsBench", url: "https://github.com/IBM/AssetOpsBench" }],
    },
    {
      title: "Memoria",
      subtitle: "Technical Lead",
      location: "Champaign, IL",
      date: "2026.01 - 2026.08",
      bullets: [
        "Led end-to-end agentic workflow deployments across MCP servers, sub-agents, and agent skills with multi-agent orchestration, permission-aware tool calling, and policy guardrails, accelerating product delivery by 4.0x compared to traditional approaches.",
        "Managed production operations for agentic workflows with logging, tracing, evaluation harnesses, and monthly iteration cycles for client stakeholders, saving 75% of per-client deployment time through a reusable deployment framework.",
        "Integrated recursive self-evolving memory architecture across sessions and cost-aware model routing into enterprise agent workflows, saving 96.0% in token cost compared to GPT-5.1.",
      ],
      links: [{ label: "Website", url: "https://miramemoria.com/" }],
    },
    {
      title: "Two by Two Learning Center",
      subtitle: "Full Stack Developer",
      location: "Champaign, IL",
      date: "2025.08 - 2025.12",
      bullets: [
        "Launched NOODEIA, a multi-agent tutoring platform for K-12 students below grade level, to plan, critique, and monitor each user with long-horizon memory, boosting user confidence by 144.0% and increasing independence by 135.0% in counterbalanced within-subjects studies.",
        "Implemented recursive self-evolving long-term memory on Neo4j to retrieve contextually relevant interactions, boosting query speed by 3.6x compared to recency-biased FIFO memory on PostgreSQL and minimizing cross-session retrieval to 2.1 s across 1,000 conversation histories.",
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
        "Built paired pre/post analytics pipelines over survey data from 9,935 incoming students within a 19,800-student population, raising the next cohort's correct responses by 14.0% and decreasing ambiguous responses by 61.9%.",
        "Conducted A/B tests on two consent scenarios stratified across five gender-identity subgroups to locate where misconceptions persisted after each workshop, increasing accuracy on consent comprehension by 19.5% and cutting persistent misconceptions by 41.6%.",
        "Designed scenario-based learning modules for underrepresented subgroups by coding open-ended bystander responses into five-theme taxonomies, narrowing the spread in direct-intervention rates 5.6x and raising direct-intervention intent by 36.8% in those subgroups.",
      ],
    },
  ],
}
