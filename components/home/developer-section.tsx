"use client";

import { useState } from "react";

import { codeSamples, developerIntro } from "@/lib/data/sdk-examples";

import { CodeWindow } from "./code-window";

export function DeveloperSection() {
  const [activeId, setActiveId] = useState(codeSamples[0]?.id);
  const active = codeSamples.find((sample) => sample.id === activeId) ?? codeSamples[0];
  if (!active) return null;

  return (
    <section
      id="developers"
      className="section-padding container grid max-w-screen-xl scroll-mt-20 grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16"
    >
      <div className="flex flex-col justify-between gap-8">
        <div className="space-y-6 text-balance lg:max-w-lg">
          <h2 className="text-4xxl leading-tight tracking-tight md:text-5xl">
            {developerIntro.title[0]} <br className="hidden lg:block" />
            {developerIntro.title[1]}
          </h2>
          <span className="block text-xl leading-7 font-bold">{developerIntro.subtitle}</span>
          <p className="mt-3 text-lg leading-snug text-muted-foreground">
            {developerIntro.description}
          </p>
        </div>

        <div className="flex flex-col" role="tablist" aria-label="SDK examples">
          {codeSamples.map((sample) => (
            <button
              key={sample.id}
              type="button"
              role="tab"
              aria-selected={sample.id === active.id}
              onClick={() => setActiveId(sample.id)}
              className="rw-tab"
            >
              <span className="rw-tab-title">{sample.title}</span>
              <span className="rw-tab-description">{sample.description}</span>
            </button>
          ))}
        </div>
      </div>

      <CodeWindow filename={active.filename} language={active.language} code={active.code} />
    </section>
  );
}
