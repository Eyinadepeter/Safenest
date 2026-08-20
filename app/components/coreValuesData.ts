export interface CoreValue {
  number: string;
  title: string;
  /** Fuller copy — used by the numbered list on the Our Values page. */
  description: string;
  /** Shorter copy — used by the gradient cards on the Why SafeNest page. */
  shortDescription: string;
}

export const coreValues: CoreValue[] = [
  {
    number: "01",
    title: "Trust",
    description:
      "We earn confidence through transparency, reliability, and secure financial guidance that users can depend on every day. We never hold or move your money it stays in your own licensed bank, always.",
    shortDescription:
      "We earn confidence through transparency and reliable financial guidance you can depend on.",
  },
  {
    number: "02",
    title: "Consistency",
    description:
      "Small, steady contributions beat scrambling at the last minute every time. We help you build habits that hold up even when life gets unpredictable.",
    shortDescription:
      "Small, steady contributions beat scrambling at the last minute every time.",
  },
  {
    number: "03",
    title: "Simplicity",
    description:
      "Financial planning should be easy to understand. We remove the complexity so users can focus on achieving their goals with confidence no jargon, no guesswork.",
    shortDescription:
      "Financial planning should be easy to understand. We remove the complexity.",
  },
  {
    number: "04",
    title: "Progress",
    description:
      "Every contribution matters. We celebrate every milestone and empower users to move steadily toward long-term financial success, one step at a time.",
    shortDescription:
      "Every contribution matters. We celebrate milestones on the way to the goal.",
  },
];
