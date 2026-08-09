import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { industryTiles } from "@/lib/data/home";
import { links } from "@/lib/site";
import { toneIcon, toneSurface } from "@/lib/tones";
import { cn } from "@/lib/utils";

export function Industries() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="flex flex-col justify-between gap-10 lg:col-span-2">
            <div className="space-y-5">
              <Eyebrow>Who It’s For</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
                Built for Regional Carriers With Tight Days
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Whether you run eight vans out of one yard or ninety trucks across three states,
                Routewise fits how your team already works — and grows with you as you add depots,
                lanes and customers.
              </p>
              <ButtonLink
                href={links.solutions}
                variant="ghost"
                className="group !px-0 hover:!bg-transparent"
              >
                Explore all solutions
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </ButtonLink>
            </div>
            <div className="rounded-xl border bg-muted/20 p-5">
              <div className="text-4xl font-bold tracking-tight text-primary">5–150</div>
              <div className="mt-1 text-sm text-muted-foreground">
                vehicles — the fleet size Routewise is designed and priced for
              </div>
            </div>
          </div>

          <div className="rw-ind-grid grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border lg:col-span-3">
            {industryTiles.map((tile) => {
              const Icon = tile.icon;
              return (
                <Link
                  key={tile.title}
                  href={links.solutions}
                  className="group flex items-start gap-3 bg-card p-5 transition-colors hover:bg-muted/40"
                >
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-md",
                      toneSurface[tile.tone],
                    )}
                  >
                    <Icon aria-hidden="true" className={cn("size-4", toneIcon[tile.tone])} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm leading-tight font-semibold">{tile.title}</h3>
                      <ArrowRight
                        aria-hidden="true"
                        className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </div>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">
                      {tile.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
