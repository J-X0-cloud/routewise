import type { Tone } from "@/types/content";

/**
 * Static class maps so Tailwind can see every colour utility at build time.
 * Never build these class names with string interpolation.
 */
export const toneSurface: Record<Tone, string> = {
  blue: "bg-blue-500/10",
  orange: "bg-orange-500/10",
  violet: "bg-violet-500/10",
  emerald: "bg-emerald-500/10",
  pink: "bg-pink-500/10",
  green: "bg-green-500/10",
  yellow: "bg-yellow-500/10",
  amber: "bg-amber-500/10",
  slate: "bg-slate-500/10",
  indigo: "bg-indigo-500/10",
};

export const toneIcon: Record<Tone, string> = {
  blue: "text-blue-500",
  orange: "text-orange-500",
  violet: "text-violet-500",
  emerald: "text-emerald-500",
  pink: "text-pink-500",
  green: "text-green-500",
  yellow: "text-yellow-500",
  amber: "text-amber-500",
  slate: "text-slate-500",
  indigo: "text-indigo-500",
};

export const toneBadge: Record<Tone, string> = {
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  pink: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  green: "bg-green-500/10 text-green-600 dark:text-green-400",
  yellow: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  slate: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  indigo: "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400",
};
