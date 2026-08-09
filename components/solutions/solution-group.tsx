import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Eyebrow } from "@/components/ui/eyebrow";
import { links } from "@/lib/site";
import type { SolutionGroup as SolutionGroupData } from "@/types/content";

export function SolutionGroup({ group }: { group: SolutionGroupData }) {
  return (
    <section id={group.id} className="scroll-mt-24 py-14 md:py-18">
      <div className="container">
        <div className="mb-8 max-w-2xl">
          <Eyebrow className="mb-3">{group.eyebrow}</Eyebrow>
          <h2 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">{group.title}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{group.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {group.items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={`${links.solutions}#${group.id}`}
                className="group flex flex-col gap-3 rounded-xl border bg-card p-5 transition-all duration-200 hover:border-primary/40 hover:bg-accent/30 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg border bg-background">
                    <Icon aria-hidden="true" className="size-4.5 text-foreground" />
                  </div>
                  <h3 className="text-sm leading-tight font-semibold">{item.title}</h3>
                </div>
                <p className="flex-1 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Explore {item.title}
                  <ArrowRight aria-hidden="true" className="size-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
