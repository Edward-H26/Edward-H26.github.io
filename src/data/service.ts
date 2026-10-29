import type { ContentSection } from "./types"

/** Open source and community work. */
export const SERVICE: ContentSection = {
  id: "service",
  heading: "Service",
  subheading: "Open Source and Community",
  cards: [
    {
      title: "OnePromptClaudeCode",
      subtitle: "Lead Developer",
      location: "Champaign, IL",
      date: "2026.03 - Present",
      bullets: [
        "Engineer an MIT-licensed open-source agent harness for agentic software development, packaging skills, slash commands, specialized agents, hooks, and MCP servers into a one-prompt install, minimizing environment initialization time by 99.5%.",
        "Implement three-tier capability routers for the agent harness to optimize tokens, latency, and cost on every turn, with keyword matching and session-memory recall ahead of a 4.5 s model reasoning pass, resolving intent in 120 ms and running 37.5x faster than routing every prompt through the model.",
        "Design the security layer: four lifecycle hooks gating every tool call before it runs, auto-denial of destructive commands, directory-scoped edit sandboxing, and a permission and gitignore audit, eliminating 92.7% of router latency.",
      ],
      links: [{ label: "GitHub", url: "https://github.com/Edward-H26/OnePromptClaudeCode" }],
    },
  ],
}
