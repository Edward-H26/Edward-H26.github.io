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
        "Maintain an MIT-licensed open-source agent harness for agentic software development, packaging 95 skills, 71 slash commands, 14 specialized agents, 4 hooks, and 10 MCP servers into a one-prompt install that sets up the full plan, build, review, test, and ship workflow on a fresh machine, eliminating 99.5% of environment initialization steps.",
        "Automate capability routing with a three-tier router that matches each prompt to the skills and agents it needs by keyword, then by session-memory recall, and only then by a 4.5 s model reasoning pass, to load only the matched capabilities and optimize tokens, latency, and cost on every turn, resolving keyword-matched prompts in 120 ms and decreasing routing latency by 97.3% compared to model-only routing.",
        "Improve the security layer with four lifecycle hooks that screen every tool call before execution, auto-deny destructive shell commands, and confine edits to a directory-scoped sandbox, cutting accidental destructive actions by 32.6%.",
      ],
      links: [{ label: "GitHub", url: "https://github.com/Edward-H26/OnePromptClaudeCode" }],
    },
  ],
}
