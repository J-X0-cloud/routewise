import { Eyebrow } from "@/components/ui/eyebrow";
import { principles } from "@/lib/data/platform";

export function Principles() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="flex flex-col justify-center gap-5 lg:col-span-2">
            <Eyebrow className="w-fit">How It Works</Eyebrow>
            <h2 className="text-4xxl leading-none tracking-tight text-balance md:text-5xl">
              Built Around How Delivery Days Really Go
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Most fleet software is built for long-haul trucking or for gig marketplaces. Routewise
              is built for the middle: regional companies with their own drivers, their own
              customers and a lot of stops between 7 a.m. and 6 p.m.
            </p>
          </div>

          <div className="divide-y lg:col-span-3">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <div key={principle.title} className="flex gap-5 py-6 first:pt-0 last:pb-0">
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted/30">
                    <Icon aria-hidden="true" className="size-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-accent-foreground">{principle.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {principle.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
