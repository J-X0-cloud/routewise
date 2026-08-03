import { Check, CircleCheck, X } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CheckItemProps {
  children: ReactNode;
  variant?: "check" | "circle";
  included?: boolean;
  className?: string;
}

export function CheckItem({
  children,
  variant = "check",
  included = true,
  className,
}: CheckItemProps) {
  const Icon = !included ? X : variant === "circle" ? CircleCheck : Check;
  return (
    <li className={cn("flex items-start gap-2 text-sm", className)}>
      <Icon
        aria-hidden="true"
        className={cn(
          "mt-0.5 size-4 shrink-0",
          included ? "text-primary" : "text-muted-foreground/40",
        )}
      />
      <span className={cn(!included && "text-muted-foreground/50")}>{children}</span>
    </li>
  );
}
