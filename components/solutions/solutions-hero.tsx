import { Eyebrow } from "@/components/ui/eyebrow";
import { solutionHighlights } from "@/lib/data/solutions";

export function SolutionsHero() {
  return (
    <section className="border-b py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mb-6">Solutions</Eyebrow>
          <h1 className="mb-5 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
            Built for regional <span className="text-gradient">delivery companies</span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Whether you run 8 vans or 150 trucks, Routewise adapts to the freight you carry, the
            customers you serve and the way your dispatchers already work.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            {solutionHighlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="inline-block size-1.5 rounded-full bg-primary"
                />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
