import Link from "next/link";

import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={cn("rw-mark", className)}>
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M9 23v-7h14V9"
        fill="none"
        stroke="#10201f"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="23" r="3.2" fill="#10201f" />
      <circle cx="23" cy="9" r="3.2" fill="#10201f" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  markClassName?: string;
}

export function Logo({ className, markClassName }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Routewise home"
      className={cn("rw-logo flex items-center gap-2.5 text-xl font-medium", className)}
    >
      <LogoMark className={markClassName} />
      <span className="font-semibold">Routewise</span>
    </Link>
  );
}
