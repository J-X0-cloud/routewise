import { ArrowRight, CircleCheck } from "lucide-react";

import { SectionIntro } from "@/components/shared/section-intro";
import { flowGuarantees, orderFlow } from "@/lib/data/platform";
import { toneIcon, toneSurface } from "@/lib/tones";
import { cn } from "@/lib/utils";

export function OrderFlow() {
  return (
    <section className="section-padding">
      <div className="container space-y-12">
        <SectionIntro
          eyebrow="How It Connects"
          title={
            <>
              One Order, One Record, <span className="text-gradient">Start to Finish</span>
            </>
          }
          description="A delivery in Routewise is one record from the moment it’s booked to the moment it’s paid. No re-keying between dispatch and billing, no copying tracking numbers into emails."
        />

        <ol className="rw-grid-4-to-1 grid grid-cols-4 gap-px overflow-hidden rounded-xl border bg-border">
          {orderFlow.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === orderFlow.length - 1;
            return (
              <li key={step.title} className="relative flex flex-col gap-3 bg-card p-6">
                {!isLast ? (
                  <div className="absolute top-1/2 right-0 z-10 hidden translate-x-1/2 -translate-y-1/2 lg:flex">
                    <ArrowRight aria-hidden="true" className="size-4 text-muted-foreground/40" />
                  </div>
                ) : null}
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex size-8 items-center justify-center rounded-md",
                      toneSurface[step.tone],
                    )}
                  >
                    <Icon aria-hidden="true" className={cn("size-4", toneIcon[step.tone])} />
                  </div>
                  <span className={cn("text-xs font-semibold", toneIcon[step.tone])}>
                    {step.stage}
                  </span>
                </div>
                <h3 className="font-semibold text-accent-foreground">{step.title}</h3>
                <p className="text-xs leading-snug text-muted-foreground">{step.description}</p>
              </li>
            );
          })}
        </ol>

        <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {flowGuarantees.map((guarantee) => (
            <li
              key={guarantee}
              className="flex items-start gap-3 rounded-lg border bg-muted/20 p-4"
            >
              <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="text-sm leading-snug text-muted-foreground">{guarantee}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
