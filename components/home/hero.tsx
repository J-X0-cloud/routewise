import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GlowBackdrop } from "@/components/shared/glow-backdrop";
import { ButtonLink } from "@/components/ui/button";
import { links } from "@/lib/site";

export function Hero() {
  return (
    <header className="section-padding relative overflow-hidden">
      <div className="relative container flex flex-col items-center gap-6 text-center">
        <div className="flex items-center rounded-full border p-1 text-xs">
          <span className="rounded-full bg-muted px-3 py-1 font-medium">New</span>
          <Link
            href={links.platform}
            className="flex items-center gap-1.5 px-3 transition-opacity hover:opacity-80"
          >
            <Star aria-hidden="true" className="size-3 fill-yellow-500 text-yellow-500" />
            Route Planner 2.0 is live
          </Link>
        </div>

        <h1 className="max-w-4xl text-5xl leading-none tracking-tight text-balance md:text-6xl lg:text-7xl">
          Every stop. Every driver. <span className="text-gradient">One dispatch board.</span>
        </h1>

        <p className="max-w-2xl text-lg leading-snug text-foreground/80 md:text-xl">
          Routewise is the dispatch and fleet operations platform for regional delivery companies.
          Take orders in, plan routes, track every van live, and close out the day with proof of
          delivery and driver pay — from one screen your whole team shares.
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={links.demo} size="xl">
            Book a demo
          </ButtonLink>
          <ButtonLink href={links.pricing} variant="outline" size="xl">
            See pricing
          </ButtonLink>
        </div>
        <p className="text-sm text-muted-foreground">
          14-day pilot on your real routes · Onboarding included
        </p>

        <div className="relative mt-4 w-full max-w-6xl">
          <div className="relative aspect-[8/5] overflow-hidden rounded-xl border shadow-2xl ring-1 ring-foreground/5">
            <Image
              src="/images/live-tracking.webp"
              alt="Routewise live tracking view showing a three-stop route on the map with driver, vehicle and status timeline"
              fill
              priority
              sizes="(min-width: 1200px) 1152px, 100vw"
              className="object-contain object-top"
            />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background to-transparent" />
        </div>
      </div>
      <GlowBackdrop />
    </header>
  );
}
