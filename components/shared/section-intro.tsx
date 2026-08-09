import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

interface SectionIntroProps {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  align?: "center" | "left";
  className?: string;
}

/** Centered eyebrow + display heading + lead paragraph used across the marketing pages. */
export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionIntroProps) {
  return (
    <div
      className={cn("space-y-4", align === "center" && "mx-auto max-w-3xl text-center", className)}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-4xxl leading-none tracking-tight text-balance md:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="text-lg leading-snug text-muted-foreground lg:text-xl">{description}</p>
    </div>
  );
}
