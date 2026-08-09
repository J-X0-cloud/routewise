import { cn } from "@/lib/utils";

interface GlowBackdropProps {
  /** "hero" is the large three-orb wash behind page heroes; "panel" sits inside CTA cards. */
  variant?: "hero" | "page" | "panel";
  className?: string;
}

export function GlowBackdrop({ variant = "hero", className }: GlowBackdropProps) {
  if (variant === "panel") {
    return (
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      >
        <div className="absolute -top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-chart-1/[0.12] blur-3xl" />
        <div className="absolute right-1/4 -bottom-1/2 h-72 w-72 rounded-full bg-chart-3/[0.08] blur-3xl" />
      </div>
    );
  }

  const large = variant === "hero";
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div
        className={cn(
          "absolute -top-24 left-1/2 -translate-x-1/2 rounded-full blur-[120px]",
          large ? "h-[800px] w-[800px] bg-chart-1/[0.14]" : "h-[700px] w-[700px] bg-chart-1/[0.10]",
        )}
      />
      <div
        className={cn(
          "absolute -right-24 rounded-full blur-3xl",
          large
            ? "top-1/4 h-[550px] w-[550px] bg-chart-3/[0.10]"
            : "top-1/3 h-[500px] w-[500px] bg-chart-3/[0.07]",
        )}
      />
      <div
        className={cn(
          "absolute top-1/2 -left-24 rounded-full blur-3xl",
          large ? "h-[450px] w-[450px] bg-chart-2/[0.09]" : "h-[400px] w-[400px] bg-chart-2/[0.06]",
        )}
      />
    </div>
  );
}
