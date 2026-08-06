import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class lists, letting later utilities win over earlier ones. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** True for links that must render as a plain anchor rather than a client-side route. */
export function isExternalHref(href: string): boolean {
  return /^(mailto:|tel:|https?:\/\/|#)/.test(href);
}
