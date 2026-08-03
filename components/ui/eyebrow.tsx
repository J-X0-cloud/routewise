import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** The small outlined pill that labels each section ("The Platform", "Dispatch"…). */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}
