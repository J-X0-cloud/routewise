import { ArrowRight } from "lucide-react";

import { pricingPaths } from "@/lib/data/pricing";

export function PathPicker() {
  return (
    <section className="section-padding pb-0">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">Where are you today?</h2>
          <p className="text-muted-foreground">
            Pick the path that fits — we’ll take you straight to it.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {pricingPaths.map((path) => {
            const Icon = path.icon;
            return (
              <a
                key={path.title}
                href={path.href}
                className="group flex flex-col rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-primary/10">
                  <Icon aria-hidden="true" className="size-5 text-primary" />
                </div>
                <h3 className="mb-1.5 text-lg font-semibold">{path.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {path.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  {path.cta}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
