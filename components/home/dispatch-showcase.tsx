"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { GradientCard } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { dispatchTabs as tabs } from "@/lib/data/home";
import { links } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Icons are component references, so the tab data is imported here rather than passed as props. */
export function DispatchShowcase() {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  if (!active) return null;

  return (
    <section className="section-padding">
      <div className="container space-y-12">
        <div className="space-y-4">
          <Eyebrow>Dispatch</Eyebrow>
          <h2 className="max-w-3xl text-4xxl leading-tight tracking-tight text-balance md:text-5xl lg:text-6xl">
            Built for Dispatch’s <br className="hidden md:block" />
            Busiest Hour of the Day
          </h2>
          <p className="max-w-2xl text-lg leading-snug text-muted-foreground">
            Morning load-out, the lunchtime rush, the 4 p.m. reshuffle. Routewise gives dispatchers
            the tools to plan, reassign and communicate without leaving the board — and gives
            drivers an app they actually like using.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="flex flex-col lg:col-span-2" role="tablist" aria-orientation="vertical">
            {tabs.map((tab) => {
              const selected = tab.id === active.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  id={`dispatch-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="dispatch-panel"
                  onClick={() => setActiveId(tab.id)}
                  className={cn(
                    "relative flex items-start gap-4 border-b py-5 text-left transition-all",
                    selected ? "opacity-100" : "opacity-45 hover:opacity-70",
                  )}
                >
                  <div
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-md border transition-colors",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-gradient-to-br from-muted/30 via-muted/10 to-card",
                    )}
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </div>
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <span
                      className={cn(
                        "text-base leading-tight font-semibold transition-colors",
                        selected ? "text-accent-foreground" : "text-muted-foreground",
                      )}
                    >
                      {tab.title}
                    </span>
                    {selected ? (
                      <span className="text-sm leading-snug text-muted-foreground">
                        {tab.summary}
                      </span>
                    ) : null}
                  </div>
                  {selected ? (
                    <div className="absolute bottom-0 left-0 h-0.5 w-1/3 origin-left rounded-full bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3" />
                  ) : null}
                </button>
              );
            })}
            <div className="pt-6">
              <ButtonLink href={links.platform} variant="outline">
                See how dispatch works <ArrowRight aria-hidden="true" className="ml-2 size-4" />
              </ButtonLink>
            </div>
          </div>

          <div
            id="dispatch-panel"
            role="tabpanel"
            aria-labelledby={`dispatch-tab-${active.id}`}
            className="lg:col-span-3"
          >
            <div key={active.id} className="flex flex-col gap-6">
              <GradientCard className="gap-6 overflow-hidden p-0">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={active.image.src}
                    alt={active.image.alt}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </GradientCard>
              <p className="text-base leading-relaxed text-muted-foreground">{active.body}</p>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {active.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2 text-sm">
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 rounded-full bg-chart-2"
                    />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
