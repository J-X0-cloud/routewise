import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { GlowBackdrop } from "@/components/shared/glow-backdrop";
import { ButtonLink } from "@/components/ui/button";
import { platformStats } from "@/lib/data/platform";
import { links } from "@/lib/site";

export function PlatformHero() {
  return (
    <section className="section-padding relative overflow-hidden">
      <GlowBackdrop variant="page" />
      <div className="container space-y-12">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Platform Overview
          </div>
          <h1 className="text-5xl leading-none tracking-tight text-balance md:text-6xl lg:text-7xl">
            One System for the <span className="text-gradient">Whole Delivery Day</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-snug text-muted-foreground md:text-xl">
            Routewise brings order intake, dispatch, live tracking, the driver app, customer
            notifications and billing together — so a regional delivery company can run from one
            screen instead of six tools and a group chat.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href={links.demo} size="xl">
              Book a demo <ArrowRight aria-hidden="true" className="ml-2 size-4" />
            </ButtonLink>
            <ButtonLink href={links.pricing} variant="outline" size="xl">
              See pricing
            </ButtonLink>
            <ButtonLink href={links.tour} variant="ghost" size="xl">
              Watch the 3-minute tour
            </ButtonLink>
          </div>
        </div>

        <dl className="rw-grid-4-to-2 grid grid-cols-4 gap-px overflow-hidden rounded-xl border bg-border">
          {platformStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1 bg-card px-6 py-8 text-center"
            >
              <dt className="order-2 text-xs text-muted-foreground">{stat.label}</dt>
              <dd className="order-1 text-3xl font-bold tracking-tight text-primary md:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="overflow-hidden rounded-xl border shadow-2xl">
          <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
            </div>
            <span className="ml-2 text-xs text-muted-foreground">Routewise — Live Tracking</span>
          </div>
          <div className="relative aspect-[16/7] w-full">
            <Image
              src="/images/live-map.webp"
              alt="Routewise live map with active orders, driver positions and unassigned work"
              fill
              priority
              sizes="(min-width: 1200px) 1424px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
