import { ArrowRight } from "lucide-react";

import { SectionIntro } from "@/components/shared/section-intro";
import { SmartLink } from "@/components/ui/smart-link";
import { featureTiles } from "@/lib/data/platform";
import { toneIcon, toneSurface } from "@/lib/tones";
import { cn } from "@/lib/utils";

export function FeatureGrid() {
  return (
    <section className="section-padding">
      <div className="container space-y-10">
        <SectionIntro
          eyebrow="The Full Platform"
          title={
            <>
              Everything Dispatch Needs, <span className="text-gradient">Nothing It Doesn’t</span>
            </>
          }
          description="Every account includes the full platform. Switch features on as your team is ready — most customers start with dispatch and tracking, then add billing and the merchant portal."
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {featureTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <SmartLink
                key={tile.title}
                href={tile.href}
                className="group flex flex-col gap-4 bg-card p-6 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-lg",
                      toneSurface[tile.tone],
                    )}
                  >
                    <Icon aria-hidden="true" className={cn("size-5", toneIcon[tile.tone])} />
                  </div>
                  {tile.isNew ? (
                    <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                      New
                    </span>
                  ) : null}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-accent-foreground">{tile.title}</h3>
                  <p className="text-xs leading-snug text-muted-foreground">{tile.description}</p>
                </div>
                <div className="mt-auto flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-accent-foreground">
                  Learn more
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3 transition-transform group-hover:translate-x-0.5"
                  />
                </div>
              </SmartLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
