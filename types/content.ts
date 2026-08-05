import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface Stat {
  value: string;
  suffix?: string;
  label: string;
}

/** Tailwind colour family used for icon tiles and badges. */
export type Tone =
  | "blue"
  | "orange"
  | "violet"
  | "emerald"
  | "pink"
  | "green"
  | "yellow"
  | "amber"
  | "slate"
  | "indigo";

export interface PlatformModule {
  id: string;
  badge: string;
  tone: Tone;
  title: string;
  description: string;
  bullets: string[];
  image: { src: string; alt: string };
  /** Spans two columns on large screens. */
  featured?: boolean;
}

export interface DispatchTab {
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  image: { src: string; alt: string };
  body: string;
  highlights: string[];
}

export interface IndustryTile {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: Tone;
}

export interface Principle {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FeatureTile {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: Tone;
  href: string;
  isNew?: boolean;
}

export interface FlowStep {
  stage: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone: Tone;
}

export interface SolutionCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface SolutionGroup {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: SolutionCard[];
}

export interface CodeSample {
  id: string;
  title: string;
  description: string;
  filename: string;
  language: string;
  code: string;
}
