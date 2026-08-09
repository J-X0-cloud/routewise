import { ArrowRight } from "lucide-react";

import { links } from "@/lib/site";

export function SolutionsCta() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/5 via-transparent to-primary/10 px-8 py-12 text-center md:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute -top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          </div>
          <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mb-8 max-w-md text-muted-foreground">
            Talk to our team. We’ll map Routewise to your operation — freight, depots, drivers and
            customers — on a 30-minute call.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={links.demo}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book a demo <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <a
              href={links.contact}
              className="inline-flex items-center justify-center gap-2 rounded-md border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              Talk to our team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
