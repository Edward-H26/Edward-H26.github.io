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
        "Lead Model Context Protocol (MCP) server architecture for AssetOpsBench that serves failure-mode knowledge graphs, root-cause ranking, and intervention estimation to multi-turn tool-use large language model (LLM) agents via deterministic Neo4j queries with provenance, raising top-1 tool accuracy by 12.9% compared to per-server sub-agents and cutting standing tool context by 98.5%.",
        "Design fault-diagnosis reinforcement learning (RL) environments on a hydraulic test rig with verifiable cost-aware rewards, priced observations, and reward-hacking checks for multi-step LLM agents, raising top-1 diagnosis accuracy by 42.6 percentage points compared to a Plan-Execute agent and eliminating 87.7% of model calls per episode.",
        "Streamline the diagnosis environment into standard Gymnasium and OpenEnv training interfaces for RLVR post-training with GRPO on verl, minimizing per-episode inference latency by 52.7% across 47 recorded fault combinations and saving 47.5% in maintenance cost compared to a do-nothing policy.",
      ],
      links: [{ label: "AssetOpsBench", url: "https://github.com/IBM/AssetOpsBench" }],
    },
    {
      title: "Memoria",
      subtitle: "Technical Lead",
      location: "Champaign, IL",
      date: "2026.01 - 2026.08",
      bullets: [
        "Led end-to-end agentic workflow deployments across MCP servers, sub-agents, and agent skills with multi-agent orchestration, permission-aware tool calling, and policy guardrails, accelerating product delivery by 4.0x and boosting overall task success by 17.9% on CL-bench.",
        "Managed production operations for agentic workflows with logging, tracing, evaluation harnesses, and monthly iteration cycles for client stakeholders, reducing serving cost by 90.5% compared to GPT-4o and improving rule-application task success by 31.2% on CL-bench.",
        "Integrated recursive self-evolving memory architecture across sessions with cost-aware model routing into enterprise agent workflows, saving 96.0% in token cost compared to GPT-5.1 and increasing procedural task success by 71.4% on CL-bench.",
      ],
      links: [{ label: "Website", url: "https://miramemoria.com/" }],
    },
    {
      title: "Two by Two Learning Center",
      subtitle: "Full Stack Developer",
      location: "Champaign, IL",
      date: "2025.08 - 2025.12",
      bullets: [
        "Launched NOODEIA, a multi-agent tutoring platform for K-12 students below grade level, to plan, critique, and monitor each user with long-horizon memory, boosting user confidence by 2.44x and increasing independence by 2.35x in counterbalanced within-subjects studies.",
        "Implemented recursive self-evolving long-term memory on Neo4j to retrieve contextually relevant interactions, accelerating query speed by 3.6x compared to recency-biased FIFO memory on PostgreSQL and minimizing cross-session retrieval to 2.1 s.",
        "Deployed complexity-aware model selection across planner, retrieval, solver, and critic stages to score each request and route it to the smallest capable model, eliminating 89.9% of monthly serving cost compared to GPT-4o and routing 75% of calls to lighter model tiers.",
      ],
      links: [{ label: "Website", url: "https://noodiea.onrender.com/" }],
    },
    {
      title: "WRC",
      subtitle: "Data Analyst",
      location: "Champaign, IL",
      date: "2024.08 - 2024.12",
      bullets: [
        "Built paired pre/post analytics pipelines over survey data from 9,935 incoming students, raising correct responses by 14.0% and decreasing ambiguous responses by 61.9%.",
        "Conducted A/B tests on two consent scenarios to locate where misconceptions persisted after each workshop, increasing accuracy on consent comprehension by 19.5% and cutting persistent misconceptions by 41.6%.",
        "Designed scenario-based learning modules for underrepresented subgroups, raising correct responses on bystander scenarios by 36.8% and narrowing the gap in correct-response rates between subgroups 5.6x.",
      ],
    },
  ],
}
