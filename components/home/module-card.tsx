import { ArrowRight, CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GradientCard } from "@/components/ui/card";
import { links } from "@/lib/site";
import { toneBadge } from "@/lib/tones";
import { cn } from "@/lib/utils";
import type { PlatformModule } from "@/types/content";

export function ModuleCard({ module }: { module: PlatformModule }) {
  return (
    <GradientCard
      className={cn(
        "group gap-0 overflow-hidden py-0",
        module.featured ? "lg:col-span-2" : "lg:col-span-1",
      )}
    >
      <div className="flex h-full flex-col">
        <div
          className={cn(
            "relative w-full overflow-hidden border-b",
            module.featured ? "aspect-[16/10]" : "aspect-[4/3]",
          )}
        >
          <Image
            src={module.image.src}
            alt={module.image.alt}
            fill
            sizes={
              module.featured
                ? "(min-width: 1024px) 66vw, 100vw"
                : "(min-width: 1024px) 33vw, 100vw"
            }
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <span
            className={cn(
              "inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
              toneBadge[module.tone],
            )}
          >
            {module.badge}
          </span>
          <div>
            <h3 className="mb-1 text-xl font-bold tracking-tight text-accent-foreground">
              {module.title}
            </h3>
            <p className="text-sm leading-snug text-muted-foreground">{module.description}</p>
          </div>
          <ul className="space-y-1.5">
            {module.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-sm">
                <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-2">
            <Link
              href={links.platform}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-foreground transition-all hover:gap-2.5"
            >
              Explore <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </GradientCard>
  );
}
